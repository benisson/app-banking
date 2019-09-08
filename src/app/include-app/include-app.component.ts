import { Component, OnInit } from '@angular/core';
import { IncludeAppService } from './shared/include-app.service';
import { AppService } from '../app.service';

@Component({
  template: '',
})

export class IncludeAppComponent implements OnInit {

  constructor(private includeAppService: IncludeAppService, private appService:AppService) { }

  ngOnInit() 
  {
    const itemMenu = this.appService.itemMenuSelected;
    this.includeAppService.includeApp(itemMenu)  
  }

  

}
