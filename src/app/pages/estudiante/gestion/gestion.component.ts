import { Component } from '@angular/core';
import { EstudianteService } from '../../../@core/data/estudiante.service';

@Component({
  selector: 'ngx-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class GestionComponent {
  data: any;
  column: any;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Documento: {
        title: 'Documento',
        type: 'string',
      },
      Correo: {
        title: 'Correo',
        type: 'string',
      },
      Nombres: {
        title: 'Nombres',
        type: 'string',
      },
      Apellidos: {
        title: 'Apellidos',
        type: 'string',
      },
      Direccion: {
        title: 'Dirección',
        type: 'string',
      },
      Telefono: {
        title: 'Teléfono',
        type: 'string',
      },
      Barrio: {
        title: 'Barrio',
        type: 'string',
      },
    },
  };

  constructor(private estudianteService: EstudianteService) {
    this.data = [];
    this.estudianteService.get()
      .subscribe(res => {
        this.data = res;
      });
  }

  onCreateConfirm(event): void {
      if (window.confirm('Seguro que desea crear a ' + event.newData.Nombres)) {
        event.newData.Activo = 1;
        console.log(event.newData);
        this.estudianteService.post(event.newData)
          .subscribe(res => {
            console.log(res);
            event.confirm.resolve();
          });
      } else {
        event.confirm.reject();
      }
    }

  onEditConfirm(event): void {
    if (window.confirm('Seguro que desea editar el activo Modelo: ' +
      event.data.Nombres)) {
      this.estudianteService.put(event.newData)
        .subscribe(res => {
          event.confirm.resolve();
        });
    } else {
      event.confirm.reject();
    }
  }
}


