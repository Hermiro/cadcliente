import { Component, EventEmitter, inject, Inject, input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientPayload } from '../../interfaces/insertClient.interface';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
[x: string]: any;

  //Injectable
  clientService = inject(ClientsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  cliente = input<Client | null>(null);
  activatedRoute = Inject(ActivatedRoute);

  //Output
  @Output() submit = new EventEmitter<Client>();

  //Parâmetros
  number_client : number = 0 ;
  DadosClientPayload: ClientPayload[] = [];
  TipoClient = '';
  NomeClient = '';
  StatusClient = '';
  CodClient = '';
  olhando = '';

  meuFormulario!: FormGroup;// Estou forçando a variável dizendo que ele nunca vai ser nulo.


  ngOnInit(): void{
    this.meuFormulario = new FormGroup({
      nomecliente: new FormControl<string>(this.cliente()?.nomecliente || '', {
        nonNullable : true,
        validators: Validators.required
      })

    })

  }


  onSubmit(){
    const cliente = this.meuFormulario.value as Client;

    this.submit.emit(cliente);
  }

/*constructor(private formBuilder: FormBuilder,
  private route: ActivatedRoute
)
{

  this.meuFormulario = this.formBuilder.group({
    nomecliente: [this.cliente.data['client'].nomecliente, Validators.required],
    codcliente: [this.cliente.data['client'].codcliente,Validators.required],
    tipocliente_id: [this.cliente.data['client'].tipocliente_id, Validators.required],
    statuscliente_id: [this.cliente.data['client'].statuscliente_id, Validators.required],
  });*/



//}

  //Código abaixo foi comentado para praticar o vídeo da aula 23.
  /*
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute
  ) {
    this.cliente = this.route.snapshot;
    this.meuFormulario = this.formBuilder.group({
      nomecliente: [this.cliente.data['client'].nomecliente, Validators.required],
      codcliente: [this.cliente.data['client'].codcliente,Validators.required],
      tipocliente_id: [this.cliente.data['client'].tipocliente_id, Validators.required],
      statuscliente_id: [this.cliente.data['client'].statuscliente_id, Validators.required],
      });
  }*/

}


