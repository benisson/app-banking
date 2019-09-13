import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadAppComponent } from './load-app.component';
import { RouterModule } from '@angular/router';
import { LoadAppService } from './shared/load-app.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path : '',
        component : LoadAppComponent
      }
    ])
  ],
  declarations: [LoadAppComponent],
  providers: [LoadAppService]
})
export class LoadAppModule { }
