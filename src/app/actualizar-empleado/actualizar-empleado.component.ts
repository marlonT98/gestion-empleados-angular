import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css'],
})
export class ActualizarEmpleadoComponent {
  id: number;
  empleado: Empleado = new Empleado();
  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService
      .obtenerEmpleadoPorId(this.id)
      .pipe(
        tap((dato) => {
          //realiza algun efecto secundario
          this.empleado = dato;
        }),
        catchError((error) => {

          return of(null); // Retorna un observable vacío en caso de error

        })
      )
      .subscribe();
  }

  irAlaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
    Swal.fire(
      'Empleado actualizado',
      `El empleado ${this.empleado.nombre} ha sido actualizado con exito`,
      `success`
    );
  }

  onSubmit(): void {
    if (this.empleado) {
      this.empleadoService
        .actulaizarEmpleado(this.id, this.empleado)
        .pipe(
          tap((dato) => {
            this.irAlaListaDeEmpleados(); // Redirige en caso de éxito
          }),
          catchError((error) => {
            console.error('Error al actualizar el empleado:', error);
            return of(null); // Retorna un observable vacío en caso de error
          })
        ).subscribe(); // Realiza la suscripción
    }
  }
}
