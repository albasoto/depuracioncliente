import { Injectable } from '@angular/core';
import { QuestionBase } from 'src/app/clases/question-base';
import { TextboxQuestion } from 'src/app/clases/question-textbox';
import { Entidad } from 'src/app/clases/entidad';
import { Columna } from 'src/app/clases/columna';
import { DropdownQuestion } from 'src/app/clases/question-dropdown';
import { Expresion } from 'src/app/clases/expresion';
import { Catalogo } from 'src/app/clases/catalogo';
import { ApiService } from 'src/app/servicios/api.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioColumnaService {

  expresiones: Expresion[] = []
  expresionesTransformadas: any[] = []
  catalogos: Catalogo[] = []
  catalogosTransformados: any[] = []

  constructor(private api: ApiService) {

    this.api.get('expresion', { sort: 'nombre' }).subscribe((expresionesObtenidas: Expresion[]) => {
      this.expresiones = expresionesObtenidas

      this.expresiones.forEach(expresion => {
        this.expresionesTransformadas.push({ key: expresion.id, value: expresion.nombre })
      });
    })


    this.api.get('catalogo', { sort: 'nombre' }).subscribe((catalogosObtenidos: Expresion[]) => {
      this.catalogos = catalogosObtenidos

      this.catalogos.forEach(catalogo => {
        this.catalogosTransformados.push({ key: catalogo.id, value: catalogo.nombre })
      });
    })

  }



  getQuestions(columna: any) {

    var columnaTransformada : {expresion?:number,catalogo?:number} = {}
   


    if (!columna.catalogo) {
      columnaTransformada.catalogo = 0
    }else{
      columnaTransformada.catalogo  = columna.catalogo
    }

    if (!columna.expresion) {
      columnaTransformada.expresion = 0
    }else{
      columnaTransformada.expresion  = columna.expresion
    }



    let questions: QuestionBase<any>[] = [



      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre',
        value: columna.nombre,
        required: true,
        order: 1
      }),

      new DropdownQuestion({
        key: 'esRequerido',
        label: 'Es requerido',

        options: [
          { key: true, value: 'SI' },
          { key: false, value: 'NO' },
        ],
        value: columna.esRequerido,
        required: true,
        order: 2
      }),

      new DropdownQuestion({
        key: 'tipo',
        label: 'Tipo',

        options: [
          { key: 'string', value: 'String' },
          { key: 'number', value: 'Numérico' },
          { key: 'boolean', value: 'Booleano' },
          { key: 'catalogo', value: 'Catálogo' },
          { key: 'columna', value: 'Columna' },
          { key: 'expresion', value: 'Expresión' },


        ],
        value: columna.tipo,
        required: true,
        order: 3,
      }),

      new DropdownQuestion({
        key: 'expresion',
        label: 'Expresión',

        options: this.expresionesTransformadas,
        value: columnaTransformada.expresion,
        required: false,
        order: 4,
      }),

      new DropdownQuestion({
        key: 'catalogo',
        label: 'Catálogo',

        options: this.catalogosTransformados,
        value: columnaTransformada.catalogo,
        required: false,
        order: 4,
      }),


    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
