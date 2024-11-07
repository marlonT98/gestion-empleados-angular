import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class ListaEmpleadosComponent {
  empleados: Empleado[];

  constructor(
    private EmpleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //lllamando al metodo
    this.obtenerEmpleados();
  }

  //me suscibire a todo el listado y al arreglo es al que le paso los datos
  private obtenerEmpleados() {
    this.EmpleadoService.obtenerListaEmpleado().subscribe((dato) => {
      this.empleados = dato;
    });
  }

  //actualizar
  actualizarEmpleado(id: number) {
    this.router.navigate(['actualizar-empleado', id]);
  }

  //eliminar
  eliminarEmpleado(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar al empleado',
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmpleadoService.eliminarEmpleado(id).subscribe((dato) => {
          console.log(dato);
          this.obtenerEmpleados();
          Swal.fire(
            'Empleado eliminado',
            'El empleado ha sido eliminado con exito',
            'success'
          );
        });
      }
    });
  }
  verDetallesEmpleado(id: number) {
    this.router.navigate(['empleado-detalles', id]);
  }
}
