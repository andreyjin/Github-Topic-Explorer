import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_TOPICS } from "../queries";
import { Loading } from "./Loading";

export interface TopicProps {
  name: string;
  stargazerCount: number;
  relatedTopics?: TopicProps[];
}

export const Topic = ({
  topic,
  extended = false,
}: {
  topic: TopicProps;
  extended: boolean;
}) => {
  const [getRelatedTopics, { loading, error, data }] = useLazyQuery(
    GET_TOPICS,
    {
      variables: { name: "react" },
    }
  );

  const [relatedTopics, setRelatedTopic] = useState<TopicProps[]>(
    topic?.relatedTopics ?? []
  );

  const [isExtended, setIsExtended] = useState<boolean>(extended);

  useEffect(() => {
    if (isExtended && relatedTopics.length === 0) {
      getRelatedTopics({ variables: { name: topic.name } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExtended, topic.name, getRelatedTopics]);

  useEffect(() => {
    data && setRelatedTopic(data.topic?.relatedTopics);
  }, [data]);

  const updateExtended = useCallback(() => setIsExtended((prev) => !prev), []);

  return (
    <>
      <div
        className={`flex items-center py-1 cursor-pointer ${
          isExtended ? "border-b" : ""
        }`}
        onClick={updateExtended}
      >
        <div>{isExtended ? "-" : "+"}</div>
        <div className="flex flex-1 items-center justify-between">
          <div className={`text-2xl mx-2 ${isExtended ? "text-blue-600" : ""}`}>
            {topic?.name}
          </div>
          <div>{topic?.stargazerCount}</div>
        </div>
      </div>
      {isExtended &&
        (loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-color-red">
            Data Fetching was failed
          </div>
        ) : (
          <div className="pl-5">
            {relatedTopics?.map((t: TopicProps) => (
              <Topic topic={t} key={t.name} extended={false} />
            ))}
          </div>
        ))}
    </>
  );
};
