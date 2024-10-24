import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPayload } from '../../shared/interfaces/insertClient.interface';
import { ClientsService } from '../../shared/services/clients.service';
import { Client } from '../../shared/interfaces/client.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule, FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  //Injectable
  clientService = inject(ClientsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  //cliente_editar : Client = Inject(ActivatedRoute).snapshot;
  cliente_editar;
  cliente;
  activatedRoute = Inject(ActivatedRoute);

  //Parâmetros
  number_client : number = 0 ;
  DadosClientPayload: ClientPayload[] = [];
  TipoClient = '';
  NomeClient = '';
  StatusClient = '';
  CodClient = '';
  olhando = '';

  meuFormulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute
  ) {
    this.cliente = this.route.snapshot;
    this.cliente_editar = this.route.snapshot;
    console.log(this.cliente);
    console.log(this.cliente_editar);
    this.meuFormulario = this.formBuilder.group({
      nomecliente: [this.cliente.data['client'].nomecliente, Validators.required],
      codcliente: [this.cliente.data['client'].codcliente,Validators.required],
      tipocliente_id: [this.cliente.data['client'].tipocliente_id, Validators.required],
      statuscliente_id: [this.cliente.data['client'].statuscliente_id, Validators.required],
      });
  }

/**
 * Função: OnSubmit
 * Objetivo: Receber os eventos do formularios da página de edit Cliente
 */
OnSubmit(){

  this.CodClient = this.meuFormulario.controls['codcliente'].value;
  this.NomeClient = this.meuFormulario.controls['nomecliente'].value;
  this.TipoClient = this.meuFormulario.controls['tipocliente_id'].value;
  this.StatusClient = this.meuFormulario.controls['statuscliente_id'].value;

  this.clientService.editClient(
    {
    id: this.cliente.data['client'].id,
    codcliente: this.CodClient,
    nomecliente: this.NomeClient,
    tipocliente_id: this.TipoClient,
    statuscliente_id: this.StatusClient,
    created: '',
    modified: '',
    flag_erro: '',
    mensagem_retorno: ''
    }
   ).subscribe( () => {
    this.matSnackBar.open('Cliente alterado com sucesso', 'OK');
     this.router.navigateByUrl('/').catch(console.log);
   });
 }

 /**
  * Função: OnSubmit_2
  * Objetivo: Realizar testes com outro componente (reutilizar)
  */
  OnSubmit_2(cliente: Client){

    this.CodClient = cliente.codcliente;
    this.NomeClient = cliente.nomecliente;
    this.TipoClient = cliente.tipocliente_id;
    this.StatusClient = cliente.statuscliente_id;
    console.log(cliente);
    /*
    this.clientService.editClient(
      {
      id: this.cliente.data['client'].id,
      codcliente: this.CodClient,
      nomecliente: this.NomeClient,
      tipocliente_id: this.TipoClient,
      statuscliente_id: this.StatusClient,
      created: '',
      modified: '',
      flag_erro: '',
      mensagem_retorno: ''
      }
     ).subscribe( () => {
      this.matSnackBar.open('Cliente alterado com sucesso', 'OK');
       this.router.navigateByUrl('/').catch(console.log);
     });*/


  }
}
