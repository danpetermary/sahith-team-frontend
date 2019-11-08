import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TpApiComponent } from './tp-api/tp-api.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MusicComponent } from './music/music.component';
import { HomeComponent } from './home/home.component';
import { MyRecommendationComponent } from './my-recommendation/my-recommendation.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MyrouteService } from './myroute.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CanActivateGuard } from './can-activate.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooterComponent } from './footer/footer.component';

const routes:Routes=[
  {
    path:'',
    redirectTo:'homepage',
    pathMatch:'full'

  },
  {
    path:'loginpage',
    component:LoginComponent
  },
  {
    path:'registerpage',
    component:RegisterComponent
  },
  {
    path:'homepage',
    component:HomeComponent
  },
  
  {
    path:'updatepage',
    component:UpdateComponent
  },
  
  
      // {
      //   path : '',
      //   redirectTo : 'multimusicpage',
      //   pathMatch : 'full'
      // },
  {
    path : 'multimusicpage',
    component : TpApiComponent,
    canActivate:[CanActivateGuard]
  },
  {
    path : 'favouritepage',
    component : MyFavouritesComponent  
  },
  {
    path : 'recommendationpage',
    component : MyRecommendationComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    TpApiComponent,
    MusicComponent,
    HomeComponent,
    MyRecommendationComponent,
    MyFavouritesComponent,
    UpdateComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    AngularFontAwesomeModule
  ],
  providers: [MyrouteService,AuthenticationService,UserService,CanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
