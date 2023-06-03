'use client';
import { TrackContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import { VisualizationSpec, createClassFromSpec } from 'react-vega';

interface Edge {
  source: number;
  target: number;
  weight: number;
}

export const EdgeBundling = ({ data }: any) => {
  const { selectedTrack } = useContext(TrackContext);
  const [nodes, setNodes] = useState([]);
  const [filteredEdges, setFilteredEdges] = useState([{}]);
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

    const edges: Edge[] = [];
    for (let i = 1; i < nodesHm.length; i++) {
      for (let j = i + 1; j < nodesHm.length; j++) {
        edges.push({
          source: i,
          target: j,
          weight: data.correlation[i - 1][j - 1],
        });
      }
    }

    const edgesHm = edges.filter((edge: Edge) => edge.weight > 0.05);
    setFilteredEdges(edgesHm);
  }, [data.correlation, data.songs]);

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
    console.log(
      newTestSpec.signals.length,
      newTestSpec.signals[newTestSpec.signals.length - 1]
    );

    setTestSpec(newTestSpec);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack, nodes, filteredEdges]);

  const EdgeBundlingFromSpec = createClassFromSpec({
    mode: 'vega',
    spec: testSpec as VisualizationSpec,
  });

  return <EdgeBundlingFromSpec />;
};
