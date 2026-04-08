import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  const mockData = [
    { status: 'Success', amount: 300 },
    { status: 'Failed', amount: 100 },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should create pie slices for each data item', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();
    const slices = fixture.nativeElement.querySelectorAll('path');
    expect(slices.length).toBe(mockData.length);
  });

  it('should emit statusClick when slice is clicked', () => {
    spyOn(component.statusClick, 'emit');
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();
    const slice = fixture.nativeElement.querySelector('path');
    slice.dispatchEvent(new Event('click'));

    expect(component.statusClick.emit).toHaveBeenCalled();
  });

  it('should handle mousemove event', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();
    const slice = fixture.nativeElement.querySelector('path');

    slice.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 120,
        clientY: 80,
      }),
    );
    expect(slice).toBeTruthy();
  });

  it('should handle mouseleave event', () => {
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    component.renderChart();

    const slice = fixture.nativeElement.querySelector('path');
    slice.dispatchEvent(new Event('mouseleave'));

    expect(slice).toBeTruthy();
  });

  it('should handle empty data safely', () => {
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();

    expect(() => component.renderChart()).not.toThrow();
  });
});
