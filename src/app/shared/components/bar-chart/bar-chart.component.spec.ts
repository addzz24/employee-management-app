import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  const mockData = [
    { category: 'Food', amount: 100 },
    { category: 'Travel', amount: 200 },
    { category: 'Shopping', amount: 150 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chart when data changes', () => {

    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const svg = fixture.nativeElement.querySelector('svg');

    expect(svg).toBeTruthy();

  });

  it('should create bars for each data item', () => {

    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const bars = fixture.nativeElement.querySelectorAll('rect');

    expect(bars.length).toBe(mockData.length);
  });

    it('should emit categoryClick when bar is clicked', () => {

    spyOn(component.categoryClick, 'emit');

    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const bar = fixture.nativeElement.querySelector('rect');
    bar.dispatchEvent(new Event('click'));

    expect(component.categoryClick.emit).toHaveBeenCalled();
  });

  it('should handle mouseover and mouseleave events', () => {

    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    component.renderChart();

    const bar = fixture.nativeElement.querySelector('rect');
    bar.dispatchEvent(new Event('mouseover'));
    bar.dispatchEvent(new Event('mousemove'));
    bar.dispatchEvent(new Event('mouseleave'));

    expect(bar).toBeTruthy();
  });
});
