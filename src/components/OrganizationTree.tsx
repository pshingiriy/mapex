import { useState, useCallback, useEffect, useRef } from 'react';
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
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ChevronRight, ChevronDown, User, Search, RotateCcw, Download, X, LayoutGrid, LayoutList, Users } from 'lucide-react';
import { companies, clusterInfo, isPrivateInvestor, getSupervisors, CompanyData } from '@/data/organizationData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

interface TreeNode {
  id: string;
  name: string;
  ownership1?: string;
  parentName1?: string;
  ownership2?: string;
  parentName2?: string;
  cluster?: string | null;
  supervisor?: string;
  children: TreeNode[];
  level: number;
  hasIndividualShareholder?: boolean;
}

// Check if a company has individual (private) shareholders
const hasIndividualShareholder = (companyName: string): boolean => {
  const company = companies.find(c => c.name === companyName);
  if (!company) return false;
  return isPrivateInvestor(company.parentName2) || isPrivateInvestor(company.parentName1);
};

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
      supervisor: company.supervisor,
      children: [],
      level: 0,
      hasIndividualShareholder: hasIndividualShareholder(company.name),
    });
  });
  
  // Build relationships (only using primary parent for tree structure)
  const root = nodeMap.get("Parent holding company")!;
  root.level = 0;
  
  const setLevels = (node: TreeNode, level: number) => {
    node.level = level;
    node.children.forEach(child => setLevels(child, level + 1));
  };
  
  companies.forEach(company => {
    if (company.parentName1 && nodeMap.has(company.parentName1)) {
      const parent = nodeMap.get(company.parentName1)!;
      const child = nodeMap.get(company.name)!;
      if (!parent.children.find(c => c.id === child.id)) {
        parent.children.push(child);
      }
    }
  });
  
  setLevels(root, 0);
  
  return root;
};

const organizationData = buildTree();

// Get cluster color for node background
const getClusterBgColor = (cluster: string | null | undefined): string => {
  if (!cluster || !clusterInfo[cluster]) return 'hsl(var(--secondary))';
  const colorMap: Record<string, string> = {
    "Телеком-операторы/B2O": "hsl(217 91% 60% / 0.15)",
    "Мобильный бизнес": "hsl(270 91% 65% / 0.15)",
    "ЦОД и облачные сервисы": "hsl(239 84% 67% / 0.15)",
    "Информационная безопасность": "hsl(142 71% 45% / 0.15)",
    "Государственные цифровые услуги и сервисы": "hsl(189 94% 43% / 0.15)",
    "Коммерческий ИТ-кластер": "hsl(25 95% 53% / 0.15)",
    "Цифровые регионы": "hsl(330 81% 60% / 0.15)",
    "БТИ (Блок технической инфраструктуры)": "hsl(45 93% 47% / 0.15)",
    "Х.Tech (корпоративный венчурный фонд)": "hsl(160 84% 39% / 0.15)",
    "Цифротех": "hsl(174 72% 40% / 0.15)",
    "Здоровье": "hsl(0 84% 60% / 0.15)",
    "Госсервисы": "hsl(263 70% 50% / 0.15)",
    "Образование": "hsl(199 89% 48% / 0.15)",
    "Прочие": "hsl(220 9% 46% / 0.15)",
  };
  return colorMap[cluster] || 'hsl(var(--secondary))';
};

const getClusterBorderColor = (cluster: string | null | undefined): string => {
  if (!cluster || !clusterInfo[cluster]) return 'hsl(var(--border))';
  const colorMap: Record<string, string> = {
    "Телеком-операторы/B2O": "hsl(217 91% 60% / 0.5)",
    "Мобильный бизнес": "hsl(270 91% 65% / 0.5)",
    "ЦОД и облачные сервисы": "hsl(239 84% 67% / 0.5)",
    "Информационная безопасность": "hsl(142 71% 45% / 0.5)",
    "Государственные цифровые услуги и сервисы": "hsl(189 94% 43% / 0.5)",
    "Коммерческий ИТ-кластер": "hsl(25 95% 53% / 0.5)",
    "Цифровые регионы": "hsl(330 81% 60% / 0.5)",
    "БТИ (Блок технической инфраструктуры)": "hsl(45 93% 47% / 0.5)",
    "Х.Tech (корпоративный венчурный фонд)": "hsl(160 84% 39% / 0.5)",
    "Цифротех": "hsl(174 72% 40% / 0.5)",
    "Здоровье": "hsl(0 84% 60% / 0.5)",
    "Госсервисы": "hsl(263 70% 50% / 0.5)",
    "Образование": "hsl(199 89% 48% / 0.5)",
    "Прочие": "hsl(220 9% 46% / 0.5)",
  };
  return colorMap[cluster] || 'hsl(var(--border))';
};

// Custom node component with tooltip
const CustomNode = ({ data }: any) => {
  const hasChildren = data.hasChildren;
  const isExpanded = data.isExpanded;
  const ClusterIcon = data.clusterIcon;
  const clusterColor = data.clusterColor;
  const isPrivate = data.isPrivateInvestor;
  const hasIndividualShareholderFlag = data.hasIndividualShareholder;
  const level = data.level;
  const isHighlighted = data.isHighlighted;
  const isHorizontal = data.isHorizontal;
  
  // Size based on level - optimized spacing
  const sizeClass = level === 0 
    ? 'min-w-[200px] max-w-[220px] px-5 py-3' 
    : level === 1 
      ? 'min-w-[180px] max-w-[200px] px-4 py-2.5' 
      : 'min-w-[160px] max-w-[180px] px-3 py-2';
  
  const textSize = level === 0 ? 'text-sm' : level === 1 ? 'text-xs' : 'text-[11px]';
  
  const nodeContent = (
    <div className="relative">
      <Handle type="target" position={isHorizontal ? Position.Left : Position.Top} style={{ opacity: 0 }} />
      
      {/* Individual shareholder indicator badge - positioned in top-left corner */}
      {hasIndividualShareholderFlag && (
        <div 
          className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-md bg-amber-500 border-2 border-amber-400 shadow-lg flex items-center justify-center"
          title="Есть физлицо в составе участников"
        >
          <Users size={12} className="text-white" />
        </div>
      )}
      
      <div
        onClick={(e) => {
          if (hasChildren) {
            e.stopPropagation();
            data.onToggle();
          }
        }}
        style={{
          backgroundColor: data.cluster ? getClusterBgColor(data.cluster) : undefined,
          borderColor: data.cluster ? getClusterBorderColor(data.cluster) : undefined,
        }}
        className={`
          ${sizeClass} rounded-xl border-2 backdrop-blur-sm
          transition-all duration-300 ease-out
          ${!data.cluster ? (level === 0 
            ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20' 
            : 'bg-secondary/30 border-border shadow-md') : 'shadow-md'}
          hover:shadow-lg hover:scale-105
          ${hasChildren ? 'cursor-pointer' : 'cursor-pointer'}
          ${isHighlighted ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          {hasChildren && (
            <div className="text-muted-foreground flex-shrink-0 transition-transform duration-200">
              {isExpanded ? <ChevronDown size={level === 0 ? 16 : 14} /> : <ChevronRight size={level === 0 ? 16 : 14} />}
            </div>
          )}
          {isPrivate && (
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User size={12} className="text-muted-foreground" />
            </div>
          )}
          <div 
            className="text-center flex-1 cursor-pointer hover:text-primary transition-colors min-w-0"
            onClick={(e) => {
              e.stopPropagation();
              data.onNavigate();
            }}
          >
            <div className={`${textSize} font-semibold text-foreground truncate`}>
              {data.label}
            </div>
            {data.supervisor && level > 0 && (
              <div className="text-[9px] text-muted-foreground mt-0.5 truncate">
                {data.supervisor}
              </div>
            )}
          </div>
          {ClusterIcon && (
            <div className={`w-5 h-5 rounded bg-gradient-to-br ${clusterColor} flex items-center justify-center flex-shrink-0`}>
              <ClusterIcon size={10} className="text-white" />
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={isHorizontal ? Position.Right : Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {nodeContent}
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="max-w-xs bg-popover border-border p-3 z-[9999] shadow-xl"
          sideOffset={8}
        >
          <div className="space-y-2">
            <div className="font-semibold text-foreground">{data.label}</div>
            {hasIndividualShareholderFlag && (
              <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-500/10 px-2 py-1 rounded">
                <Users size={12} />
                <span>Есть физлицо в составе участников</span>
              </div>
            )}
            {data.parentInfo && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Владельцы:</span>
                <div className="mt-1 space-y-0.5">
                  {data.parentInfo.map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-1">
                      {isPrivateInvestor(p.name) && <User size={10} className="text-amber-500" />}
                      <span>{p.name}: {p.ownership}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.cluster && (
              <div className="text-xs">
                <span className="font-medium text-muted-foreground">Кластер:</span>{' '}
                <span className="text-foreground">{data.cluster}</span>
              </div>
            )}
            {data.supervisor && (
              <div className="text-xs">
                <span className="font-medium text-muted-foreground">Куратор:</span>{' '}
                <span className="text-foreground">{data.supervisor}</span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// Layout constants for better spacing
const LAYOUT_CONFIG = {
  // Vertical layout
  vertical: {
    nodeWidth: 200,
    nodeHeight: 70,
    horizontalGap: 40,
    verticalGap: 100,
    siblingSpacing: 220,
    levelSpacing: 160,
  },
  // Horizontal layout
  horizontal: {
    nodeWidth: 200,
    nodeHeight: 70,
    horizontalGap: 100,
    verticalGap: 30,
    siblingSpacing: 100,
    levelSpacing: 300,
  },
};

// Generate nodes and edges from data with expansion state
const generateNodesAndEdges = (
  data: TreeNode, 
  expandedNodes: Set<string>,
  onToggle: (nodeId: string) => void,
  onNavigate: (companyName: string) => void,
  searchTerm: string,
  clusterFilter: string,
  supervisorFilter: string,
  isHorizontal: boolean = false
): { nodes: Node[]; edges: Edge[]; expandedNodeIds: string[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const searchLower = searchTerm.toLowerCase();
  const config = isHorizontal ? LAYOUT_CONFIG.horizontal : LAYOUT_CONFIG.vertical;
  const expandedNodeIds: string[] = [];
  
  // Find matching nodes for highlighting
  const matchingNodeIds = new Set<string>();
  if (searchTerm) {
    companies.forEach(company => {
      if (company.name.toLowerCase().includes(searchLower)) {
        matchingNodeIds.add(company.id.toString());
      }
    });
  }
  
  const addNode = (node: TreeNode, x: number, y: number, parentId?: string, ownership?: string) => {
    const hasChildren = node.children.length > 0;
    const company = companies.find(c => c.name === node.name);
    const cluster = company?.cluster ? clusterInfo[company.cluster] : null;
    
    // Check filters
    if (clusterFilter && clusterFilter !== 'all' && company?.cluster !== clusterFilter && node.level > 0) {
      return false;
    }
    if (supervisorFilter && supervisorFilter !== 'all' && company?.supervisor !== supervisorFilter && node.level > 0) {
      return false;
    }
    
    // Build parent info for tooltip
    const parentInfo: { name: string; ownership: string }[] = [];
    if (node.parentName1 && node.ownership1) {
      parentInfo.push({ name: node.parentName1, ownership: node.ownership1 });
    }
    if (node.parentName2 && node.ownership2) {
      parentInfo.push({ name: node.parentName2, ownership: node.ownership2 });
    }
    
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
        cluster: company?.cluster,
        supervisor: company?.supervisor,
        isPrivateInvestor: isPrivateInvestor(node.name),
        hasIndividualShareholder: node.hasIndividualShareholder,
        level: node.level,
        parentInfo: parentInfo.length > 0 ? parentInfo : null,
        isHighlighted: matchingNodeIds.has(node.id),
        isHorizontal,
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
          fillOpacity: 0.95,
        },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 4,
        style: { 
          stroke: 'hsl(var(--muted-foreground))',
          strokeWidth: 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 12,
          height: 12,
          color: 'hsl(var(--muted-foreground))',
        },
        animated: false,
      });
    }
    
    // Add secondary ownership edges
    if (node.parentName2 && node.ownership2) {
      const parentNode = companies.find(c => c.name === node.parentName2);
      if (parentNode && !isPrivateInvestor(node.parentName2)) {
        const parentNodeInTree = nodes.find(n => n.id === parentNode.id.toString());
        if (parentNodeInTree) {
          edges.push({
            id: `e${parentNode.id}-${node.id}-secondary`,
            source: parentNode.id.toString(),
            target: node.id,
            type: 'smoothstep',
            label: node.ownership2,
            labelStyle: { 
              fill: 'hsl(var(--primary))', 
              fontSize: 9,
              fontWeight: 500,
            },
            labelBgStyle: { 
              fill: 'hsl(var(--background))',
              fillOpacity: 0.95,
            },
            labelBgPadding: [3, 2] as [number, number],
            labelBgBorderRadius: 4,
            style: { 
              stroke: 'hsl(var(--primary))',
              strokeWidth: 1,
              strokeDasharray: '5,5',
              opacity: 0.6,
            },
          });
        }
      }
    }
    
    return true;
  };
  
  const processNode = (node: TreeNode, x: number, y: number, parentId?: string, ownership?: string): number => {
    const added = addNode(node, x, y, parentId, ownership);
    if (!added) return 0;
    
    let totalSize = 0;
    
    if (expandedNodes.has(node.id) && node.children.length > 0) {
      // Track expanded nodes for smart zoom
      expandedNodeIds.push(node.id);
      
      // Filter children based on filters
      const filteredChildren = node.children.filter(child => {
        const company = companies.find(c => c.name === child.name);
        if (clusterFilter && clusterFilter !== 'all' && company?.cluster !== clusterFilter) return false;
        if (supervisorFilter && supervisorFilter !== 'all' && company?.supervisor !== supervisorFilter) return false;
        return true;
      });
      
      if (filteredChildren.length > 0) {
        if (isHorizontal) {
          // Horizontal layout: children are positioned to the right
          const childHeights: number[] = [];
          filteredChildren.forEach(child => {
            const subtreeHeight = getSubtreeHeight(child, expandedNodes, config.siblingSpacing, clusterFilter, supervisorFilter);
            childHeights.push(subtreeHeight);
          });
          
          const totalChildrenHeight = childHeights.reduce((a, b) => a + b, 0);
          let currentY = y - totalChildrenHeight / 2;
          
          filteredChildren.forEach((child, index) => {
            const childY = currentY + childHeights[index] / 2;
            // Track child positions for zoom
            expandedNodeIds.push(child.id);
            processNode(child, x + config.levelSpacing, childY, node.id, child.ownership1);
            currentY += childHeights[index];
          });
          
          totalSize = totalChildrenHeight;
        } else {
          // Vertical layout: children are positioned below
          const childWidths: number[] = [];
          filteredChildren.forEach(child => {
            const subtreeWidth = getSubtreeWidth(child, expandedNodes, config.siblingSpacing, clusterFilter, supervisorFilter);
            childWidths.push(subtreeWidth);
          });
          
          const totalChildrenWidth = childWidths.reduce((a, b) => a + b, 0);
          let currentX = x - totalChildrenWidth / 2;
          
          filteredChildren.forEach((child, index) => {
            const childX = currentX + childWidths[index] / 2;
            // Track child positions for zoom
            expandedNodeIds.push(child.id);
            processNode(child, childX, y + config.levelSpacing, node.id, child.ownership1);
            currentX += childWidths[index];
          });
          
          totalSize = totalChildrenWidth;
        }
      }
    }
    
    return Math.max(totalSize, isHorizontal ? config.siblingSpacing : config.siblingSpacing);
  };
  
  // Start position centered
  processNode(data, isHorizontal ? 100 : 800, isHorizontal ? 400 : 80);
  
  return { nodes, edges, expandedNodeIds };
};

// Helper to calculate subtree width (for vertical layout)
const getSubtreeWidth = (
  node: TreeNode, 
  expandedNodes: Set<string>, 
  spacing: number,
  clusterFilter: string,
  supervisorFilter: string
): number => {
  const company = companies.find(c => c.name === node.name);
  if (clusterFilter && clusterFilter !== 'all' && company?.cluster !== clusterFilter) return 0;
  if (supervisorFilter && supervisorFilter !== 'all' && company?.supervisor !== supervisorFilter) return 0;
  
  if (!expandedNodes.has(node.id) || node.children.length === 0) {
    return spacing;
  }
  
  const filteredChildren = node.children.filter(child => {
    const childCompany = companies.find(c => c.name === child.name);
    if (clusterFilter && clusterFilter !== 'all' && childCompany?.cluster !== clusterFilter) return false;
    if (supervisorFilter && supervisorFilter !== 'all' && childCompany?.supervisor !== supervisorFilter) return false;
    return true;
  });
  
  if (filteredChildren.length === 0) return spacing;
  
  return filteredChildren.reduce((total, child) => 
    total + getSubtreeWidth(child, expandedNodes, spacing, clusterFilter, supervisorFilter), 0
  );
};

// Helper to calculate subtree height (for horizontal layout)
const getSubtreeHeight = (
  node: TreeNode, 
  expandedNodes: Set<string>, 
  spacing: number,
  clusterFilter: string,
  supervisorFilter: string
): number => {
  const company = companies.find(c => c.name === node.name);
  if (clusterFilter && clusterFilter !== 'all' && company?.cluster !== clusterFilter) return 0;
  if (supervisorFilter && supervisorFilter !== 'all' && company?.supervisor !== supervisorFilter) return 0;
  
  if (!expandedNodes.has(node.id) || node.children.length === 0) {
    return spacing;
  }
  
  const filteredChildren = node.children.filter(child => {
    const childCompany = companies.find(c => c.name === child.name);
    if (clusterFilter && clusterFilter !== 'all' && childCompany?.cluster !== clusterFilter) return false;
    if (supervisorFilter && supervisorFilter !== 'all' && childCompany?.supervisor !== supervisorFilter) return false;
    return true;
  });
  
  if (filteredChildren.length === 0) return spacing;
  
  return filteredChildren.reduce((total, child) => 
    total + getSubtreeHeight(child, expandedNodes, spacing, clusterFilter, supervisorFilter), 0
  );
};

const OrganizationTreeInner = () => {
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, setViewport, getNodes, getViewport } = useReactFlow();
  
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));
  const [searchTerm, setSearchTerm] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');
  const [supervisorFilter, setSupervisorFilter] = useState('all');
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [lastExpandedNodeId, setLastExpandedNodeId] = useState<string | null>(null);

  // Smart zoom to expanded cluster
  const smartZoomToExpanded = useCallback((expandedNodeId: string, wasExpanded: boolean) => {
    if (!wasExpanded) {
      // Node was collapsed, just fit view
      setTimeout(() => fitView({ duration: 500, padding: 0.15 }), 100);
      return;
    }

    // Node was expanded - zoom to show expanded children
    setTimeout(() => {
      const allNodes = getNodes();
      const expandedNode = allNodes.find(n => n.id === expandedNodeId);
      
      if (!expandedNode) {
        fitView({ duration: 500, padding: 0.15 });
        return;
      }

      // Find children of the expanded node
      const childNodes = allNodes.filter(n => {
        const company = companies.find(c => c.id.toString() === n.id);
        const parentCompany = companies.find(c => c.name === company?.parentName1);
        return parentCompany?.id.toString() === expandedNodeId;
      });

      if (childNodes.length === 0) {
        fitView({ duration: 500, padding: 0.15 });
        return;
      }

      // Calculate bounding box of expanded node + its children
      const nodesToFit = [expandedNode, ...childNodes];
      const minX = Math.min(...nodesToFit.map(n => n.position.x)) - 100;
      const maxX = Math.max(...nodesToFit.map(n => n.position.x)) + 300;
      const minY = Math.min(...nodesToFit.map(n => n.position.y)) - 50;
      const maxY = Math.max(...nodesToFit.map(n => n.position.y)) + 150;

      const width = maxX - minX;
      const height = maxY - minY;
      
      // Get container dimensions
      const container = reactFlowWrapper.current;
      if (!container) {
        fitView({ duration: 500, padding: 0.15 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Calculate zoom level to fit all nodes with padding
      const zoomX = containerWidth / (width * 1.3);
      const zoomY = containerHeight / (height * 1.3);
      const newZoom = Math.min(Math.max(Math.min(zoomX, zoomY), 0.3), 1.5);

      // Calculate center position
      const centerX = minX + width / 2;
      const centerY = minY + height / 2;

      // Set viewport to center on expanded cluster
      setViewport(
        {
          x: containerWidth / 2 - centerX * newZoom,
          y: containerHeight / 2 - centerY * newZoom,
          zoom: newZoom,
        },
        { duration: 500 }
      );
    }, 150);
  }, [fitView, getNodes, setViewport]);

  const handleToggle = useCallback((nodeId: string) => {
    let wasExpanded = false;
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
        wasExpanded = false;
      } else {
        newSet.add(nodeId);
        wasExpanded = true;
      }
      return newSet;
    });
    setLastExpandedNodeId(nodeId);
    // Use smart zoom after toggle
    setTimeout(() => smartZoomToExpanded(nodeId, !expandedNodes.has(nodeId)), 50);
  }, [smartZoomToExpanded, expandedNodes]);

  const handleNavigate = useCallback((companyName: string) => {
    navigate('/', { state: { selectedCompany: companyName } });
  }, [navigate]);

  const handleReset = useCallback(() => {
    setExpandedNodes(new Set(['1']));
    setSearchTerm('');
    setClusterFilter('all');
    setSupervisorFilter('all');
    setIsHorizontal(false);
    setTimeout(() => fitView({ duration: 400, padding: 0.2 }), 50);
  }, [fitView]);

  const handleLayoutToggle = useCallback(() => {
    setIsHorizontal(prev => !prev);
    setTimeout(() => fitView({ duration: 400, padding: 0.2 }), 50);
  }, [fitView]);

  const handleExport = useCallback(async () => {
    if (!reactFlowWrapper.current) return;
    
    try {
      const flowElement = reactFlowWrapper.current.querySelector('.react-flow') as HTMLElement;
      if (!flowElement) return;
      
      const dataUrl = await toPng(flowElement, {
        backgroundColor: 'hsl(222, 47%, 11%)',
        quality: 1,
      });
      
      const link = document.createElement('a');
      link.download = 'organization-structure.png';
      link.href = dataUrl;
      link.click();
      toast.success('Структура экспортирована в PNG');
    } catch (error) {
      toast.error('Ошибка экспорта');
    }
  }, []);

  const { nodes: generatedNodes, edges: generatedEdges } = generateNodesAndEdges(
    organizationData, 
    expandedNodes,
    handleToggle,
    handleNavigate,
    searchTerm,
    clusterFilter,
    supervisorFilter,
    isHorizontal
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(
      organizationData,
      expandedNodes,
      handleToggle,
      handleNavigate,
      searchTerm,
      clusterFilter,
      supervisorFilter,
      isHorizontal
    );
    setNodes(newNodes);
    setEdges(newEdges);
  }, [expandedNodes, handleToggle, handleNavigate, setNodes, setEdges, searchTerm, clusterFilter, supervisorFilter, isHorizontal]);

  const supervisors = getSupervisors();
  const clusterNames = Object.keys(clusterInfo);

  return (
    <div className="w-full h-[calc(100vh-180px)] flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск компании..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <Select value={clusterFilter} onValueChange={setClusterFilter}>
          <SelectTrigger className="w-[200px] bg-background/50">
            <SelectValue placeholder="Все кластеры" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все кластеры</SelectItem>
            {clusterNames.map(cluster => (
              <SelectItem key={cluster} value={cluster}>{cluster}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={supervisorFilter} onValueChange={setSupervisorFilter}>
          <SelectTrigger className="w-[180px] bg-background/50">
            <SelectValue placeholder="Все кураторы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все кураторы</SelectItem>
            {supervisors.map(s => (
              <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex gap-2 ml-auto">
          {/* Legend for individual shareholder indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground bg-background/50 rounded border border-border">
            <div className="w-4 h-4 rounded-sm bg-amber-500 flex items-center justify-center">
              <Users size={10} className="text-white" />
            </div>
            <span>Есть физлицо</span>
          </div>
          
          <div className="flex items-center gap-1 bg-background/50 rounded-md p-1 border border-border">
            <Button 
              variant={!isHorizontal ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => !isHorizontal || handleLayoutToggle()}
              className="px-2"
              title="Вертикальный вид"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button 
              variant={isHorizontal ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => isHorizontal || handleLayoutToggle()}
              className="px-2"
              title="Горизонтальный вид"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Сбросить
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт PNG
          </Button>
        </div>
      </div>
      
      {/* Tree */}
      <div ref={reactFlowWrapper} className="flex-1 bg-dashboard-bg rounded-lg border border-border overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.15}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
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
            nodeColor={(node) => {
              // Highlight nodes with individual shareholders
              if (node.data.hasIndividualShareholder) {
                return 'hsl(45 93% 47%)'; // amber color
              }
              const cluster = node.data.cluster;
              if (cluster && clusterInfo[cluster]) {
                return getClusterBorderColor(cluster).replace('/ 0.5)', '/ 1)');
              }
              return node.data.isParent 
                ? 'hsl(var(--primary))' 
                : 'hsl(var(--secondary))';
            }}
            maskColor="hsl(var(--background) / 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export const OrganizationTree = () => {
  return (
    <ReactFlowProvider>
      <OrganizationTreeInner />
    </ReactFlowProvider>
  );
};
