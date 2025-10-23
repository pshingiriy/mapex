import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

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
    { id: '2', name: 'Sub Company 1', ownership: '100%' },
    { id: '3', name: 'Sub Company 2', ownership: '100%' },
    { id: '4', name: 'Sub Company 3', ownership: '100%' },
  ],
};

// Custom node component
const CustomNode = ({ data }: any) => {
  return (
    <div className="relative">
      {data.ownership && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">
          {data.ownership}
        </div>
      )}
      <div
        className={`
          px-8 py-4 rounded-xl border-2 backdrop-blur-sm
          transition-all duration-200
          ${data.isParent 
            ? 'bg-primary/20 border-primary/50 shadow-lg shadow-primary/20' 
            : 'bg-secondary/30 border-border shadow-md'
          }
          hover:border-primary/50 hover:shadow-lg
          min-w-[180px]
        `}
      >
        <div className="text-center">
          <div className="text-sm font-semibold text-foreground whitespace-nowrap">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// Generate nodes and edges from data
const generateNodesAndEdges = (data: Company) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Parent node at top center
  nodes.push({
    id: data.id,
    type: 'custom',
    position: { x: 500, y: 50 },
    data: { 
      label: data.name,
      isParent: true,
    },
  });

  // Calculate positions for children (horizontal layout)
  const children = data.children || [];
  const childSpacing = 220;
  const totalWidth = (children.length - 1) * childSpacing;
  const startX = 500 - totalWidth / 2;

  children.forEach((child, index) => {
    const xPos = startX + index * childSpacing;
    
    nodes.push({
      id: child.id,
      type: 'custom',
      position: { x: xPos, y: 200 },
      data: { 
        label: child.name,
        ownership: child.ownership,
        isParent: false,
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
        strokeWidth: 1.5,
        strokeDasharray: '5,5',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: 'hsl(var(--muted-foreground))',
      },
    });
  });

  return { nodes, edges };
};

export const OrganizationTree = () => {
  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(organizationData);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

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
