/**
 * Arquivo (Interface): Client.Interface
 * Objetivo: Exportar para a aplicação o tipo de dados do cliente... aqui deve ter a mesma estrutura da API.
 */
/*
export interface Client{
    id: string;
    codcliente: number;
    tipocliente_id: string;
    statuscliente_id: string;
    nomecliente: string;
    created: string;
    modified: string;
}
    */
   export interface Client{

      id: string,
      codcliente: string,
      nomecliente: string,
      tipocliente_id: string,
      statuscliente_id: string,
      created: string,
      modified: string,
      flag_erro: string,
      mensagem_retorno: string

   }

/*
export interface ClientArray{

  idkey : string,
  ClientDetails: {
    id: string,
    codcliente: string,
    nomecliente: string,
    tipocliente_id: string,
    statuscliente_id: string,
    created: string,
    modified: string,
    flag_erro: string,
    mensagem_retorno: string
  }

}
*/
