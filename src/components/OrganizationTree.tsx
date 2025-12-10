import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ChevronRight, ChevronDown, User } from 'lucide-react';
import { companies, clusterInfo, isPrivateInvestor } from '@/data/organizationData';

interface TreeNode {
  id: string;
  name: string;
  ownership1?: string;
  parentName1?: string;
  ownership2?: string;
  parentName2?: string;
  cluster?: string | null;
  children: TreeNode[];
}

// Build tree structure from flat data
const buildTree = (): TreeNode => {
  const nodeMap = new Map<string, TreeNode>();
  
  // Create all nodes
  companies.forEach(company => {
    nodeMap.set(company.name, {
      id: company.id.toString(),
      name: company.name,
      ownership1: company.ownership1 || undefined,
      parentName1: company.parentName1 || undefined,
      ownership2: company.ownership2 || undefined,
      parentName2: company.parentName2 || undefined,
      cluster: company.cluster,
      children: [],
    });
  });
  
  // Build relationships (only using primary parent for tree structure)
  const root = nodeMap.get("Parent holding company")!;
  
  companies.forEach(company => {
    if (company.parentName1 && nodeMap.has(company.parentName1)) {
      const parent = nodeMap.get(company.parentName1)!;
      const child = nodeMap.get(company.name)!;
      if (!parent.children.find(c => c.id === child.id)) {
        parent.children.push(child);
      }
    }
  });
  
  return root;
};

const organizationData = buildTree();

// Custom node component
const CustomNode = ({ data }: any) => {
  const hasChildren = data.hasChildren;
  const isExpanded = data.isExpanded;
  const ClusterIcon = data.clusterIcon;
  const clusterColor = data.clusterColor;
  const isPrivate = data.isPrivateInvestor;
  
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        onClick={(e) => {
          if (hasChildren) {
            e.stopPropagation();
            data.onToggle();
          }
        }}
        className={`
          px-4 py-2.5 rounded-xl border-2 backdrop-blur-sm
          transition-all duration-200
          ${data.isParent 
            ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20' 
            : 'bg-secondary/30 border-border shadow-md'
          }
          hover:border-primary/50 hover:shadow-lg
          min-w-[140px]
          ${hasChildren ? 'cursor-pointer' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center gap-2">
          {hasChildren && (
            <div className="text-muted-foreground flex-shrink-0">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          )}
          {isPrivate && (
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User size={12} className="text-muted-foreground" />
            </div>
          )}
          <div 
            className="text-center flex-1 cursor-pointer hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              data.onNavigate();
            }}
          >
            <div className="text-xs font-semibold text-foreground whitespace-nowrap">
              {data.label}
            </div>
          </div>
          {ClusterIcon && (
            <div className={`w-5 h-5 rounded bg-gradient-to-br ${clusterColor} flex items-center justify-center flex-shrink-0`}>
              <ClusterIcon size={10} className="text-white" />
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// Calculate tree depth and width
const getTreeDimensions = (node: TreeNode, expandedNodes: Set<string>, depth = 0): { maxDepth: number; widthAtDepth: Map<number, number> } => {
  const widthAtDepth = new Map<number, number>();
  widthAtDepth.set(depth, (widthAtDepth.get(depth) || 0) + 1);
  
  let maxDepth = depth;
  
  if (expandedNodes.has(node.id) && node.children.length > 0) {
    node.children.forEach(child => {
      const childDims = getTreeDimensions(child, expandedNodes, depth + 1);
      maxDepth = Math.max(maxDepth, childDims.maxDepth);
      childDims.widthAtDepth.forEach((count, d) => {
        widthAtDepth.set(d, (widthAtDepth.get(d) || 0) + count);
      });
    });
  }
  
  return { maxDepth, widthAtDepth };
};

// Generate nodes and edges from data with expansion state
const generateNodesAndEdges = (
  data: TreeNode, 
  expandedNodes: Set<string>,
  onToggle: (nodeId: string) => void,
  onNavigate: (companyName: string) => void
) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const addNode = (node: TreeNode, x: number, y: number, parentId?: string, ownership?: string) => {
    const hasChildren = node.children.length > 0;
    const company = companies.find(c => c.name === node.name);
    const cluster = company?.cluster ? clusterInfo[company.cluster] : null;
    
    nodes.push({
      id: node.id,
      type: 'custom',
      position: { x, y },
      data: { 
        label: node.name,
        isParent: !parentId,
        hasChildren,
        isExpanded: expandedNodes.has(node.id),
        onToggle: () => hasChildren && onToggle(node.id),
        onNavigate: () => onNavigate(node.name),
        clusterIcon: cluster?.icon,
        clusterColor: cluster?.color,
        isPrivateInvestor: isPrivateInvestor(node.name),
      },
    });
    
    if (parentId) {
      edges.push({
        id: `e${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: 'smoothstep',
        label: ownership || '',
        labelStyle: { 
          fill: 'hsl(var(--muted-foreground))', 
          fontSize: 10,
          fontWeight: 500,
        },
        labelBgStyle: { 
          fill: 'hsl(var(--background))',
          fillOpacity: 0.9,
        },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 4,
        style: { 
          stroke: 'hsl(var(--muted-foreground))',
          strokeWidth: 1,
          strokeDasharray: '5,5',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 10,
          height: 10,
          color: 'hsl(var(--muted-foreground))',
        },
      });
    }
    
    // Add secondary ownership edges
    if (node.parentName2 && node.ownership2) {
      const parentNode = companies.find(c => c.name === node.parentName2);
      if (parentNode && !isPrivateInvestor(node.parentName2)) {
        edges.push({
          id: `e${parentNode.id}-${node.id}-secondary`,
          source: parentNode.id.toString(),
          target: node.id,
          type: 'smoothstep',
          label: node.ownership2,
          labelStyle: { 
            fill: 'hsl(var(--muted-foreground))', 
            fontSize: 9,
            fontWeight: 400,
          },
          labelBgStyle: { 
            fill: 'hsl(var(--background))',
            fillOpacity: 0.9,
          },
          labelBgPadding: [3, 2] as [number, number],
          labelBgBorderRadius: 4,
          style: { 
            stroke: 'hsl(var(--primary))',
            strokeWidth: 1,
            strokeDasharray: '3,3',
            opacity: 0.5,
          },
        });
      }
    }
  };
  
  const processNode = (node: TreeNode, x: number, y: number, parentId?: string, ownership?: string) => {
    addNode(node, x, y, parentId, ownership);
    
    if (expandedNodes.has(node.id) && node.children.length > 0) {
      const childSpacing = 180;
      const totalWidth = (node.children.length - 1) * childSpacing;
      const startX = x - totalWidth / 2;
      
      node.children.forEach((child, index) => {
        const childX = startX + index * childSpacing;
        processNode(child, childX, y + 120, node.id, child.ownership1);
      });
    }
  };
  
  processNode(data, 600, 50);
  
  return { nodes, edges };
};

export const OrganizationTree = () => {
  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));

  const handleToggle = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const handleNavigate = useCallback((companyName: string) => {
    navigate('/', { state: { selectedCompany: companyName } });
  }, [navigate]);

  const { nodes: generatedNodes, edges: generatedEdges } = generateNodesAndEdges(
    organizationData, 
    expandedNodes,
    handleToggle,
    handleNavigate
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(
      organizationData,
      expandedNodes,
      handleToggle,
      handleNavigate
    );
    setNodes(newNodes);
    setEdges(newEdges);
  }, [expandedNodes, handleToggle, handleNavigate, setNodes, setEdges]);

  return (
    <div className="w-full h-[calc(100vh-180px)] bg-dashboard-bg rounded-lg border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="hsl(var(--muted-foreground))" 
          gap={20} 
          size={1}
          style={{ opacity: 0.1 }}
        />
        <Controls 
          className="bg-card border-border"
        />
        <MiniMap 
          className="bg-card border-border"
          nodeColor={(node) => 
            node.data.isParent 
              ? 'hsl(var(--primary))' 
              : 'hsl(var(--secondary))'
          }
          maskColor="hsl(var(--background) / 0.8)"
        />
      </ReactFlow>
    </div>
  );
};
