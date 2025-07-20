import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const PUT: APIRoute = async ({ request, params, cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    if (!db_url) return new Response('Missing DB URL', { status: 400 });

    const { title, author, year } = await request.json();
    const pool = getPool(db_url);
    await pool.query(
        'UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4', [title, author, year, params.id]
    );
    return new Response('Book updated');
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
    const db_url = cookies.get('db_url')?.value;
	if (!db_url) return new Response('Missing DB URL', { status: 400 });

	const pool = getPool(db_url);
    await pool.query('DELETE FROM books WHERE if = $1', [params.id]);
};