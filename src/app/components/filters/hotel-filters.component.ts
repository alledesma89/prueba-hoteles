import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FilterState {
  name: string;
  stars: number[];
  minRate: number;
  maxPrice: number;
}

@Component({
  selector: 'app-hotel-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-filters.component.html',
  styleUrls: ['./hotel-filters.component.scss']
})
export class HotelFiltersComponent {
  @Output() filtersChange = new EventEmitter<FilterState>();

  filters: FilterState = {
    name: '',
    stars: [],
    minRate: 0,
    maxPrice: 1000
  };

  availableStars = [1, 2, 3, 4, 5];

  onNameChange(value: string): void {
    this.filters = { ...this.filters, name: value };
    this.emitFilters();
  }

  onStarToggle(star: number): void {
    const stars = this.filters.stars.includes(star)
      ? this.filters.stars.filter(s => s !== star)
      : [...this.filters.stars, star];
    
    this.filters = { ...this.filters, stars };
    this.emitFilters();
  }

  onRateChange(value: number): void {
    this.filters = { ...this.filters, minRate: value };
    this.emitFilters();
  }

  onPriceChange(value: number): void {
    this.filters = { ...this.filters, maxPrice: value };
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChange.emit(this.filters);
  }
}