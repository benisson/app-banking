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
                new MenuItem(1, 'Seguro Residencial', '<app-seguros type=1></app-seguros>', '/app-seguros', '/app-seguros/seguro-residencial'),
                new MenuItem(2, 'Seguro Auto', '<app-seguros type=2></app-seguros>', '/app-seguros', '/app-seguros/seguro-auto'),
                new MenuItem(3, 'Cartão Virtual', '<app-cartoes></app-cartoes>', '/app-cartoes', '/app-cartoes/cartao-virtual'),
                new MenuItem(4, 'Faturo do Cartão', '<app-cartoes></app-cartoes>', '/app-cartoes', '/app-cartoes/fatura-cartao')
            ]
        )
    }
}