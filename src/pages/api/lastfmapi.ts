import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    console.dir(context.locals.runtime.env)
    const API_KEY = context.locals.runtime.env.LASTFM_API_KEY; 
    if (!API_KEY) {
        console.error("No api visibility");
        return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=noel_30_tom&api_key=${API_KEY}&format=json&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
