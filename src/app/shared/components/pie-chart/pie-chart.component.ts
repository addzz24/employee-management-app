import { Component, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { PieChartData } from '../../../core/types/types';

@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  data = input<PieChartData[]>([]);
  statusClick = output<string>();

  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  constructor() {
    effect(() => {
      if (!this.data() || this.data().length === 0) {
        return;
      }
      this.renderChart();
    });
  }

  renderChart() {
    if (!this.chartContainer) return;

    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth;
    const height = 320;
    const radius = Math.min(width, height) / 2.5;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', '100%')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<PieChartData>().value((d) => d.salary);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const domain = this.data().map((d) => d.department).sort((a, b) => a.localeCompare(b));
    const color = d3
      .scaleOrdinal<string, string>()
      .domain(domain)
      .range(['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6']);

    d3.select(element).style('position', 'relative');

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

    svg
      .selectAll('path')
      .data(pie(this.data()))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.department) as string)
      .style('cursor', 'pointer')
      .on('mouseover', (event: any, d: any) => {
        tooltip.style('opacity', 1).html(`${d.data.department}: ₹${d.data.salary}`);
      })
      .on('mousemove', (event: any) => {
        const rect = element.getBoundingClientRect();
        tooltip
          .style('left', event.clientX - rect.left + 10 + 'px')
          .style('top', event.clientY - rect.top - 40 + 'px');
      })
      .on('mouseleave', () => {
        tooltip.style('opacity', 0);
      })

    svg
      .selectAll('text')
      .data(pie(this.data()))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('font-weight', 'bold');
  }
}
