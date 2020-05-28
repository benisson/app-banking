import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './shared/menu.service';
import { NbIconModule } from '@nebular/theme';
@NgModule({
  imports: [
    CommonModule,
    NbIconModule
  ],
  declarations: [MenuComponent],
  exports : [MenuComponent],
  providers : [MenuService]
})
export class MenuModule { }
