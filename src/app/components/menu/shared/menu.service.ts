import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MenuItem } from './menu-item.model';

@Injectable()
export class MenuService {

    /**
     * Pesquisa as opções do menu.
     * 
     */
    public findMenuOptions(): Observable<Array<MenuItem>> {
        return this.responseMockMenuOptions();
    }

    /**
     * Simulando a resposta da API responsável por trazer as informações do menu.
     */
    private responseMockMenuOptions() {
        return of(
            [
                new MenuItem(1, 'Seguros', '<app-seguros></app-seguros>', '/public/seguros', '/app-seguros/seguro-residencial', 'security'),
                new MenuItem(2, 'Cartão ', '<app-cartoes></app-cartoes>', '/public/cartoes', '/app-cartoes/cartao-virtual', 'credit_card'),
            ]
        )
    }
}