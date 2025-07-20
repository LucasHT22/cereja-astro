import type { APIRoute } from "astro";
import { getPool } from "../db/connect";

export const POST: APIRoute = async ({ request, cookies }) => {
    const { email, password, db_url } = await request.json();
    if (!db_url) return new Response('Missing DB URL', { status: 400 });
    const pool = getPool(db_url);
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user || password !== user.password) {
		return new Response('Invalid credentials', { status: 401 });
	}

	cookies.set('session', JSON.stringify({ id: user.id, role: user.role }), { path: '/' });
	cookies.set('db_url', db_url, { path: '/' });

	return new Response('Logged in', { status: 200 });
};