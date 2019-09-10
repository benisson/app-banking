import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AppService {

    /**
     * ID do elemento para inserir apps.
     */
    public idContainer:string = "idContainer";

    constructor() { }


}