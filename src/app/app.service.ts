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
     * Guarda o item de menu selecionado.
     */
    public itemMenuSelected:MenuItem;

    constructor() { }


}