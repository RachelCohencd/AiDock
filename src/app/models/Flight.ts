import { DatePipe } from '@angular/common';


export class Flight
{
        origin:string;
        destination:string;
        startTime:Date;
        endTime:Date;
        numberOfBegs:number;
        price:number;
     
            public datepipe: DatePipe
      
        //     this.datepipe.transform(this.startTime, 'M/d/yy, h:mm a')
        //     this.datepipe.transform(this.endTime, 'M/d/yy, h:mm a')
        //   }
        /**
         *
         */
        constructor(origin,destination,startTime,endTime,numberOfBegs,price) {
           this.origin = origin;
           this.destination = destination;
           this.startTime = startTime;
           this.endTime = endTime
        //    this.startTime = startTime.transform(this.startTime, 'M/d/yy, h:mm a');
        //    this.endTime = endTime.transform(this.endTime, 'M/d/yy, h:mm a');
           this.numberOfBegs = numberOfBegs;
           this.price= price;    
        }
       
}