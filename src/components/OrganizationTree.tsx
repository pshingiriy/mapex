import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Holding Company', percentage: '100.00%' },
    position: { x: 400, y: 50 },
    type: 'custom',
  },
  {
    id: '2',
    data: { label: 'Company 1', percentage: '(50.00%)' },
    position: { x: 50, y: 200 },
    type: 'custom',
  },
  {
    id: '3',
    data: { label: 'Company 2', percentage: '(47.95%)' },
    position: { x: 220, y: 200 },
    type: 'custom',
  },
  {
    id: '4',
    data: { label: 'Company 3', percentage: '(5.03%)' },
    position: { x: 390, y: 200 },
    type: 'custom',
  },
  {
    id: '5',
    data: { label: 'Company 4', percentage: '(98.48%)' },
    position: { x: 530, y: 200 },
    type: 'custom',
  },
  {
    id: '6',
    data: { label: 'Company 5', percentage: '(49.99%)' },
    position: { x: 680, y: 200 },
    type: 'custom',
  },
  {
    id: '7',
    data: { label: 'Company 6', percentage: '(99.93%)' },
    position: { x: 820, y: 200 },
    type: 'custom',
  },
  {
    id: '8',
    data: { label: 'Company 7', percentage: '(33.33%)' },
    position: { x: 980, y: 200 },
    type: 'custom',
  },
  {
    id: '9',
    data: { label: 'Company 8', percentage: '(49.00%)' },
    position: { x: 1160, y: 200 },
    type: 'custom',
  },
  {
    id: '10',
    data: { label: 'Company 9', percentage: '(24.90%)' },
    position: { x: 1330, y: 200 },
    type: 'custom',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-5', source: '1', target: '5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-6', source: '1', target: '6', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-7', source: '1', target: '7', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-8', source: '1', target: '8', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-9', source: '1', target: '9', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-10', source: '1', target: '10', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

const CustomNode = ({ data }: any) => {
  return (
    <div className="px-4 py-3 bg-secondary/40 border-2 border-primary/30 rounded-lg backdrop-blur-sm min-w-[140px]">
      <div className="text-xs text-muted-foreground mb-1">{data.percentage}</div>
      <div className="text-sm font-medium text-foreground">{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const OrganizationTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[calc(100vh-180px)] bg-dashboard-bg rounded-lg border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
        }}
        className="bg-gradient-to-br from-dashboard-bg to-secondary/20"
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} />
        <Controls className="bg-card border-border" />
      </ReactFlow>
    </div>
  );
};
