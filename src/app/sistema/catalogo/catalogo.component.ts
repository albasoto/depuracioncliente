import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Catalogo } from 'src/app/clases/catalogo';
import swal from 'sweetalert2';
import { FormularioService } from './formulario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementoCatalogo } from 'src/app/clases/elemento-catalogo';
import { FormularioElementoService } from './formulario-elemento.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],

})
export class CatalogoComponent implements OnInit {

  questions: any[];
  questionsElemento: any[] = [];

  catalogos: Catalogo[] = []

  sort = 'nombre ASC'

  filtroBusqueda = ''
  limite = '10'
  pagina = 1;
  collectionSize = 0

  catalogo = new Catalogo

  elemento = new ElementoCatalogo

  constructor(private api: ApiService, private service: FormularioService, private serviceElemento: FormularioElementoService, private modalService: NgbModal) {
    this.questions = service.getQuestions(this.catalogo);

  }

  nuevoElemento() {
    this.elemento = new ElementoCatalogo
    this.questionsElemento = []

    setTimeout(() => {
      this.questionsElemento = this.serviceElemento.getQuestions(new ElementoCatalogo)
    }, 5)

  }

  open(content, catalogo) {

    if (catalogo) {
      this.catalogo = catalogo
      this.questions = this.service.getQuestions(catalogo);
    } else {
      this.catalogo = new Catalogo
      this.questions = this.service.getQuestions(new Catalogo);
    }
    this.modalService.open(content, { size: 'lg' })
  }

  open2(content, catalogo) {

    this.questionsElemento = []
    this.catalogo = catalogo

    this.modalService.open(content, { size: 'lg' })
  }

  ngOnInit() {

    this.obtenerCatalogos()
  }

  guardarElemento(elemento: ElementoCatalogo) {
    if (this.elemento.id) {
      this.api.patch('elementoCatalogo/'+this.elemento.id,elemento).subscribe((nuevoCatalogo: Catalogo) => {
        swal('Elemento modificado satisfactoriamente', '', 'success')
        this.elemento = nuevoCatalogo
       // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar el elemento', '', 'error')
      })
    } else {
      
      this.api.post('elementoCatalogo',{valor: elemento.valor, catalogo: this.catalogo.id}).subscribe((nuevoCatalogo: Catalogo) => {
        swal('Elemento guardado satisfactoriamente', '', 'success')
        this.catalogo.elementos.push(nuevoCatalogo)
        this.questionsElemento = []
       // this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar el elemento', '', 'error')
      })
    }
  }

  editarElemento(elemento: ElementoCatalogo) {
    this.elemento = elemento
    this.questionsElemento = []


    setTimeout(() => {
      this.questionsElemento = this.serviceElemento.getQuestions(elemento);
    }, 5)

    function sdsd() {

    }
  }

  eliminarCatalogo(catalogo: Catalogo) {
    swal({
      title: 'Eliminar catálogo: ' + catalogo.nombre,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('catalogo/' + catalogo.id).subscribe(res => {
          swal(
            'Catálogo eliminado!',
            '',
            'success'
          )
          this.obtenerCatalogos()
        }, error => {
          swal(
            'Existió un error al eliminar el catálogo!',
            '',
            'error'
          )
        })


      }
    })
  }

  eliminarElemento(elemento: ElementoCatalogo) {
    swal({
      title: 'Eliminar elemento: ' + elemento.valor,
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {


      if (result.value) {

        this.api.delete('elementoCatalogo/' + elemento.id).subscribe(res => {
          swal(
            'Elemento eliminado!',
            '',
            'success'
          )
          this.obtenerCatalogos()
        }, error => {
          swal(
            'Existió un error al eliminar el elemento!',
            '',
            'error'
          )
        })


      }
    })
  }

  obtenerCatalogos() {

    var parametros: { limit?: number, skip?: number, sort?: string, where?: string } = {}
    parametros.sort = this.sort

    parametros.where = JSON.stringify({ or: [{ nombre: { contains: this.filtroBusqueda } }] })

    this.api.get('catalogo/count', { where: parametros.where }).subscribe((res: any) => {

      this.collectionSize = res.count
    })

    if (this.limite != 'todos') {
      parametros.limit = parseInt(this.limite)
      parametros.skip = (this.pagina * parseInt(this.limite)) - parseInt(this.limite)
    }



    this.api.get('catalogo', parametros).subscribe((catalogosObtenidos: Catalogo[]) => {
      this.catalogos = catalogosObtenidos
    })
  }

  guardarCatalogo(catalogo: Catalogo) {
    if (this.catalogo.id) {

      this.api.patch('catalogo/' + this.catalogo.id, catalogo).subscribe((nuevoCatalogo: Catalogo) => {
        swal('Catálogo modificado satisfactoriamente', '', 'success')
        this.obtenerCatalogos()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al modificar el catálogo', '', 'error')
      })

    } else {
      this.api.post('catalogo', catalogo).subscribe((nuevoCatalogo: Catalogo) => {
        swal('Catálogo guardado satisfactoriamente', '', 'success')
        this.obtenerCatalogos()
        this.modalService.dismissAll()
      }, error => {
        swal('Existió un error al guardar el catálogo', '', 'error')
      })
    }
  }

}
