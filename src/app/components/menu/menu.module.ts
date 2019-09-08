import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './shared/menu.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent],
  exports : [MenuComponent],
  providers : [MenuService]
})
export class MenuModule { }
