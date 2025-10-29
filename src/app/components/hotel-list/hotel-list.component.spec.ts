import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelListComponent } from './hotel-list.component';
import { HotelService } from '../../services/hotel.service';
import { HotelFiltersComponent } from '../filters/hotel-filters.component';
import { of } from 'rxjs';
import { Hotel } from '../../shared/interfaces/hotel.interface';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let hotelService: jasmine.SpyObj<HotelService>;

  const mockHotels: Hotel[] = [
    {
      id: '1',
      name: 'Test Hotel',
      image: 'test.jpg',
      address: 'Test Address',
      stars: 4,
      rate: 4.5,
      price: 100
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HotelService', ['getHotels']);
    spy.getHotels.and.returnValue(of(mockHotels));

    await TestBed.configureTestingModule({
      imports: [HotelListComponent, HotelFiltersComponent],
      providers: [
        { provide: HotelService, useValue: spy }
      ]
    }).compileComponents();

    hotelService = TestBed.inject(HotelService) as jasmine.SpyObj<HotelService>;
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotels on init', () => {
    expect(hotelService.getHotels).toHaveBeenCalledWith(1, 10, '', [], 0, 1000);
    expect(component.hotels).toEqual(mockHotels);
    expect(component.loading).toBeFalse();
  });

  it('should handle filter changes', () => {
    const newFilters = {
      name: 'Test',
      stars: [4, 5],
      minRate: 4,
      maxPrice: 200
    };

    component.onFiltersChange(newFilters);

    expect(hotelService.getHotels).toHaveBeenCalledWith(
      1,
      10,
      newFilters.name,
      newFilters.stars,
      newFilters.minRate,
      newFilters.maxPrice
    );
  });

  it('should handle page changes', () => {
    const newPage = 2;

    component.onPageChange(newPage);

    expect(hotelService.getHotels).toHaveBeenCalledWith(
      newPage,
      10,
      component.filters.name,
      component.filters.stars,
      component.filters.minRate,
      component.filters.maxPrice
    );
  });

  it('should format star display correctly', () => {
    expect(component.getStarDisplay(3)).toBe('⭐⭐⭐');
    expect(component.getStarDisplay(5)).toBe('⭐⭐⭐⭐⭐');
  });
});