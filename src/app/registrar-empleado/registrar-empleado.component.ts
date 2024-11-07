import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css'],
})
export class RegistrarEmpleadoComponent {
  empleado: Empleado = new Empleado();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  guardarEmpleado() {
    this.empleadoServicio.registraEmpleado(this.empleado).subscribe(
      (dato) => {
        this.irListaEmpleados();
      },
      (error) => console.log(error)
    );
  }

  irListaEmpleados() {
    this.router.navigate(['/empleados']);
  }

  onSubmit() {
    this.guardarEmpleado();
  }
}
