import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  originMode;
  destinationMode;

  

  constructor() { }

  ngOnInit() {
  }

}
