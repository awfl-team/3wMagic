import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import * as NbPlayersReducer from './reducers/nbPlayers.reducer';
import * as HeartBeatMode from './reducers/heartBeatMode.reducer';
import * as LifeSetting from './reducers/lifeSetting.reducer';
import * as TimeModeReducer from './reducers/timeMode.reducer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
        nbPlayers: NbPlayersReducer.reducer,
        heartBeatMode: HeartBeatMode.reducer,
        lifeSetting: LifeSetting.reducer,
        timeMode: TimeModeReducer.reducer,
      },
      )
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NavigationBar,
    Insomnia,
    Vibration,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
