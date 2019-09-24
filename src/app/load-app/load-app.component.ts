import { Component, OnInit, InjectionToken } from '@angular/core';
import { AppService } from '../app.service';
import { LoadAppService } from './shared/load-app.service';
import { Router } from '@angular/router';
declare const APP_EVENT_BUS;

@Component({
  selector: 'app-load-app',
  templateUrl: './load-app.component.html'
})
export class LoadAppComponent implements OnInit {



  constructor(
    public appService: AppService, 
    private loadAppService: LoadAppService,
    private router:Router ) { }

  ngOnInit() 
  {
    this.loadAppService.loadApp(this.appService.menuItemSelected);
    this.listenerGoHome();
  }


  public listenerGoHome()
  {
    APP_EVENT_BUS.subscribe("go-home", go =>
    {
      console.log("go home >>>>>"); 
      this.loadAppService.unloadApp();
      this.router.navigate(['/home']);
    })
  }
}
