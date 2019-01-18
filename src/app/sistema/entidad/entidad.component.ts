import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import swal from 'sweetalert2';
import { FormularioService } from './formulario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entidad } from 'src/app/clases/entidad';
import { FormularioColumnaService } from './formulario-columna.service';
import { Columna } from 'src/app/clases/columna';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss']
})
export class EntidadComponent implements OnInit {

  questions: any[];
  questionsColumna: any[] = [];

  entidades: Entidad[] = []

  sort = 'nombre ASC'

  filtroBusqueda = ''
  limite = '10'
  pagina = 1;
  collectionSize = 0

  entidad = new Entidad

  columna = new Columna

  constructor(private api: ApiService, private service: FormularioService, private serviceColumna: FormularioColumnaService, private modalService: NgbModal) {
    this.questions = service.getQuestions(this.entidad);
  }

  nuevaColumna() {
    this.columna = new Columna
    this.questionsColumna = []

    setTimeout(() => {
      this.questionsColumna = this.serviceColumna.getQuestions(new Columna)
    }, 5)

  }

  open(content, entidad) {

    if (entidad) {
      this.entidad = entidad
      this.questions = this.service.getQuestions(entidad);
    } else {
      this.entidad = new Entidad
      this.questions = this.service.getQuestions(new Entidad);
    }
    this.modalService.open(content, { size: 'lg' })
  }

  open2(content, entidad) {

    this.questionsColumna = []
    this.entidad = entidad

    this.modalService.open(content, { size: 'lg' })
  }

  guardarColumna(columna: any) {

    var nuevaColumna : {id?: number,nombre?: string,entidad?: number, tipo?: string, esRequerido?: boolean, expresion?: number, catalogo?: number} = {}

    
    if(columna.expresion!=""){
      nuevaColumna.expresion = columna.expresion
    }

    if(columna.catalogo!=""){
      nuevaColumna.catalogo = parseInt(columna.catalogo)
    }

    nuevaColumna.esRequerido = columna.esRequerido

    nuevaColumna.tipo = columna.tipo

    nuevaColumna.entidad = this.entidad.id 

    nuevaColumna.nombre = columna.nombre

    console.log(columna)

    console.log(nuevaColumna)

  
    if (this.columna.id) {
      this.api.patch('columna/' + this.columna.id, nuevaColumna).subscribe((nuecaColumna: Columna) => {
        swal('Columna modificada satisfactoriamente', '', 'success')
        this.columna = nuecaColumna
        // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la columna', '', 'error')
      })
    } else {

      this.api.post('columna', nuevaColumna).subscribe((nuevaColumna: Columna) => {
        swal('Columna guardada satisfactoriamente', '', 'success')
        this.entidad.columnas.push(nuevaColumna)
        this.questionsColumna = []
        // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar la columna', '', 'error')
        console.error(error);

      })
    }
  }

  editarColumna(columna: Columna) {
    this.columna = columna

    this.questionsColumna = []


    setTimeout(() => {
      this.questionsColumna = this.serviceColumna.getQuestions(columna);
    }, 5)

    function sdsd() {

    }
  }

  eliminarEntidad(entidad: Entidad) {
    swal({
      title: 'Eliminar entidad: ' + entidad.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('entidad/' + entidad.id).subscribe(res => {
          swal(
            'Entidad eliminada!',
            '',
            'success'
          )
          this.obtenerEntidades()
        }, error => {
          swal(
            'Existió un error al eliminar la entidad!',
            '',
            'error'
          )
        })


      }
    })
  }

  eliminarColumna(columna: Columna) {
    swal({
      title: 'Eliminar columna: ' + columna.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('columna/' + columna.id).subscribe(res => {
          swal(
            'Columna eliminada!',
            '',
            'success'
          )
          this.obtenerEntidades()
        }, error => {
          swal(
            'Existió un error al eliminar la columna!',
            '',
            'error'
          )
        })


      }
    })
  }

  obtenerEntidades() {

    var parametros: { limit?: number, skip?: number, sort?: string, where?: string } = {}
    parametros.sort = this.sort

    parametros.where = JSON.stringify({ or: [{ nombre: { contains: this.filtroBusqueda } }] })

    this.api.get('entidad/count', { where: parametros.where }).subscribe((res: any) => {

      this.collectionSize = res.count
    })

    if (this.limite != 'todos') {
      parametros.limit = parseInt(this.limite)
      parametros.skip = (this.pagina * parseInt(this.limite)) - parseInt(this.limite)
    }



    this.api.get('entidad', parametros).subscribe((entidadesObtenidas: Entidad[]) => {
      this.entidades = entidadesObtenidas
    })
  }

  guardarEntidad(entidad: Entidad) {
    if (this.entidad.id) {

      this.api.patch('entidad/' + this.entidad.id, entidad).subscribe((nuevaEntidad: Entidad) => {
        swal('Entidad modificada satisfactoriamente', '', 'success')
        this.obtenerEntidades()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la entidad', '', 'error')
      })

    } else {
      this.api.post('entidad', entidad).subscribe((nuevaEntidad: Entidad) => {
        swal('Entidad guardada satisfactoriamente', '', 'success')
        this.obtenerEntidades()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar la entidad', '', 'error')
      })
    }
  }

  ngOnInit() {
    this.obtenerEntidades()
  }

}
