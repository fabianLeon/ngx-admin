import { Component } from '@angular/core';
import { EstudianteService } from '../../../@core/data/estudiante.service';
import { LocalDataSource } from 'ng2-smart-table';

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
  roles: any;
  selected: any;
  rolSelected: any;
  data: any;
  column: any;
  settings = {
    selectMode: 'multi',
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
  source: LocalDataSource = new LocalDataSource();

  constructor(private estudianteService: EstudianteService) {
    this.data = [];
    this.rolSelected = { Id: 0, Nombre: 'Seleccione' };
    this.estudianteService.get('persona', '')
      .subscribe(res => {
        this.data = res;
        this.source.load(this.data);
      });

    this.estudianteService.get('roll', '')
      .subscribe(res => {
        this.roles = res;
        // console.log(this.roles);
        this.roles.unshift(this.rolSelected);
      });
  }

  addRol() {
    this.selected.forEach(element => {
      const data = {
        Persona: element,
        Roll: this.rolSelected,
      }
      this.estudianteService.post('persona_roll', data)
        .subscribe(res => {
          this.getRolesById();
        });
    });
  }

  removeRol() {
    this.selected.forEach(element => {
      element.roles.forEach(rol => {
        // console.log(rol)
        if (rol.Roll.Id === this.rolSelected.Id) {
          this.estudianteService.delete('persona_roll', rol)
            .subscribe(res => {
              this.getRolesById();
            });
        }
      });
    });
  }

  onCreateConfirm(event): void {
    if (window.confirm('Seguro que desea crear a ' + event.newData.Nombres)) {
      event.newData.Activo = 1;
      this.estudianteService.post('persona', event.newData)
        .subscribe(res => {
          // console.log(res)
          event.confirm.resolve();
        });
    } else {
      event.confirm.reject();
    }
  }

  onSelected(event): void {
    this.selected = event.selected;
    this.getRolesById();
  }

  getRolesById() {
    this.selected.forEach(element => {
      const query = 'query=Persona.Id:' + element.Id;
      this.estudianteService.get('persona_roll', new URLSearchParams(query))
        .subscribe(res => {
          element.roles = res;
        });
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Seguro que desea eliminar a : ' +
      event.data.Nombres)) {
      this.estudianteService.delete('persona', event.data)
        .subscribe(res => {
          event.confirm.resolve();
        });
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Seguro que desea editar a : ' +
      event.data.Nombres)) {
      this.estudianteService.put('persona', event.newData)
        .subscribe(res => {
          event.confirm.resolve();
        });
    } else {
      event.confirm.reject();
    }
  }
}


