import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

import swal from 'sweetalert2';
import { FormularioService } from './formulario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expresion } from 'src/app/clases/expresion';

@Component({
  selector: 'app-expresion',
  templateUrl: './expresion.component.html',
  styleUrls: ['./expresion.component.scss']
})
export class ExpresionComponent implements OnInit {

  questions: any[];
  expresiones: Expresion[] = []
  sort = 'nombre ASC'

  filtroBusqueda = ''
  limite = '10'
  pagina = 1;
  collectionSize = 0

  expresion = new Expresion

  constructor(private api: ApiService, private service: FormularioService, private modalService: NgbModal) {
    this.questions = service.getQuestions(this.expresion);
   }

   open(content, expresion) {

    if (expresion) {
      this.expresion = expresion
      this.questions = this.service.getQuestions(expresion);
    } else {
      this.expresion = new Expresion
      this.questions = this.service.getQuestions(new Expresion);
    }
    this.modalService.open(content, { size: 'lg' })
  }

  ngOnInit() {

    this.obtenerExpresiones()
  }

  eliminarExpresion(expresion: Expresion) {
    swal({
      title: 'Eliminar expresion: ' + expresion.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('expresion/' + expresion.id).subscribe(res => {
          swal(
            'Expresión eliminada!',
            '',
            'success'
          )
          this.obtenerExpresiones()
        }, error => {
          swal(
            'Existió un error al eliminar la expresión!',
            '',
            'error'
          )
        })


      }
    })
  }

  obtenerExpresiones() {

    var parametros: { limit?: number, skip?: number, sort?: string, where?: string } = {}
    parametros.sort = this.sort

    parametros.where = JSON.stringify({ or: [{ nombre: { contains: this.filtroBusqueda } }] })

    this.api.get('expresion/count', { where: parametros.where }).subscribe((res: any) => {

      this.collectionSize = res.count
    })

    if (this.limite != 'todos') {
      parametros.limit = parseInt(this.limite)
      parametros.skip = (this.pagina * parseInt(this.limite)) - parseInt(this.limite)
    }



    this.api.get('expresion', parametros).subscribe((catalogosObtenidos: Expresion[]) => {
      this.expresiones = catalogosObtenidos
    })
  }

  guardarExpresion(expresion: Expresion) {
    if (this.expresion.id) {

      this.api.patch('expresion/' + this.expresion.id, expresion).subscribe((nuevoCatalogo: Expresion) => {
        swal('Expresión modificada satisfactoriamente', '', 'success')
        this.obtenerExpresiones()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la expresión', '', 'error')
      })

    } else {
      this.api.post('expresion', expresion).subscribe((nuevoCatalogo: Expresion) => {
        swal('Expresión guardada satisfactoriamente', '', 'success')
        this.obtenerExpresiones()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la expresión', '', 'error')
      })
    }
  }


  

}
