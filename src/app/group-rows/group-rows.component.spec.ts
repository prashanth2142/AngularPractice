import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowsComponent } from './group-rows.component';

describe('GroupRowsComponent', () => {
  let component: GroupRowsComponent;
  let fixture: ComponentFixture<GroupRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupRowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
