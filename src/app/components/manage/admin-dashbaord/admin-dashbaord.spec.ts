import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashbaord } from './admin-dashbaord';

describe('AdminDashbaord', () => {
  let component: AdminDashbaord;
  let fixture: ComponentFixture<AdminDashbaord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashbaord],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashbaord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
