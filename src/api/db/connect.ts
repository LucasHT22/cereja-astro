import { Pool } from 'pg';
import type { APIRoute } from 'astro';

let pools: { [key: string]: Pool } = {};

export function getPool(db_url: string): Pool {
    if (!pools[db_url]) {
        pools[db_url] = new Pool({ connectionString: db_url });
    }
    return pools[db_url];
}