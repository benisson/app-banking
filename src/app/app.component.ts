import { Component, OnInit } from '@angular/core';
import { MenuItem } from './components/menu/shared/menu-item.model';
import { AppService } from './app.service';
import { Router } from '@angular/router';

declare const APP_SHARED_DATA;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public appService: AppService,
    public router:Router) { }


  public userCurrent:any;  

  ngOnInit(): void {
    this.initDateUser();

  }

  /**
   * Simulando os dados do usuário logado
   */
  private initDateUser() {
    APP_SHARED_DATA.userData = { 'name': 'Brendan Eich', 'cod': 903993, 'phone_number': '34-96545-0540', 'avatar':'assets/img/avatar_client_903993.png' }
  
    this.userCurrent = APP_SHARED_DATA.userData;
  }

  /**
   * Recebe o item selecionado no menu.
   * 
   * @param menuItem 
   */
  public receiveItemMenu(menuItem: MenuItem) {
   this.appService.menuItemSelected = menuItem;
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   this.router.onSameUrlNavigation = 'reload';
   this.router.navigate(['load-app']);
  }






}
