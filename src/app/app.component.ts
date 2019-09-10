import { Component, OnInit } from '@angular/core';
import { MenuItem } from './components/menu/shared/menu-item.model';
import { AppService } from './app.service';
import { LoadAppService } from './shared/load-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(
    public appService: AppService, 
    private loadAppService: LoadAppService)  
  {}

  ngOnInit(): void 
  {}

  /**
   * Recebe o item selecionado no menu.
   * 
   * @param menuItem 
   */
  public receiveItemMenu(menuItem:MenuItem)
  {
      console.log(menuItem);
      this.loadAppService.loadApp(menuItem);
      this.loadAppService.messageBus();
  }




}
