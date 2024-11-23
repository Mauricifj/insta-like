let { API_POSTS_ENDPOINT } = process.env;

export default async function fetchImages() {
  try {
    const response = await fetch(process.env.API_POSTS_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
