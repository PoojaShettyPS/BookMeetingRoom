import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonRoutingModule } from './app-common-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/modules/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppCommonRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    LayoutComponent
  ]
})
export class AppCommonModule { }
