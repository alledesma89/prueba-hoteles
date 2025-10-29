import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../shared/interfaces/hotel.interface';
import { HotelFiltersComponent } from '../filters/hotel-filters.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelFiltersComponent],
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  loading = true;

  filters = {
    name: '',
    stars: [] as number[],
    minRate: 0,
    maxPrice: 1000
  };

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.loadHotels();
  }

  // Public helper: apply a name filter from outside (parent component)
  public applyNameFilter(name: string): void {
    this.filters.name = name || '';
    this.currentPage = 1;
    this.loadHotels();
  }

  onFiltersChange(newFilters: typeof this.filters): void {
    this.filters = newFilters;
    this.currentPage = 1; // Reset to first page when filters change
    this.loadHotels();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHotels();
  }

  private loadHotels(): void {
    this.loading = true;
    this.hotelService
      .getHotels(
        this.currentPage,
        this.itemsPerPage,
        this.filters.name,
        this.filters.stars,
        this.filters.minRate,
        this.filters.maxPrice
      )
      .subscribe({
        next: (hotels) => {
          this.hotels = hotels;
          this.loading = false;
          // Initialize interactive tilt effect on hotel cards after hotels are rendered
          try {
            // Dynamically import vanilla-tilt in the browser and initialize on hotel cards
            if (typeof document !== 'undefined') {
              import('vanilla-tilt').then((mod: any) => {
                const VanillaTilt = mod.default || mod;
                const elements = document.querySelectorAll('.hotel-card');
                if (elements && elements.length > 0) {
                  // @ts-ignore
                  VanillaTilt.init(Array.from(elements), { max: 12, speed: 400, glare: true, 'max-glare': 0.2 });
                }
              }).catch(() => {/* ignore import errors */});
            }
          } catch (e) {
            // ignore
          }
        },
        error: (error) => {
          console.error('Error loading hotels:', error);
          this.loading = false;
        }
      });
  }

  getStarDisplay(stars: number): string {
    return '⭐'.repeat(stars);
  }

  // Maneja errores de carga de imagen y coloca un placeholder
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      // Use a local asset as fallback so images show even without internet access
      img.src = '/assets/no-image.svg';
    }
  }
}