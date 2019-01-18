import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Version } from 'src/app/clases/version';
import swal from 'sweetalert2';
import { FormularioService } from './formulario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntidadColumna } from 'src/app/clases/entidad-columna';
import { FormularioColumnaService } from './formulario-columna.service';
import { Entidad } from 'src/app/clases/entidad';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],

})
export class VersionComponent implements OnInit {

  questions: any[];
  questionsColumna: any[] = [];

  versiones: Version[] = []
  columnas: EntidadColumna[] = []

  sort = 'nombre ASC'

  filtroBusqueda = ''
  limite = '10'
  pagina = 1;
  collectionSize = 0

  version = new Version

  columna = new EntidadColumna

  constructor(private api: ApiService, private service: FormularioService, private serviceElemento: FormularioColumnaService, private modalService: NgbModal) {
    this.questions = service.getQuestions(this.version);

  }

  nuevoElemento() {
    this.columna = new EntidadColumna
    this.questionsColumna = []

    setTimeout(() => {
      this.questionsColumna = this.serviceElemento.getQuestions(new EntidadColumna)
    }, 5)

  }

  open(content, version) {

    if (version) {
      this.version = version
      this.questions = this.service.getQuestions(version);
    } else {
      this.version = new Version
      this.questions = this.service.getQuestions(new Version);
    }
    this.modalService.open(content, { size: 'lg' })
  }

  open2(content, version) {

    console.log(version)

    this.api.get('entidadversion',{version: version.id, populate: 'version, columna'}).subscribe((columnasRecibidas: EntidadColumna[])=>{
      this.columnas = columnasRecibidas
      console.log(this.columnas)
    })

    this.questionsColumna = []
    this.version = version

    this.modalService.open(content, { size: 'lg' })
  }

  ngOnInit() {

    this.obtenerVersiones()
  }

  guardarColumna(columna: EntidadColumna) {
    if (this.columna.id) {
      this.api.patch('entidadElemento/'+this.columna.id,columna).subscribe((nuevaEntidad: EntidadColumna) => {
        swal('Columna modificada satisfactoriamente', '', 'success')
        this.columna = nuevaEntidad
       // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la columna', '', 'error')
      })
    } else {
      
      this.api.post('entidadElemento',{valor: columna.numeroHoja, version: this.version.id}).subscribe((nuevaEntidad: EntidadColumna) => {
        swal('Columna guardada satisfactoriamente', '', 'success')
       // this.catalogo.elementos.push(nuevoCatalogo)
        this.questionsColumna = []
       // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar el elemento', '', 'error')
      })
    }
  }

  editarColumna(columna: EntidadColumna) {
    this.columna = columna
    this.questionsColumna = []


    setTimeout(() => {
      this.questionsColumna = this.serviceElemento.getQuestions(columna);
    }, 5)

    function sdsd() {

    }
  }

  eliminarVersion(version: Version) {
    swal({
      title: 'Eliminar versión: ' + version.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('version/' + version.id).subscribe(res => {
          swal(
            'Versión eliminada!',
            '',
            'success'
          )
          this.obtenerVersiones()
        }, error => {
          swal(
            'Existió un error al eliminar la versión!',
            '',
            'error'
          )
        })


      }
    })
  }

  eliminarElemento(columna: EntidadColumna) {
    swal({
      title: 'Eliminar columna: ' + columna.columna.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('entidadversion/' + columna.id).subscribe(res => {
          swal(
            'Columna eliminada!',
            '',
            'success'
          )
          this.obtenerVersiones()
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

  obtenerVersiones() {

    var parametros: { limit?: number, skip?: number, sort?: string, where?: string } = {}
    parametros.sort = this.sort

    parametros.where = JSON.stringify({ or: [{ nombre: { contains: this.filtroBusqueda } }] })

    this.api.get('version/count', { where: parametros.where }).subscribe((res: any) => {

      this.collectionSize = res.count
    })

    if (this.limite != 'todos') {
      parametros.limit = parseInt(this.limite)
      parametros.skip = (this.pagina * parseInt(this.limite)) - parseInt(this.limite)
    }



    this.api.get('version', parametros).subscribe((versionesObtenidas: Version[]) => {
      this.versiones = versionesObtenidas
    })
  }

  guardarVersion(version: Version) {
    if (this.version.id) {

      this.api.patch('version/' + this.version.id, version).subscribe((nuevaVersion: Version) => {
        swal('Versión modificada satisfactoriamente', '', 'success')
        this.obtenerVersiones()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar la versión', '', 'error')
      })

    } else {
      this.api.post('version', version).subscribe((nuevaVersion: Version) => {
        swal('Versión guardada satisfactoriamente', '', 'success')
        this.obtenerVersiones()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar la versión', '', 'error')
      })
    }
  }

}
