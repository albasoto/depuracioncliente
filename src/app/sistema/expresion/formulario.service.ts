import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/clases/question-base';
import { DropdownQuestion } from 'src/app/clases/question-dropdown';
import { TextboxQuestion } from 'src/app/clases/question-textbox';
import { Catalogo } from 'src/app/clases/catalogo';
import { Expresion } from 'src/app/clases/expresion';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

    // TODO: get from a remote source of question metadata
  // TODO: make asynchronous


  getQuestions(expresion: Expresion) {
 
    let questions: QuestionBase<any>[] = [
 
    
 
      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre',
        value: expresion.nombre,
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'valor',
        label: 'valor',
        value: expresion.valor,
        required: true,
        order: 2
      }),
 
      
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }
}
