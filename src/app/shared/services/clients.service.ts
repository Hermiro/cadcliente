import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { ClientPayload } from '../interfaces/insertClient.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }

  httpCliente = inject(HttpClient);
  httpClient = inject(HttpClient);
  listClientUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/list-clientes.json';
  addClientUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/insrtlClient.json';
  editClientUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/editClient.json';
  clientByIdUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/getClient/';
  removeclientByIdUrl = 'http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/deleClient/';
  removeClientUrl = '';
  //addClientUrl = 'insrtlClient.json';
  clients: any[] = [];


  /**
   * Função: getAllClients
   * Objetivo: Recuperar a lista de clientes da API
   */
  getAllClients(){
    //console.log(this.httpClient.get<Client[]>(this.listClientUrl));
    return this.httpClient.get<Client[]>(this.listClientUrl);
  }

  /**
   * Função: postClient
   * Objetivo: Inserir um novo cliente utilizando a API.
   * URL: http://localhost:3000/Desenvolvimento/Projetos/MyErp3/MyERPApi/insrtlClient.json
   */
  postClient(payload: ClientPayload){
    //console.log(payload);
    return this.httpClient.post(this.addClientUrl, payload);
    //return this.httpClient.post('http://localhost:3000/Desenvolvimento/Projetos/MyErp3/MyERPApi/insrtlClient.json', payload);
  }

  /**
   * Função: editClient
   * Objetivo: Alterar um cliente que já exista no servidor
   * URL:
   * Observação:
   */
  editClient(payload: Client){
    //console.log(payload);
    return this.httpClient.put(this.editClientUrl, payload);
  }

  /**
   * Função: RemoveClient
   * Objetivo: Remover um cliente que já existe no servidor.
   * URL:
   */
  removeClient(payload: Client){
    console.log(payload.id);
    return this.httpClient.delete(this.removeclientByIdUrl+payload.id);
  }

  /**
   * Função: GetClientById
   * Objetivo: Faz uma chamada no servidor para recuperar um cliente pelo ID
   * Observação:
   */
  GetClienteByID(id: string) {

    //return this.httpClient.get<Client>('http://localhost:3000/Desenvolvimento/Projetos/MyERP3.2/Api/getClient.json${id}');
    return this.httpClient.get<Client>(this.clientByIdUrl+id);
  }
}
