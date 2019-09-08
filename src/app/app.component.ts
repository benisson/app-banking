import { Component, OnInit } from '@angular/core';
import { MenuItem } from './components/menu/shared/menu-item.model';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(public appService: AppService, private router:Router)  
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
      this.appService.itemMenuSelected = menuItem;
      this.router.navigate(['include-app'])
  }




}
