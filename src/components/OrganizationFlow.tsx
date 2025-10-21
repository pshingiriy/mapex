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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { EntityCard } from './EntityCard';

const CustomNode = ({ data }: { data: any }) => {
  return (
    <EntityCard
      name={data.name}
      type={data.type}
      ownership={data.ownership}
      id={data.id}
    />
  );
};

const nodeTypes = {
  entity: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'entity',
    position: { x: 500, y: 50 },
    data: { 
      name: 'Holding Group', 
      type: 'Parent Company',
      id: '1'
    },
  },
  {
    id: '2',
    type: 'entity',
    position: { x: 150, y: 250 },
    data: { 
      name: 'Alpha Corp', 
      type: 'Subsidiary',
      ownership: '100.0%',
      id: '2'
    },
  },
  {
    id: '3',
    type: 'entity',
    position: { x: 350, y: 250 },
    data: { 
      name: 'Beta Systems', 
      type: 'Joint Venture',
      ownership: '65.67%',
      id: '3'
    },
  },
  {
    id: '4',
    type: 'entity',
    position: { x: 550, y: 250 },
    data: { 
      name: 'Gamma Ltd', 
      type: 'Subsidiary',
      ownership: '51.23%',
      id: '4'
    },
  },
  {
    id: '5',
    type: 'entity',
    position: { x: 750, y: 250 },
    data: { 
      name: 'Delta Ventures', 
      type: 'Associate',
      ownership: '45.0%',
      id: '5'
    },
  },
  {
    id: '6',
    type: 'entity',
    position: { x: 250, y: 450 },
    data: { 
      name: 'Epsilon Industries', 
      type: 'Subsidiary',
      ownership: '100.0%',
      id: '6'
    },
  },
  {
    id: '7',
    type: 'entity',
    position: { x: 450, y: 450 },
    data: { 
      name: 'Zeta Technologies', 
      type: 'Joint Venture',
      ownership: '50.0%',
      id: '7'
    },
  },
  {
    id: '8',
    type: 'entity',
    position: { x: 650, y: 450 },
    data: { 
      name: 'Eta Solutions', 
      type: 'Subsidiary',
      ownership: '75.5%',
      id: '8'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '100.0%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '65.67%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '51.23%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '45.0%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '100.0%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e3-7',
    source: '3',
    target: '7',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '50.0%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
  {
    id: 'e4-8',
    source: '4',
    target: '8',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
    label: '75.5%',
    labelStyle: { fill: 'hsl(217 91% 70%)', fontWeight: 600, fontSize: 12 },
    labelBgStyle: { fill: 'hsl(217 33% 12%)', fillOpacity: 0.9 },
  },
];

export const OrganizationFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => console.log('Connection:', params),
    []
  );

  return (
    <div className="w-full h-[calc(100vh-120px)] bg-dashboard-bg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-dashboard-bg"
      >
        <Background color="hsl(217 33% 15%)" gap={16} />
        <Controls className="bg-card border-border" />
        <MiniMap
          className="bg-card border-border"
          nodeColor="hsl(217 91% 60%)"
          maskColor="hsl(217 33% 12% / 0.8)"
        />
      </ReactFlow>
    </div>
  );
};
