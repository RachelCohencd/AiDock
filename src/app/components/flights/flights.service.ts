import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../../models/Flight';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable(
)

export class FlightsService {

  FlightArray=[new Flight('Israel','France',this.DateFunction('2021-01-14T09:05:00'),this.DateFunction('2021-01-14T17:34:00'),9,743),
  new Flight('Austria','Japan',this.DateFunction('2021-09-12T02:30:00'),this.DateFunction('2021-09-12T18:15:00'),7,800),
  new Flight('France','Bolivia',this.DateFunction('2021-10-01T08:45:00'),this.DateFunction('2021-10-01T17:05:00'),12,750),
  new Flight('Israel','Cyprus',this.DateFunction('2021-09-23T23:00:00'),this.DateFunction('2021-09-24T06:15:00'),7,1000),
  new Flight('Cyprus','France',this.DateFunction('2021-10-04T04:00:00'),this.DateFunction('2021-10-04T10:08:00'),9,720),
  new Flight('Germany','Martinique',this.DateFunction('2021-10-12T14:03:00'),this.DateFunction('2021-10-13T07:15:00'),4,800),
  new Flight('Martinique','Germany',this.DateFunction('2021-10-06T00:00:00'),this.DateFunction('2021-10-06T00:00:00'),8,850),
  new Flight('Romania','Japan',this.DateFunction('2021-10-03T19:05:00'),this.DateFunction('2021-10-04T14:00:00'),11,780),
  new Flight('Israel','Romania',this.DateFunction('2021-10-05T08:06:00'),this.DateFunction('2021-10-05T12:06:00'),10,778),
  new Flight('Cyprus','Germany',this.DateFunction('2021-09-16T05:30:00'),this.DateFunction('2021-09-16T10:15:00'),3,760),
  new Flight('United Kingdom','China',this.DateFunction('2021-10-28T22:50:00'),this.DateFunction('2021-09-29T03:10:00'),2,768),
  new Flight('Venezuela','Israel',this.DateFunction('2021-09-29T03:30:00'),this.DateFunction('2021-09-29T13:15:00'),6,940)
];
onChangeScreenStatus: EventEmitter<any> = new EventEmitter();
onMainEvent: EventEmitter<any> = new EventEmitter();
onChangePrice: EventEmitter<any> = new EventEmitter();
onChangeNumberOfStations: EventEmitter<any> = new EventEmitter();
pathsOfFlights:any[];
index=0;
ViewArray;
jfor;
foundFlight:Flight;
TimeOfFlight:number;
Flightprice;
stops=0;
FlightViewArray=[];
countriesObj:Object ={}
visited:{[x:string]:boolean}={}
countriesAdjMat:{[origion:string]:{[destination:string]:Flight}}={}
keepFlightViewArray: any[];
  constructor() {         
  }
callbacksForPaths(pathsArray:any[]){
    this.pathsOfFlights=pathsArray;

  return  this.flightView(pathsArray.length)
}


filters(selectedPrice:number,numberOfStations:number){
  let filtersArray=[selectedPrice,numberOfStations],newArray=[];
    if(filtersArray["0"]&&filtersArray["1"])
    {
    for (let i = 0; i <this.keepFlightViewArray.length;i++)
    {
      if(filtersArray["1"]==this.keepFlightViewArray[i].Stops.length&&filtersArray["0"]>this.keepFlightViewArray[i].TotalPrice)
      newArray.push(this.keepFlightViewArray[i])
    }
  }
    else 
    {
      if(filtersArray["1"]){
    for (let i = 0; i <this.keepFlightViewArray.length;i++)
    {
    if(filtersArray["1"]==this.keepFlightViewArray[i].Stops.length)
      newArray.push(this.keepFlightViewArray[i])
    }
  }
  else
    {
    for (let i = 0; i <this.keepFlightViewArray.length;i++){
    if(this.keepFlightViewArray[i].TotalPrice<filtersArray["0"])
    newArray.push(this.keepFlightViewArray[i])
  }
  }
    }
    
this.FlightViewArray=newArray
  
}
  findAllFlightRoutes(start,end,path:string[]=[]){
    //path[this.index]=start;
    this.visited[start]=true;
    path.push(start);
    if(start==end)
    {
      let currentPath=[...path];
      return [currentPath];
      // this.paths[this.index].push(path)
    }
      
    if(!(start in this.countriesObj))  
      return [];
      let pathes=[];
    for (let node in this.countriesObj[start]) {
      let  currentNode=this.countriesObj[start][node]
      if(!(this.visited[currentNode]==true))
      {
      let newPathes=this.findAllFlightRoutes(currentNode,end,path);
        for(let newPath of newPathes)
        if(newPath.length>0)
          pathes.push(newPath);
        this.visited[currentNode]=false;
        path.pop();
      }
      
    }
    return pathes;  
  }
  buildAnCountriesObject(){
    for (let i = 0; i < this.FlightArray.length; i++) {
      if (!(this.FlightArray[i].origin in this.countriesObj))
    {
      let currentCountry=[],obgCurrentCountry={},objCurrentFlight={};

      this.countriesObj[this.FlightArray[i].origin]={}
        for (let j = 0; j < this.FlightArray.length;j++) {
          if(this.FlightArray[j].origin==this.FlightArray[i].origin&&!(this.FlightArray[j].origin in this.countriesObj[this.FlightArray[i].origin])){
                currentCountry.push(this.FlightArray[j].destination);
                objCurrentFlight[this.FlightArray[j].destination]=this.FlightArray[j];

          }
                  }
        obgCurrentCountry=Object.assign({}, currentCountry)
        this.countriesObj[this.FlightArray[i].origin]=obgCurrentCountry;
        this.countriesAdjMat[this.FlightArray[i].origin]=objCurrentFlight;
    }

    }
  }
  flightView(lengthOfPaths:number){
    this.FlightViewArray=[]
    for (let i = 0; i < lengthOfPaths; i++) {
      this.Flightprice=0;
      this.TimeOfFlight=0;
      this.FlightViewArray[i]={};
      this.FlightViewArray[i]['origin']=this.pathsOfFlights[i][0]
      let stopsArray=[]
      for (this.jfor = 1; this.jfor<this.pathsOfFlights[i].length; this.jfor++) {
      this.foundFlight=  this.FlightArray.find(flight=>flight.origin==this.pathsOfFlights[i][this.jfor-1]&&
          flight.destination==this.pathsOfFlights[i][this.jfor])
          if(this.jfor>1&&this.jfor<this.pathsOfFlights[i].length)
            stopsArray.push(this.foundFlight.origin)
          

          
          this.Flightprice+=this.foundFlight.price;
          this.TimeOfFlight+=Number(((this.foundFlight.endTime.getTime()-this.foundFlight.startTime.getTime())/(1000*60)/60).toFixed(2))

      }
      this.FlightViewArray[i]['Stops']=stopsArray;
      let TotalTime=this.TimeOfFlight;
      this.FlightViewArray[i]['TotalTimeHour']=(Math.floor(TotalTime)).toString();
      let TotalMinutes=Number((TotalTime-Math.floor(TotalTime)).toFixed(2));
      //(0.48/(5/3)*100).toFixed()
      this.FlightViewArray[i]['TotalTimeMinutes']=(TotalMinutes/(5/3)*100).toFixed()
      // Number(TotalTime.toFixed());
      this.FlightViewArray[i]['TotalPrice']=this.Flightprice;
      this.FlightViewArray[i]['NumOfstops']=(this.jfor-2)*1;
      this.FlightViewArray[i]['destination']=this.pathsOfFlights[i][this.jfor-1]
    }
    this.keepFlightViewArray=this.FlightViewArray
  }
  DateFunction(dateString:string){
   let newDate = new Date(dateString);
return newDate
  }



  getFlights() {
    return this.FlightArray
  }

}
