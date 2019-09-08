import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncludeAppComponent } from './include-app.component';
import { IncludeAppService } from './shared/include-app.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component : IncludeAppComponent
     }
    ]),
  ],
  declarations: [IncludeAppComponent],
  providers:[IncludeAppService]
})
export class IncludeAppModule { }
