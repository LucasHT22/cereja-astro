import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const POST: APIRoute = async ({ request, cookies }) => {
    const { email, password, name, db_url } = await request.json();
    if (!db_url) return new Response('Missing DB URL', { status: 400 });
    const pool = getPool(db_url);
    await pool.query('INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)', [email, password, name, 'client']);
    return new Response('User registered', { status: 201 });
}