import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const GET: APIRoute = async () => {
    
    const db = env.keep_database;
    const { results } = await db.prepare("Select * from keep order by created_at desc").all();
    return Response.json(results, { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
    const db = env.keep_database;
    const { name, message } = await request.json();

    if (!name || !message) {
        return new Response("Missing name or message", { status: 400 });
    }

    await db
        .prepare("INSERT INTO keep (name, message) VALUES (?1, ?2)")
        .bind(name, message)
        .run();

    return new Response(null, { status: 204 });
};