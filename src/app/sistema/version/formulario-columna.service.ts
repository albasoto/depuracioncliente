import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/clases/question-base';
import { TextboxQuestion } from 'src/app/clases/question-textbox';
import { ElementoCatalogo } from 'src/app/clases/elemento-catalogo';

@Injectable({
  providedIn: 'root'
})
export class FormularioColumnaService {

  getQuestions(elemento: ElementoCatalogo) {
 

    let questions: QuestionBase<any>[] = [
 
    
 
      new TextboxQuestion({
        key: 'valor',
        label: 'Nombre',
        value: elemento.valor,
        required: true,
        order: 1
      }),
 
      
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }
}
