export const baseSpec = {
  description:
    'A network diagram of lyrical simmilarity, with edges grouped via hierarchical edge bundling.',
  padding: 5,
  autosize: 'none',
  signals: [
    {
      name: 'click',
      value: null,
      on: [{ events: '*:mousedown', update: 'datum' }],
    },
    { name: 'colorIn', value: 'firebrick' },
    { name: 'colorOut', value: 'forestgreen' },
    { name: 'originX', update: 'width / 2' },
    { name: 'originY', update: 'height / 2' },
    {
      name: 'active',
      value: [],
      on: [
        { events: 'text:mouseover', update: '[datum.id]' },
        { events: 'mouseover[!event.item]', update: '[]' },
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
          expr: 'indexof(active, datum.source) !== -1 || indexof(active, datum.target) !== -1',
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
            { test: 'indexof(active, datum.id) !== -1', value: 'black' },
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
};
