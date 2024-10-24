import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, MatTableModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  client = input.required<Client>();
  //A variável clientTitle fica monitorando o valor do campo codcliente da estrutura cliente
  clientCodcliente = computed( () => this.client().codcliente);
  clientNomecliente = computed( () => this.client().nomecliente);
  tipoCliente = computed( () => this.client().tipocliente_id );
  statusCliente = computed ( () => this.client().statuscliente_id );
  created = computed ( () => this.client().created );
  modified = computed ( () => this.client().modified);

}


