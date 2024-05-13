
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { BlankComponent } from './layouts/blank/blank/blank.component';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { UserOnboardModule } from './user-onboard/user-onboard.module';
import { TreeStructureComponent } from './user-onboard/common-components/tree-structure/tree-structure.component';

// import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';
//import { HomeComponent } from './guest-user/home/home.component'
//import { InitialLayoutHeaderComponent } from './layouts/initial-layout/initial-layout-header/initial-layout-header.component';
//import { GuestUserModuleModule } from './guest-user/guest-user-module.module';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { InitialLayoutHeaderComponent } from './layouts/initial-layout/initial-layout-header/initial-layout-header.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    BlankComponent,
    InitialLayoutHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    UserOnboardModule,
    // GuestUserModuleModule,
    TreeStructureComponent,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
