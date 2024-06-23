import axios from "axios";

// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json";

export const getNews = async () => {
  try {
    const response = await axios.get(NEWS_API_ENDPOINT);
    return response.data.articles.slice(0, 15);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
