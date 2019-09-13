import { Injectable } from '@angular/core';
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

    constructor() { }


}