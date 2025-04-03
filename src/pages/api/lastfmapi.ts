export async function GET(){
    const API_URL = "https://ws.audioscrobbler.com/2.0/";
    const API_KEY = import.meta.env.LASTFM_API_KEY;    
    const url = `${API_URL}?method=user.getrecenttracks&user=noel_30_tom&api_key=${API_KEY}&format=json&limit=1`;
    try{
        const response = await fetch(url,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "User-Agent":"personalwebsite/1.0"
            }
        }
        );
        if(!response.ok)
            throw new Error(`Failed to fetch: ${response.statusText}`);            
        return response;
    }
    catch(error){
        return new Response(JSON.stringify({error: error.message}), {
            status: 500,
            headers: {"Content-Type":"application/json"},
        });
    }
}