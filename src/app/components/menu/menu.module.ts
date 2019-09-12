import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './shared/menu.service';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [MenuComponent],
  exports : [MenuComponent],
  providers : [MenuService]
})
export class MenuModule { }
