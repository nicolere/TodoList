import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";

import { TodoService } from "./todo.service";
import { SpeechRecognitionService } from "./speechRecognition.service";
import { GMapsService } from "./GMaps.service";

import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSmartModalModule } from "ngx-smart-modal";

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoItemComponent],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_API_KEY"
    }),
    NgxSmartModalModule.forRoot()
  ],
  providers: [TodoService, SpeechRecognitionService, GMapsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
