import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy,
} from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
// import { FooterComponent } from './layouts/full/footer/footer.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { BlankComponent } from './layouts/blank/blank/blank.component';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { HomeComponent } from './guest-user/home/home.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';
import { InitialLayoutHeaderComponent } from './layouts/initial-layout/initial-layout-header/initial-layout-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from './services/Dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { CommonDirective } from './common.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationModule } from './authentication/authentication.module';
import { FooterComponent } from './layouts/full/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/tokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    BlankComponent,
    InitialLayoutHeaderComponent,
    InitialLayoutComponent,
    CommonDirective,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    // UserOnboardModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MaterialModule,
    HomeComponent,
    MatBadgeModule,
    MatCheckboxModule,
    MatListModule,
    AuthenticationModule,
  ],
  exports: [AppHeaderComponent, FooterComponent],
  providers: [
    DialogService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
