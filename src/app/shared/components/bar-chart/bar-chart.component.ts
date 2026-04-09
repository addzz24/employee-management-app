import { Component, effect, ElementRef, input, output, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BarChartData } from '../../../core/types/types';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  data = input<BarChartData[]>([]);
  categoryClick = output<string>();

  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  constructor() {
    effect(() => {
      if (this.data() && this.data().length > 0 && this.chartContainer) {
        this.renderChart();
      }
    });
  }

  renderChart() {
    if (!this.chartContainer) return;

    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(element).style('position', 'relative');

    const svg = d3
      .select(element)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .style('width', '100%')
      .style('height', '100%')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3
      .select(element)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#111827')
      .style('color', 'white')
      .style('padding', '6px 10px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('white-space', 'nowrap');

    const x = d3
      .scaleBand()
      .domain(this.data().map((d) => d.employmentType))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data(), (d) => d.salary)!])
      .nice()
      .range([height, 0]);

    svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.employmentType)!)
      .attr('y', (d) => y(d.salary))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.salary))
      .attr('fill', '#3b82f6')
      .attr('rx', 6)

      .on('mouseover', (event: any, d: any) => {
        tooltip.style('opacity', 1).html(`${d.employmentType}: ₹${d.salary}`);

        d3.select(event.currentTarget).attr('fill', '#2563eb');
      })

      .on('mousemove', (event: any) => {
        const rect = element.getBoundingClientRect();
        tooltip
          .style('left', event.clientX - rect.left + 10 + 'px')
          .style('top', event.clientY - rect.top - 40 + 'px');
      })

      .on('mouseleave', (event: any) => {
        tooltip.style('opacity', 0);
        d3.select(event.currentTarget).attr('fill', '#3b82f6');
      })

    // Add value labels on top of bars
    svg
      .selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.employmentType)! + x.bandwidth() / 2)
      .attr('y', (d) => y(d.salary) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#374151')
      .text((d) => d.salary);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', '#374151');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('~s')))
      .selectAll('text')
      .style('fill', '#374151');

    svg.selectAll('.domain, .tick line').attr('stroke', '#d1d5db');
  }
}
