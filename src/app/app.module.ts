import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { LoginPageComponent } from './core/login-page/login-page.component';
import { RegistrPageComponent } from './core/registr-page/registr-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { WebsocketService } from './shared/services/websocket.service';
import { CompaniesListComponent } from './modules/companies-list/companies-list.component';
import { CompaniesListModule } from './modules/companies-list/companies-list.module';
import { GlobalChatComponent } from './modules/global-chat/global-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    LoginPageComponent,
    RegistrPageComponent,
    HeaderComponent,
    GlobalChatComponent
  ],
  entryComponents: [CompaniesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    CompaniesListModule
  ],
  providers: [ WebsocketService, LoginPageComponent, HeaderComponent, HomePageComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
