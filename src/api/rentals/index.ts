import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const GET: APIRoute = async ({ cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    if (!db_url) return new Response('Missing DB URL', { status: 400 });

    const pool = getPool(db_url);
    const { rows } = await pool.query(
        'SELECT rentals.*, books.title FROM rentals JOIN books ON books.id = rentals.book_id'
    );
    return new Response(JSON.stringify(rows), { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    const session = cookies.get('session')?.value;
    if (!db_url || !session) return new Response('Missing Session / DB URL', { status: 400 });

    const { book_id } = await request.json();
    const { id: user_id } = JSON.parse(session);
    const pool = getPool(db_url);

    await pool.query(
		'INSERT INTO rentals (user_id, book_id, rented_at) VALUES ($1, $2, NOW())',
		[user_id, book_id]
	);
	return new Response('Book rented');
};