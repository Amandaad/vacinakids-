import { Injectable } from '@angular/core';
@Injectable({providedIn:'root'})
export class ChildService {
 getChildren(){return [{id:'1',name:'Pedro',status:'EM_DIA'}];}
}
