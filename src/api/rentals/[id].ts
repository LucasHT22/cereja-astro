import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const PUT: APIRoute = async ({ request, params, cookies }) => {
    const db_url = cookies.get('db_url')?.value;
    if (!db_url) return new Response('Missing DB URL', { status: 400 });

    const pool = getPool(db_url);
    await pool.query('UPDATE rentals SET returned_at = NOW() WHERE id = $1', [params.id]);
	return new Response('Rental finalized');
};