import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { GestionComponent } from './gestion/gestion.component';

const routes: Routes = [{
    path: '',
    component: EstudianteComponent,
    children: [{
        path: 'gestion',
        component: GestionComponent,
    },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class EstudianteRoutingModule { }

export const routedComponents = [
    EstudianteComponent,
    GestionComponent,
];
