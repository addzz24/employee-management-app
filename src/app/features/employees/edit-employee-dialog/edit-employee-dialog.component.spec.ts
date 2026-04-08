import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeDialogComponent } from './edit-employee-dialog.component';

describe('EditEmployeeDialogComponent', () => {
  let component: EditEmployeeDialogComponent;
  let fixture: ComponentFixture<EditEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
