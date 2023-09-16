import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableColumnFilterComponent } from './mat-table-column-filter.component';

describe('MatTableColumnFilterComponent', () => {
  let component: MatTableColumnFilterComponent;
  let fixture: ComponentFixture<MatTableColumnFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatTableColumnFilterComponent]
    });
    fixture = TestBed.createComponent(MatTableColumnFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
