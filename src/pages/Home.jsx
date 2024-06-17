import React, { useEffect, useState } from "react";
import { getNews } from "../api/external";
import Loader from "../components/Loader"; // Ensure the path is correct

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();
  }, []);

  if (articles.length === 0) {
    return <Loader text={"Homepage"} />;
  }

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="max_padd_container flex flex-col justify-center pt-32">
      <h3>Latest articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-5">
        {articles.map((article) => (
          <div
            key={article.url}
            className="flex flex-col p-4 bg-slate-500/5 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden hover:shadow-lg cursor-default transition-all duration-300"
          >
            <img
              src={article.urlToImage}
              alt="article"
              className="block object-cover w-full rounded-2xl h-44 bg-white"
            />
            <h4 className="text-left mt-4 bold-16 line-clamp-2 text-[#333]">
              {article.title}
            </h4>
            <p className="line-clamp-3 mt-2 text-left">{article.description}</p>
            <button
              className="btn_dark_rounded mt-4 w-[133px]"
              onClick={() => handleClick(article.url)}
            >
              Read more
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
