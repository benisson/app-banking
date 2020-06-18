import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from './components/menu/shared/menu-item.model';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    /**
     * ID do elemento para inserir apps.
     */
    public idContainer:string = "idContainer";

    /**
     * Item de menu selecionado.
     */
    public menuItemSelected: MenuItem;

    public pathApp: string = '/public/react';

    constructor(private httpClient: HttpClient) { }

    public findConfigApp() 
    {
        return this.httpClient .get(this.pathApp + "/config-app.json");
    }


}