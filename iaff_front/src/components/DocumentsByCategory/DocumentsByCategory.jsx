import React, { useEffect, useState } from "react";
import Loading from "../../components/Spinner/Loading";

import { getDocumentsByCategory } from "../../utils/Documents/getDocumentsByCategoryAPI";

const DocumentsByCategory = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const getDocumentsData = async () => {
      try {
        const result = await getDocumentsByCategory(category);
        setIsLoading(false);
        setArticles(result);
      } catch (error) {
        console.error(
          "Error with getting documents by category info: " + error
        );
      }
    };

    if (category !== "") {
      getDocumentsData();
    }
  }, [category]);

  return (
    <div className="flex flex-wrap w-full">
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center h-96">
          <Loading height={150} width={150} />
        </div>
      ) : articles ? (
        articles.map((item) => (
          <a
            className="w-1/3 max-xl:w-1/2 max-md:w-full p-8 cursor-pointer animate-fade-in"
            href={`documents/${item.id}`}
            key={item.id}
          >
            <div className="flex flex-col w-full h-full items-center space-y-2 border-2 shadow-md rounded-md border-solid border-accent-900 hover:scale-105 ease-in-out duration-150 p-4">
              <img
                src={item.image}
                alt="document"
                className="w-full h-60 max-md:h-56 object-cover rounded-md ease-in-out duration-150"
              ></img>
              <h1 className="text-primary-900 text-center text-xl max-xl:text-lg max-md:text-base ease-in-out duration-200">
                {item.title}
              </h1>
              <p className="text-center max-md:text-sm max-sm:text-xs ease-in-out duration-200">
                {item.short}
              </p>
            </div>
          </a>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default DocumentsByCategory;
