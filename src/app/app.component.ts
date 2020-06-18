import { Component, OnInit } from '@angular/core';
import { MenuItem } from './components/menu/shared/menu-item.model';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { config } from 'rxjs';

declare const APP_SHARED_DATA;
declare const BBEventBus;


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
    this.getWebComponent();
    BBEventBus.subscribe('eventName', this.testeValor);
  }

  private testeValor(data){
    console.log(data);  
    APP_SHARED_DATA.userData.saldo = 50;
  }

  /**
   * Simulando os dados do usuário logado
   */
  private initDateUser() {
    APP_SHARED_DATA.userData = { 'name': 'Brendan Eich', 'cod': 903993, 'phone_number': '34-96545-0540', 'avatar':'assets/img/avatar_client_903993.png', saldo: '100' }
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

  private getWebComponent(){
    this.appService.findConfigApp().subscribe(config => {
      this.MountComponent(config);
    })
  }

  private MountComponent(config: any){
    const elementContainer = document.getElementById('headerColumn');
    const shadowDOM = elementContainer.attachShadow({mode: 'open'});  
    for (const script of config.scripts)
    {
      if(script.includes('.css')){
        const styleEl = document.createElement('style');
        styleEl.innerHTML =  '@import ' + '"' + this.appService.pathApp + '/' + script + '"';
        shadowDOM.appendChild( styleEl );
      } else if (script.includes('.js')){
        const scriptEl = document.createElement('script');
        scriptEl.src =  this.appService.pathApp + '/' + script;
        shadowDOM.appendChild(scriptEl);  
      }
    }
    const el = document.createElement(config.tagName); //nome da tag
    el.setAttribute('titulo', 'Dados cliente');
    el.setAttribute('date','12/12/2020');
    el.setAttribute('totalconta',this.userCurrent.saldo);
    el.setAttribute('nome',this.userCurrent.name);
    el.setAttribute('account','3232-3');
    el.setAttribute('agency','32333-8');
    shadowDOM.appendChild(el);
  }





}
