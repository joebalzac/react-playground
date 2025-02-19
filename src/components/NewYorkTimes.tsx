import axios from "axios";
import React, { useEffect, useState } from "react";

interface Times {
  id: string;
  title: string;
  abstract: string;
  type: string;
  url: string;
  uri: string;
  published_date: string;
  multimedia: [{ url: string }];
}

const NewYorkTimes = () => {
  const [stories, setStories] = useState<Times[]>([]);
  const [selectedStory, setSelectedStory] = useState<Times | null>(null);
  const [selectedStoriesIds, setSelectedStoriesIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewYorkTimes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.nytimes.com/svc/topstories/v2/home.json?",
          {
            params: {
              "api-key": "eo8G7acBqLqBHRGkrrV3GKq47GhYtMIH",
            },
          }
        );
        const data = response.data;
        const storiesWithIds = data.results.map((result: Times) => ({
          ...result,
          id: result.uri,
          multimedia: result.multimedia ?? [],
        }));
        setStories(storiesWithIds);
        console.log("big data homie", storiesWithIds);
      } catch (error) {
        if (error) {
          setError("An unknown problem has occured");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewYorkTimes();
  }, []);

  const handleSelectedStory = (story: Times) => {
    setSelectedStory(story);
  };

  const handleDeleteStory = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedStoriesIds(
      e.target.checked
        ? [...selectedStoriesIds, id]
        : selectedStoriesIds.filter((storyId) => storyId !== id)
    );
  };

  return (
    <div className="p-6 font-serif text-gray-900">
      <h1 className="text-4xl font-bold mb-6 border-b pb-4">
        The New York Times
      </h1>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <input type="text" placeholder="search article" />
          <ul className="grid grid-cols-1 gap-6">
            {stories.map((story, index) => (
              <li
                className="flex justify-between items-end border-b pb-4 cursor-pointer hover:bg-gray-100 p-4 rounded-m"
                key={index}
                onClick={() => handleSelectedStory(story)}
              >
                <div>
                  <input
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleInputChange(e, story.id)}
                  />
                  <img src={story.multimedia[0]?.url} alt="" />
                  <h2 className="text-2xl font-bold leading-tight">
                    {story.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {story.published_date}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDeleteStory(e, story.id)}
                  className="bg-transparent text-red-400 w-full cursor-default hover:bg-red-300"
                >
                  Delete Article
                </button>
              </li>
            ))}
          </ul>
          {selectedStory ? (
            <div>
              <h2 className="text-3xl font-bold">{selectedStory.title} </h2>
              <p className="text-gray-700 mt-4">{selectedStory.abstract}</p>
              <a
                href={selectedStory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-4 inline-block hover:underline"
              >
                Read full article →
              </a>
            </div>
          ) : (
            <div>{null}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewYorkTimes;
