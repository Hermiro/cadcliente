import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Routes,
} from "@angular/router";
import { ListaClientesComponent } from "./features/list/lista-clientes/lista-clientes.component";
import { ClientComponent } from "./features/create/client/client.component";
import { Inject, inject } from "@angular/core";
import { ClientsService } from "./shared/services/clients.service";
/**
 * O array abaixo, configura as rotas da aplicação
 */
export const routes: Routes = [
    {
        path: "",
        //Aqui o resolver já chama a API de recuperar todos os clientes.
        resolve: {
            client: () => {
                const clientService = inject(ClientsService);
                return clientService.getAllClients();
            },
        },
        component: ListaClientesComponent,
    },
    {
        path: "create_client",
        loadComponent: () =>
            import("./features/create/client/client.component").then(
                (m) => m.ClientComponent
            ), //laze load
    },
    {
        path: "edit-client/:id",
        resolve: {
            client: (
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
            ) => {
                //Injeta o serviço de cliente e chama a API de recuperar o cliente pelo ID
                const clientService = inject(ClientsService);
                return clientService.GetClienteByID(
                    route.paramMap.get("id") as string
                );
            },
        },
        loadComponent: () =>
            import("./features/edit/edit.component").then(
                (m) => m.EditComponent
            ),
    },
];
