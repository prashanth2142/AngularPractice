import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltinDirectivesComponent } from './builtin-directives.component';

describe('BuiltinDirectivesComponent', () => {
  let component: BuiltinDirectivesComponent;
  let fixture: ComponentFixture<BuiltinDirectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuiltinDirectivesComponent]
    });
    fixture = TestBed.createComponent(BuiltinDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
