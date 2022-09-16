import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loading } from "../components/Loading";
import { Topic } from "../components/Topic";
import { GET_TOPICS } from "../queries";
import { useDebounce } from "../hooks/useDeounce";
import { TopicProps } from "../types";

export const Home = () => {
  const [search, setSearch] = useState<string>("react");
  const debouncedSearch = useDebounce(search, 500);
  const { loading, error, data } = useQuery(GET_TOPICS, {
    variables: { name: debouncedSearch },
  });
  const [topic, setTopic] = useState<TopicProps>();

  const updateSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  useEffect(() => {
    data && setTopic(data.topic);
  }, [data]);

  useEffect(() => {
    if (topic?.relatedTopics?.length && !topic.relatedTopics[0].parent) {
      setTopic({
        ...topic,
        relatedTopics: topic.relatedTopics?.map((t: TopicProps) => ({
          ...t,
          parent: topic,
        })),
      });
    }
  }, [topic]);

  return (
    <div className="px-8">
      <div className="flex">
        <input
          className="m-8 w-full border px-8 py-1"
          value={search}
          onChange={updateSearch}
        />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-color-red">
          Data Fetching was failed
        </div>
      ) : (
        <div className="p-4">
          {topic && topic.relatedTopics && topic.relatedTopics[0].parent && (
            <Topic topic={topic} extended />
          )}
        </div>
      )}
    </div>
  );
};
