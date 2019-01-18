import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/clases/question-base';
import { TextboxQuestion } from 'src/app/clases/question-textbox';
import { Entidad } from 'src/app/clases/entidad';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

    // TODO: get from a remote source of question metadata
  // TODO: make asynchronous


  getQuestions(entidad: Entidad) {
 
    let questions: QuestionBase<any>[] = [
 
    
 
      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre',
        value: entidad.nombre,
        required: true,
        order: 1
      }),
 
      
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }
}
