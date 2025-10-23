import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  ownership: string;
  children?: Company[];
}

const organizationData: Company = {
  id: '1',
  name: 'Holding Company',
  ownership: '',
  children: [
    { 
      id: '2', 
      name: 'Sub Company 1', 
      ownership: '100%',
      children: [
        { id: '2-1', name: 'Company Alpha', ownership: '75%' },
        { id: '2-2', name: 'Company Beta', ownership: '60%' },
        { id: '2-3', name: 'Company Gamma', ownership: '85%' },
      ]
    },
    { 
      id: '3', 
      name: 'Sub Company 2', 
      ownership: '100%',
      children: [
        { id: '3-1', name: 'Company Delta', ownership: '45%' },
        { id: '3-2', name: 'Company Epsilon', ownership: '90%' },
      ]
    },
    { 
      id: '4', 
      name: 'Sub Company 3', 
      ownership: '100%',
      children: [
        { id: '4-1', name: 'Company Zeta', ownership: '55%' },
        { id: '4-2', name: 'Company Eta', ownership: '70%' },
        { id: '4-3', name: 'Company Theta', ownership: '65%' },
        { id: '4-4', name: 'Company Iota', ownership: '80%' },
      ]
    },
  ],
};

// Custom node component
const CustomNode = ({ data }: any) => {
  const hasChildren = data.hasChildren;
  const isExpanded = data.isExpanded;
  
  return (
    <div
      onClick={data.onToggle}
      className={`
        px-6 py-3 rounded-xl border-2 backdrop-blur-sm
        transition-all duration-200
        ${data.isParent 
          ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20' 
          : 'bg-secondary/30 border-border shadow-md'
        }
        hover:border-primary/50 hover:shadow-lg
        min-w-[160px]
        ${hasChildren ? 'cursor-pointer' : ''}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {hasChildren && (
          <div className="text-muted-foreground">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
        <div className="text-center">
          <div className="text-sm font-semibold text-foreground whitespace-nowrap">
            {data.label}
          </div>
          {data.ownership && (
            <div className="text-xs text-muted-foreground mt-0.5">
              {data.ownership}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// Generate nodes and edges from data with expansion state
const generateNodesAndEdges = (
  data: Company, 
  expandedNodes: Set<string>,
  onToggle: (nodeId: string) => void
) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Parent node at top center
  const hasRootChildren = (data.children?.length || 0) > 0;
  nodes.push({
    id: data.id,
    type: 'custom',
    position: { x: 500, y: 50 },
    data: { 
      label: data.name,
      isParent: true,
      hasChildren: hasRootChildren,
      isExpanded: expandedNodes.has(data.id),
      onToggle: () => hasRootChildren && onToggle(data.id),
    },
  });

  // Only show children if root is expanded
  if (!expandedNodes.has(data.id)) {
    return { nodes, edges };
  }

  // Calculate positions for level 2 children (Sub Companies)
  const children = data.children || [];
  const childSpacing = 280;
  const totalWidth = (children.length - 1) * childSpacing;
  const startX = 500 - totalWidth / 2;

  children.forEach((child, index) => {
    const xPos = startX + index * childSpacing;
    const hasGrandchildren = (child.children?.length || 0) > 0;
    
    nodes.push({
      id: child.id,
      type: 'custom',
      position: { x: xPos, y: 200 },
      data: { 
        label: child.name,
        ownership: child.ownership,
        isParent: false,
        hasChildren: hasGrandchildren,
        isExpanded: expandedNodes.has(child.id),
        onToggle: () => hasGrandchildren && onToggle(child.id),
      },
    });

    // Add edge from parent to child
    edges.push({
      id: `e${data.id}-${child.id}`,
      source: data.id,
      target: child.id,
      type: 'straight',
      style: { 
        stroke: 'hsl(var(--muted-foreground))',
        strokeWidth: 1,
        strokeDasharray: '5,5',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 12,
        height: 12,
        color: 'hsl(var(--muted-foreground))',
      },
    });

    // Only show grandchildren if this child is expanded
    if (expandedNodes.has(child.id) && child.children) {
      const grandchildren = child.children;
      const grandchildSpacing = 200;
      const grandTotalWidth = (grandchildren.length - 1) * grandchildSpacing;
      const grandStartX = xPos - grandTotalWidth / 2;

      grandchildren.forEach((grandchild, gIndex) => {
        const gxPos = grandStartX + gIndex * grandchildSpacing;
        
        nodes.push({
          id: grandchild.id,
          type: 'custom',
          position: { x: gxPos, y: 380 },
          data: { 
            label: grandchild.name,
            ownership: grandchild.ownership,
            isParent: false,
            hasChildren: false,
            isExpanded: false,
            onToggle: () => {},
          },
        });

        // Add edge from child to grandchild
        edges.push({
          id: `e${child.id}-${grandchild.id}`,
          source: child.id,
          target: grandchild.id,
          type: 'straight',
          style: { 
            stroke: 'hsl(var(--muted-foreground))',
            strokeWidth: 1,
            strokeDasharray: '5,5',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: 'hsl(var(--muted-foreground))',
          },
        });
      });
    }
  });

  return { nodes, edges };
};

export const OrganizationTree = () => {
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

  const { nodes: generatedNodes, edges: generatedEdges } = generateNodesAndEdges(
    organizationData, 
    expandedNodes,
    handleToggle
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  // Update nodes and edges when expansion state changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(
      organizationData,
      expandedNodes,
      handleToggle
    );
    setNodes(newNodes);
    setEdges(newEdges);
  }, [expandedNodes, handleToggle, setNodes, setEdges]);

  return (
    <div className="w-full h-[calc(100vh-180px)] bg-dashboard-bg rounded-lg border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
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
