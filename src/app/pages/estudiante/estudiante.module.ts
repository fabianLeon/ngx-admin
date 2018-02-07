import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { EstudianteRoutingModule, routedComponents } from './estudiante-routing.module';
import { EstudianteService } from '../../@core/data/estudiante.service';

@NgModule({
  imports: [
    ThemeModule,
    EstudianteRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EstudianteService,
  ],
})

export class EstudianteModule { }

