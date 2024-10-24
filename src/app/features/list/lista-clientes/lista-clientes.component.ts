import { Component, EventEmitter, Inject, inject, Output, signal } from '@angular/core';
import { ClientsService } from '../../../shared/services/clients.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CardComponent } from '../component/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Client } from '../../../shared/interfaces/client.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CardComponent, RouterLink, MatDialogModule, ConfirmationDialogComponent],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})

export class ListaClientesComponent {

  ClienteGetAll = inject(ClientsService);
  router = inject(Router);
  matDialog = Inject(MatDialog);
  listClientUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyErp3/MyERPApi/list-clientes.json';
  //clients: Client[] = [];
  clients = signal<Client[]>(inject(ActivatedRoute).snapshot.data['client']);
  displayedColumns: string[] = ['codcliente', 'tipocliente_id', 'statuscliente_id', 'nomecliente', 'created', 'modified', 'actions'];

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();
  readonly dialog = inject(MatDialog);
    matSnackBar: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /*this.ClienteGetAll.getAllClients().subscribe( (clients) => {
      this.clients = clients
    });*/
  }

  OnEdit(Client: Client){
    //debugger
    //this.edit.emit();
    //this.router.navigateByUrl('/edit-client'); //Aqui não está indo para a página
    this.router.navigate(['/edit-client', Client.id ]);
  }

  /**
   * Função: OnEdit_2
   * Objetivo: Apenas para testar um novo componente editar (para reutilizar o mesmo componente)
   * @param Client
   */
  OnEdit_2(Client: Client){
    this.router.navigate(['/edit-client', Client.id ]);
  }

  /**
   * Função: OnDelete
   * Objetivo: Remover um cliente da base de dados.
   */
  OnDelete(Client: Client) {
    //debugger
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza mesmo?',
      });

      //O filter dentro do pipe GARANTE que a lógica da chamado a API só vai aconter se o usuário marcar sim.
      dialogRef.afterClosed().pipe(filter((resul) => resul === true)).subscribe(() => {

            this.ClienteGetAll.removeClient({
                id: Client.id,
                codcliente: '',
                nomecliente: '',
                tipocliente_id: '',
                statuscliente_id: '',
                created: '',
                modified: '',
                flag_erro: '',
                mensagem_retorno: ''}).subscribe(
                () => {
                    this.ClienteGetAll.getAllClients().subscribe( (clients) => {
                        //this.clients = clients
                        this.clients.set(clients);
                      });
                }

            );

      });
    }
}
