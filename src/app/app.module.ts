import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslateProvider } from '../providers/translate/translate';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TranslateProvider
  ]
})
export class AppModule {}
