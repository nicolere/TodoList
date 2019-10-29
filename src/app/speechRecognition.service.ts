import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import * as _ from "lodash";

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone) {}

  record(): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>(<any>window);
      this.speechRecognition = new webkitSpeechRecognition();

      // Autorise l'écoute en continue
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimresults = true;

      // Choisi la langue d'écoute
      this.speechRecognition.lang = "fr";

      // Ecoute
      this.speechRecognition.onresult = speech => {
        let term: string = "";
        if (speech.results) {
          // Retranscription du vocal
          var result = speech.results[speech.resultIndex];
          var transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log("Résultat non-reconnu -- Réessayez");
            } else {
              // Convertit en string la retranscription
              term = _.trim(transcript);
              //   console.log("vous avez dit : "+ term);
            }
          }
        }
        this.zone.run(() => {
          observer.next(term);
        });
      };
      // Renvoie vers la partie erreur
      this.speechRecognition.onerror = error => {
        observer.error(error);
      };
      // Renvoie vers la partie complete
      this.speechRecognition.onend = () => {
        observer.complete();
      };
      this.speechRecognition.start();
      console.log("Dites quelques chose !");
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }
}
