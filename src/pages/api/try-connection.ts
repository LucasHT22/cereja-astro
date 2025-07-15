import type { APIRoute } from 'astro';
import pkg from 'pg';
const { Client } = pkg;

export const POST: APIRoute = async ({ request }) => {
    const form = await request.formData();
  const host = form.get('host')?.toString() ?? '';
  const user = form.get('user')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';
  const database = form.get('database')?.toString() ?? '';
  const port = parseInt(form.get('port')?.toString() ?? '5432');

  const client = new Client({
    host,
    user,
    password,
    database,
    port,
  });

  try {
    await client.connect();
    await client.query('SELECT NOW()');
    await client.end();

    const cookieValue = encodeURIComponent(JSON.stringify({ host, user, password, database, port }));
    const headers = new Headers();
    headers.append('Set-Cookie', `dbcreds=${cookieValue}; Path=/; Max-Age=3600; HttpOnly`);

    return new Response(null, {
        status: 302,
        headers: {
          ...headers,
          Location: '/conect?ok=1',
        }
      });
    } catch (err: any) {
      const error = encodeURIComponent(err.message ?? 'Erro desconhecido');
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/conect?error=${error}`,
        }
      });
    }
};