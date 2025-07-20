import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const GET: APIRoute = async ({ cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    if (!db_url) return new Response('Missing DB URL', { status: 400 });

    const pool = getPool(db_url);
    const { rows } = await pool.query('SELECT * FROM books');
    return new Response(JSON.stringify(rows), { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    if (!db_url) return new Response('Missing DB URL', { status: 400 });

    const { title, author, year } = await request.json();
    const pool = getPool(db_url);
    await pool.query(
        'INSERT INTO books (title, author, year) VALUES ($1, $1, $3)', [title, author, year]
    );
    return new Response('Book added', { status: 201 });
};