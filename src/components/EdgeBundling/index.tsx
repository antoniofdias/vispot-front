'use client';
import { TrackContext } from '@/context';
import Slider from '@mui/material/Slider';
import { useContext, useEffect, useState } from 'react';
import { VisualizationSpec, createClassFromSpec } from 'react-vega';

interface Edge {
  source: number;
  target: number;
  weight: number;
}

export const EdgeBundling = ({ data }: any) => {
  const [value, setValue] = useState<number[]>([0.3, 0.7]);
  const { selectedTrack, setSelectedTrack } = useContext(TrackContext);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState<Edge[]>();
  const [filteredEdges, setFilteredEdges] = useState<Edge[]>();
  const [testSpec, setTestSpec] = useState<any>({
    // "$schema": "https://vega.github.io/schema/vega/v5.json",
    description:
      'A network diagram of software dependencies, with edges grouped via hierarchical edge bundling.',
    padding: 5,
    width: 720,
    height: 720,
    autosize: 'none',

    signals: [
      {
        name: 'click',
        value: null,
        on: [{ events: '*:mousedown', update: 'datum' }],
      },
      {
        name: 'tension',
        value: 0.85,
        bind: { input: 'range', min: 0, max: 1, step: 0.01 },
      },
      {
        name: 'radius',
        value: 280,
        bind: { input: 'range', min: 20, max: 400 },
      },
      {
        name: 'extent',
        value: 360,
        bind: { input: 'range', min: 0, max: 360, step: 1 },
      },
      {
        name: 'rotate',
        value: 0,
        bind: { input: 'range', min: 0, max: 360, step: 1 },
      },
      {
        name: 'textSize',
        value: 8,
        bind: { input: 'range', min: 2, max: 20, step: 1 },
      },
      {
        name: 'textOffset',
        value: 2,
        bind: { input: 'range', min: 0, max: 10, step: 1 },
      },
      {
        name: 'layout',
        value: 'cluster',
        // "bind": {"input": "radio", "options": ["tidy", "cluster"]}
      },
      { name: 'colorIn', value: 'firebrick' },
      { name: 'colorOut', value: 'forestgreen' },
      { name: 'originX', update: 'width / 2' },
      { name: 'originY', update: 'height / 2' },
      {
        name: 'active',
        value: null,
        on: [
          { events: 'text:mouseover', update: 'datum.id' },
          { events: 'mouseover[!event.item]', update: 'null' },
        ],
      },
    ],

    data: [
      {
        name: 'tree',
        values: [{}],
        transform: [
          {
            type: 'stratify',
            key: 'id',
            parentKey: 'parent',
          },
          {
            type: 'tree',
            method: { signal: 'layout' },
            size: [1, 1],
            as: ['alpha', 'beta', 'depth', 'children'],
          },
          {
            type: 'formula',
            expr: '(rotate + extent * datum.alpha + 270) % 360',
            as: 'angle',
          },
          {
            type: 'formula',
            expr: 'inrange(datum.angle, [90, 270])',
            as: 'leftside',
          },
          {
            type: 'formula',
            expr: 'originX + radius * datum.beta * cos(PI * datum.angle / 180)',
            as: 'x',
          },
          {
            type: 'formula',
            expr: 'originY + radius * datum.beta * sin(PI * datum.angle / 180)',
            as: 'y',
          },
        ],
      },
      {
        name: 'leaves',
        source: 'tree',
        transform: [
          {
            type: 'filter',
            expr: '!datum.children',
          },
        ],
      },
      {
        name: 'dependencies',
        values: [],
        transform: [
          {
            type: 'formula',
            expr: "treePath('tree', datum.source, datum.target)",
            as: 'treepath',
            initonly: true,
          },
        ],
      },
      {
        name: 'selected',
        source: 'dependencies',
        transform: [
          {
            type: 'filter',
            expr: 'datum.source === active || datum.target === active',
          },
        ],
      },
    ],

    marks: [
      {
        type: 'text',
        from: { data: 'leaves' },
        encode: {
          enter: {
            text: { field: 'name' },
            baseline: { value: 'middle' },
          },
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            dx: { signal: 'textOffset * (datum.leftside ? -1 : 1)' },
            angle: {
              signal: 'datum.leftside ? datum.angle - 180 : datum.angle',
            },
            align: { signal: "datum.leftside ? 'right' : 'left'" },
            fontSize: { signal: 'textSize' },
            fontWeight: [
              { test: "indata('selected', 'source', datum.id)", value: 'bold' },
              { test: "indata('selected', 'target', datum.id)", value: 'bold' },
              { value: null },
            ],
            fill: [
              { test: 'datum.id === active', value: 'black' },
              {
                test: "indata('selected', 'source', datum.id) || indata('selected', 'target', datum.id)",
                signal: 'colorOut',
              },
              { value: 'black' },
            ],
          },
        },
      },
      {
        type: 'group',
        from: {
          facet: {
            name: 'path',
            data: 'dependencies',
            field: 'treepath',
          },
        },
        marks: [
          {
            type: 'line',
            interactive: false,
            from: { data: 'path' },
            encode: {
              enter: {
                interpolate: { value: 'bundle' },
                strokeWidth: { value: 1.5 },
              },
              update: {
                stroke: [
                  {
                    test: 'parent.source === active || parent.target === active',
                    signal: 'colorOut',
                  },
                  { value: 'steelblue' },
                ],
                strokeOpacity: [
                  {
                    test: 'parent.source === active || parent.target === active',
                    value: 1,
                  },
                  { value: 0.2 },
                ],
                tension: { signal: 'tension' },
                x: { field: 'x' },
                y: { field: 'y' },
              },
            },
          },
        ],
      },
    ],

    scales: [
      {
        name: 'color',
        type: 'ordinal',
        domain: ['depends on', 'imported by'],
        range: [{ signal: 'colorIn' }, { signal: 'colorOut' }],
      },
    ],
  });

  useEffect(() => {
    const nodesHm = data.songs.map((track: any) => {
      return {
        id: track.id,
        name: track.name,
        uri: track.uri,
        parent: 0,
      };
    });
    const root = {
      id: 0,
      name: 'root',
    };
    nodesHm.unshift(root);
    setNodes(nodesHm);

    const edgesHm: Edge[] = [];
    for (let i = 1; i < nodesHm.length; i++) {
      for (let j = i + 1; j < nodesHm.length; j++) {
        edgesHm.push({
          source: i,
          target: j,
          weight: data.correlation[i - 1][j - 1],
        });
      }
    }
    setEdges(edgesHm);
    const edgesHm2 = edgesHm.filter(
      (edge) => edge.weight >= value[0] / 10 && edge.weight <= value[1] / 10
    );
    setFilteredEdges(edgesHm2);
  }, [data.correlation, data.songs]);

  useEffect(() => {
    if (edges !== undefined) {
      const edgesHm = edges.filter(
        (edge) => edge.weight >= value[0] / 10 && edge.weight <= value[1] / 10
      );
      setFilteredEdges(edgesHm);
    }
  }, [value]);

  useEffect(() => {
    const newTestSpec = { ...testSpec };
    newTestSpec.signals[newTestSpec.signals.length - 1] = {
      name: 'active',
      value: selectedTrack,
      on: [
        { events: 'text:mouseover', update: 'datum.id' },
        { events: 'mouseover[!event.item]', update: selectedTrack + '' },
      ],
    };

    newTestSpec.data[0].values = nodes;
    newTestSpec.data[2].values = filteredEdges;

    setTestSpec(newTestSpec);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack, nodes, filteredEdges]);

  const EdgeBundlingFromSpec = createClassFromSpec({
    mode: 'vega',
    spec: testSpec as VisualizationSpec,
  });

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleClick = (...args: any) => {
    setSelectedTrack(args[1].id || null);
  };
  const signalListeners = { click: handleClick };

  return data ? (
    <>
      <div style={{ width: 100 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={0.1}
          max={1}
          min={0}
        />
      </div>
      <EdgeBundlingFromSpec signalListeners={signalListeners} />
    </>
  ) : (
    <></>
  );
};
