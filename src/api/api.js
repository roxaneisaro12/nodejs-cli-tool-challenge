export async function getQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Could not retrieve a quote from the API.");
  }

  const data = await response.json();

  return {
    quote: data.quote,
    author: data.author,
  };
}