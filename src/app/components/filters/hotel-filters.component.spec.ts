import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelFiltersComponent } from './hotel-filters.component';
import { FormsModule } from '@angular/forms';

describe('HotelFiltersComponent', () => {
  let component: HotelFiltersComponent;
  let fixture: ComponentFixture<HotelFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFiltersComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter changes when name changes', () => {
    spyOn(component.filtersChange, 'emit');
    const testName = 'Test Hotel';

    component.onNameChange(testName);

    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      ...component.filters,
      name: testName
    });
  });

  it('should toggle star rating in filters', () => {
    spyOn(component.filtersChange, 'emit');
    const star = 4;

    // Add star
    component.onStarToggle(star);
    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      ...component.filters,
      stars: [star]
    });

    // Remove star
    component.onStarToggle(star);
    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      ...component.filters,
      stars: []
    });
  });

  it('should update minimum rate in filters', () => {
    spyOn(component.filtersChange, 'emit');
    const rate = 4.5;

    component.onRateChange(rate);

    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      ...component.filters,
      minRate: rate
    });
  });

  it('should update maximum price in filters', () => {
    spyOn(component.filtersChange, 'emit');
    const price = 200;

    component.onPriceChange(price);

    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      ...component.filters,
      maxPrice: price
    });
  });
});