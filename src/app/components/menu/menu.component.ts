import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuService } from './shared/menu.service';
import { MenuItem } from './shared/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output()
  public emitItemSelected = new EventEmitter<MenuItem>();

  public menuItens: Array<MenuItem>;

  constructor(private menuService: MenuService) { }

  ngOnInit() 
  {
    this.findMenuOptions();
  }


  private findMenuOptions()
  {
      this.menuService
          .findMenuOptions()
          .subscribe(menu =>
            {
                this.menuItens = menu;
            })
  }

  /**
   * Recebe o item selecionado e emite o evento passando o item.
   * 
   * @param item 
   */
  public selectedItem(item:MenuItem)
  {
      this.emitItemSelected.emit(item);
  }
}
