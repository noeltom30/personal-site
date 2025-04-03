export async function GET() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  if(!response.ok)  
      throw new Error("This is not working")
  return response;
}
