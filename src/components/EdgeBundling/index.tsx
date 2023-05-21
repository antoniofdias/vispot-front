'use client'
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LeafNode {
  x: number;
  y: number;
  data: { key: string; size: number };
}

const BubbleChart: React.FC = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const PADDING_BUBBLE = 15;
    const PADDING_LABEL = 30;
    const BUBBLE_SIZE_MIN = 4;
    const BUBBLE_SIZE_MAX = 20;

    const diameter = 560;
    const radius = diameter / 2;
    const innerRadius = radius - 170;

    const cluster = d3
      .cluster<LeafNode>()
      .size([360, innerRadius]);

    const line = d3
      .radialLine<LeafNode>()
      .curve(d3.curveBundle.beta(0.85))
      .radius((d) => d.y)
      .angle((d) => (d.x / 180) * Math.PI);

    const svg = d3
      .select(chartRef.current)
      .attr('width', diameter)
      .attr('height', diameter)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    let link: d3.Selection<SVGPathElement, unknown, SVGGElement, unknown>;
    let label: d3.Selection<SVGTextElement, LeafNode, SVGGElement, unknown>;
    let bubble: d3.Selection<SVGCircleElement, LeafNode, SVGGElement, unknown>;

    const bubbleSizeScale = d3
      .scaleLinear<number, number>()
      .domain([0, 100])
      .range([BUBBLE_SIZE_MIN, BUBBLE_SIZE_MAX]);

    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchical_edge_bundling.json'
    ).then((hierarchicalData: any) => {
      const root = packageHierarchy(hierarchicalData).sum((d) => d.size);

      cluster(root);
      const leaves = root.leaves();

      link = svg
        .append('g')
        .selectAll('.link')
        .data(packageImports(leaves))
        .enter()
        .append('path')
        .each(function (d) {
          d.source = d[0];
          d.target = d[d.length - 1];
        })
        .attr('class', 'link')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'black');

      label = svg
        .append('g')
        .selectAll('.label')
        .data(leaves)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('dy', '0.31em')
        .attr('transform', function (d) {
          return (
            'rotate(' +
            (d.x - 90) +
            ')translate(' +
            (d.y + PADDING_LABEL) +
            ',0)' +
            (d.x < 180 ? '' : 'rotate(180)')
          );
        })
        .attr('text-anchor', function (d) {
          return d.x < 180 ? 'start' : 'end';
        })
        .text(function (d) {
          return d.data.key;
        });

      bubble = svg
        .append('g')
        .selectAll('.bubble')
        .data(leaves)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('transform', function (d) {
          return (
            'rotate(' +
            (d.x - 90) +
            ')translate(' +
            (d.y + PADDING_BUBBLE) +
            ',0)'
          );
        })
        .attr('r', (d) => bubbleSizeScale(d.value))
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2')
        .style('opacity', 0.2);
    });

    function packageHierarchy(classes: any[]) {
      const map: { [key: string]: any } = {};

      function find(name: string, data: any) {
        let node = map[name];
        let i;

        if (!node) {
          node = map[name] = data || { name: name, children: [] };
          if (name.length) {
            node.parent = find(name.substring(0, (i = name.lastIndexOf('.'))));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }

        return node;
      }

      classes.forEach(function (d) {
        find(d.name, d);
      });

      return d3.hierarchy(map['']);
    }

    function packageImports(nodes: LeafNode[]) {
      const map: { [key: string]: LeafNode } = {};
      const imports: any[] = [];

      nodes.forEach(function (d) {
        map[d.data.name] = d;
      });

      nodes.forEach(function (d) {
        if (d.data.imports)
          d.data.imports.forEach(function (i: string) {
            imports.push(map[d.data.name].path(map[i]));
          });
      });

      return imports;
    }
  }, []);

  return <svg ref={chartRef} id="my_dataviz" />;
};

export default BubbleChart;
