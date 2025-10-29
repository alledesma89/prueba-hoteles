import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HotelListComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hotel Finder';
  @ViewChild(HotelListComponent) hotelList?: HotelListComponent;

  onHeroSearch(query: string) {
    // Delegate to child component to apply name filter and reload
    this.hotelList?.applyNameFilter(query || '');
  }
}
