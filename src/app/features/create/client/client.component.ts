import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientsService } from '../../../shared/services/clients.service';
import { ClientPayload } from '../../../shared/interfaces/insertClient.interface';
import { Client } from '../../../shared/interfaces/client.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  //Injectable
  clientService = inject(ClientsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  //Parâmetros
  number_client : number = 0 ;
  DadosClientPayload: ClientPayload[] = [];
  TipoClient = '';
  NomeClient = '';
  StatusClient = '';
  CodClient = '';
  meuFormulario: FormGroup;

constructor(private formBuilder: FormBuilder) {
  this.meuFormulario = this.formBuilder.group({
    nomecliente: ['', Validators.required],
    codcliente: ['', Validators.required],
    tipocliente_id: ['', Validators.required],
    statuscliente_id: ['', Validators.required],
  });


}
/**
 * Função: OnSubmit
 * Objetivo: Receber os eventos do formularios da página de create Cliente
 */
  OnSubmit(){

    this.CodClient = this.meuFormulario.controls['codcliente'].value;
    this.NomeClient = this.meuFormulario.controls['nomecliente'].value;
    this.TipoClient = this.meuFormulario.controls['tipocliente_id'].value;
    this.StatusClient = this.meuFormulario.controls['statuscliente_id'].value;

       this.clientService.postClient({
        codcliente : this.CodClient,
        nomecliente: this.NomeClient,
        tipocliente_id: this.TipoClient,
        statuscliente_id: this.StatusClient,
        created: '',
        modified: '',
        flag_erro: '',
        mensagem_retorno: ''
       }).subscribe( () => {
        this.matSnackBar.open('Cliente inserido com sucesso', 'OK');

        this.router.navigateByUrl('/').catch(console.log);
       });
  }
}
