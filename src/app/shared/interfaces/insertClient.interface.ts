import { Client } from "./client.interface";

export type ClientPayload = Omit<Client, 'id'>
