import pkg from 'pg';
const { Client } = pkg;

export interface DbCreds {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

