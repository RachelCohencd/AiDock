import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../models/Flight';
import { FlightsService } from './flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
   
status:boolean;
isValid:boolean;
count:number;
  originChanged: string;
  destinationChanged: any;
  selectedPrice: number;
  NumberOfstations: number;
  constructor(private FlightsService:FlightsService) { 
 FlightsService.onMainEvent.subscribe(
    (onMain) => {
      this.originChanged = onMain.onMain;
      this.destinationChanged= onMain.destinationMode;
   let pk=   this.FlightsService.findAllFlightRoutes(this.originChanged,this.destinationChanged,[]);
    this.FlightsService.callbacksForPaths(pk)
  this.arrayV= this.FlightsService.FlightViewArray
    }
 );
 FlightsService.onChangePrice.subscribe(
   (selectedPrice)=>{
     this.selectedPrice=Number(selectedPrice);
     this.sendToFiltersFuncion()
   }
  
 )
 FlightsService.onChangeNumberOfStations.subscribe(
  (numberOfStations)=>{
    this.NumberOfstations = Number(numberOfStations)
    this.sendToFiltersFuncion()
  }
)
FlightsService.onChangeScreenStatus.subscribe(
  (status)=>{
    this.status=status;
  }
)
  }

  @Input() passList:string[];
  arrayflights = this.FlightsService.getFlights();
  arrayV;
  
  ngOnInit() {
  console.log(((this.FlightsService.FlightArray[3].startTime.getTime()-this.FlightsService.FlightArray[3].endTime.getTime())/(1000*60)) % 60)
    console.log(this.FlightsService.buildAnCountriesObject())
    let arrayPaths=this.FlightsService.findAllFlightRoutes('Israel','France',[]);
  
  }
  sendParametersFunction(){
    let arrayPaths=this.FlightsService.findAllFlightRoutes(this.passList[0],this.passList[1],[]);
    console.log(arrayPaths);  }
    sendToFiltersFuncion() {
      this.FlightsService.filters(this.selectedPrice,this.NumberOfstations)
      this.arrayV=this.FlightsService.FlightViewArray
    }
}


