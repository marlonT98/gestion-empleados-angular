import { Component, NgModule } from '@angular/core';
import { Empleado } from '../empleado';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-detalles',
  templateUrl: './empleado-detalles.component.html',
  styleUrls: ['./empleado-detalles.component.css']
})
export class EmpleadoDetallesComponent {

  id:number;
  empleado :Empleado;
  constructor(private route:ActivatedRoute , private empleadoServicio:EmpleadoService ){


  }

  ngOnInit( ):void{

    this.id = this.route.snapshot.params['id'];
    
    console.log("ID recibido:", this.id); // Verifica el valor del ID

    this.empleado = new Empleado();
    this.empleadoServicio.obtenerEmpleadoPorId(this.id).subscribe(dato => {
      this.empleado = dato;
      Swal.fire(`Detalles del empleado ${this.empleado.nombre}`);
    });


  }

}
