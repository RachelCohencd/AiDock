import { Component } from '@angular/core';
import { FlightsService } from './components/flights/flights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

status:boolean=false;
countriesText='Filter';
filtersText='Change country of origin and country of destination';
    originMode = '';
    destinationMode='';
    oneOrigin;
    messageOfRequired:string;
    onChange(currentCountry){
      console.log(currentCountry)
      this.oneOrigin=currentCountry;
    }
clickToHidden(){
  // buttonText.textContent=(this.status) ? this.countriesText:this.filtersText
  this.status=!this.status;
  this.messageOfRequired='';
  this.service.onChangeScreenStatus.emit(this.status)
}
passList:string[];
 sendCurrentSearch(){
  this.passList=[this.originMode,this.destinationMode]

 }
 constructor(private service:FlightsService){

}
//  changeColor(){
//   document.getElementById("input").style.backgroundColor = '#000000';
//   }
  
updateOnMain(onMain,destinationMode):void {
  this.messageOfRequired='';
  if(onMain&&destinationMode) {
    this.clickToHidden()
    this.service.onMainEvent.emit({onMain,destinationMode});
  }
  else if(onMain)
  this.messageOfRequired='Destination is a required field';
  else
  this.messageOfRequired='Origin is a required field';
}
updateOnChangePrice(price):void {
  this.service.onChangePrice.emit(price)
}
selectNumberOfStations(numberOfStations):void {
  this.service.onChangeNumberOfStations.emit(numberOfStations)
}

}
