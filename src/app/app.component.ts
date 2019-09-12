import { Component, OnInit } from '@angular/core';
import { MenuItem } from './components/menu/shared/menu-item.model';
import { AppService } from './app.service';
import { LoadAppService } from './shared/load-app.service';

declare const APP_SHARED_DATA;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public appService: AppService,
    private loadAppService: LoadAppService) { }


  public userCurrent:any;  

  ngOnInit(): void {
    this.initDateUser();
  }

  /**
   * Simulando os dados do usuário logado
   */
  private initDateUser() {
    APP_SHARED_DATA.userData = { 'name': 'John Silva', 'cod': 903993, 'phone_number': '34-96545-0540' }
  
    this.userCurrent = APP_SHARED_DATA.userData;
  }

  /**
   * Recebe o item selecionado no menu.
   * 
   * @param menuItem 
   */
  public receiveItemMenu(menuItem: MenuItem) {
    console.log(menuItem);
    this.loadAppService.messageBus();
    this.loadAppService.loadApp(menuItem);

  }




}
