import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  
// const artistURl = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${USERNAME}&api_key=${API_KEY}&limit=5&format=json`;
// const trackUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${USERNAME}&api_key=${API_KEY}&limit=5&format=json`;
// const currentTrackURL =`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

  const method = context.params.lastfm; //name of the dynamic route
  console.dir(context.locals.runtime.env);
  const API_KEY = context.locals.runtime.env.LASTFM_API_KEY;
  let apiMethod = "";
  let extraParams = "";
  switch(method){
    case "toptracks":
      apiMethod = "getweeklytrackchart"
      extraParams = "&limit=5"
      break;
    case "topartists":
      apiMethod = "getweeklyartistchart"
      extraParams = "&limit=5"
      break;
    case "recenttrack":
      apiMethod = "getrecenttracks"
      extraParams = "&limit=1"
      break;
    default:
  }
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.${apiMethod}&user=noel_30_tom&api_key=${API_KEY}&format=json${extraParams}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


