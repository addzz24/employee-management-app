import { Component, effect, ElementRef, input, output, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { PieChartData } from '../../../core/types/types';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  data = input<PieChartData[]>([]);
  statusClick = output<string>();

  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  constructor() {
    effect(() => {
      if (this.data() && this.data().length > 0) {
        this.renderChart();
      }
    });
  }

  renderChart() {
    if (!this.chartContainer) return;

    const element = this.chartContainer.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth;
    const height = 300;
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

    const pie = d3.pie<any>().value((d) => d.amount);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const color = d3
      .scaleOrdinal()
      .domain(this.data()
      .map((d) => d.status)
      .sort((a, b)=> a.localeCompare(b))
      )
      .range(['#10b981', '#ef4444']);

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
      .style('opacity', 0);

    svg
      .selectAll('path')
      .data(pie(this.data()))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.status) as string)
      .style('cursor', 'pointer')

      .on('mouseover', (event: any, d: any) => {
        tooltip.style('opacity', 1).html(`${d.data.status}: ${d.data.amount}`);
      })

      .on('mousemove', (event: any) => {
        tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 50 + 'px');
      })

      .on('mouseleave', () => {
        tooltip.style('opacity', 0);
      })

      .on('click', (event: any, d: any) => {
        this.statusClick.emit(d.data.status);
      });

    // Add labels on the pie slices
    svg
      .selectAll('text')
      .data(pie(this.data()))
      .enter()
      .append('text')
      .text((d) => `${d.data.status}: ${d.data.amount}`)
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('font-weight', 'bold');
  }
}
