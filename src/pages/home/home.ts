import { TranslateProvider } from './../../providers/translate/translate';
import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 speechList: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;
  public trasText: string = '';
  constructor(private platform: Platform, private speech: SpeechRecognition, public trans : TranslateProvider,
    public zone: NgZone) {

  }
  send(data) {
    console.log(data);
    this.trans.save(data).then(r=>{
      console.log(r);
      this.trasText = r["data"].translations["0"].translatedText;

      this.zone.run(()=>{
        this.trasText
      })
      console.log(this.trasText);
   }).catch(error=>{
     console.log(error);
   });
  }
    listenForSpeech(): void {

      this.androidOptions = {
        prompt: 'Speak into your phone!'
      }

      this.iosOptions = {
        language: 'en-US'
      }

      if (this.platform.is('android')) {
        this.speech.startListening(this.androidOptions).subscribe(data => this.send(data[0]), error => console.log(error));
      }
      else if (this.platform.is('ios')) {
        this.speech.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
      }
    }
  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }
  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speech.hasPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getPermission(): Promise<void> {
    try {
      let permission = await this.speech.requestPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async isSpeechSupported(): Promise<boolean> {
  let isAvailable = await this.speech.isRecognitionAvailable();
  console.log(isAvailable);
  return isAvailable;
}


}
