import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { Hotel } from '../shared/interfaces/hotel.interface';

describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService]
    });
    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get hotels with default parameters', () => {
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

    service.getHotels().subscribe(hotels => {
      expect(hotels).toEqual(mockHotels);
    });

    const req = httpMock.expectOne('http://localhost:3000/hotels?_page=1&_limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);
  });

  it('should get hotels with all filters', () => {
    const mockHotels: Hotel[] = [];
    const stars = [4, 5];
    
    service.getHotels(1, 10, 'Test', stars, 4, 200).subscribe(hotels => {
      expect(hotels).toEqual(mockHotels);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/hotels?_page=1&_limit=10&name_like=Test&stars_in=4,5&rate_gte=4&price_lte=200'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);
  });
});