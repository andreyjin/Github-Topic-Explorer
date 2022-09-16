import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_TOPICS } from "../queries";
import { Loading } from "./Loading";

export interface TopicProps {
  name: string;
  stargazerCount: number;
  relatedTopics?: TopicProps[];
  parent?: TopicProps;
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

  const [internalTopic, setInternalTopic] = useState<TopicProps>(topic);
  const [isExtended, setIsExtended] = useState<boolean>(extended);

  const checkExistInTree = useCallback(
    (name: string, parent?: TopicProps): boolean => {
      if (parent) {
        if (name === parent.name) return true;
        if (parent.relatedTopics?.some((t: TopicProps) => t.name === name)) {
          return true;
        } else {
          return checkExistInTree(name, parent.parent);
        }
      }
      return false;
    },
    []
  );

  useEffect(() => {
    if (isExtended && !internalTopic.relatedTopics) {
      getRelatedTopics({ variables: { name: topic.name } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExtended, topic.name, getRelatedTopics]);

  useEffect(() => {
    if (data) {
      setInternalTopic((prev) => ({
        ...prev,
        relatedTopics: data.topic?.relatedTopics.filter(
          (t: TopicProps) => !topic.parent || !checkExistInTree(t.name, topic)
        ),
      }));
    }
  }, [checkExistInTree, data, topic]);

  const updateExtended = useCallback(() => setIsExtended((prev) => !prev), []);

  return (
    <>
      <div
        className={`flex items-center py-1 cursor-pointer ${
          isExtended ? "border-b" : ""
        }`}
        onClick={updateExtended}
      >
        <div className={isExtended ? "text-blue-500 text-2xl" : "text-grey"}>
          {isExtended ? "★" : "☆"}
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className={`text-2xl mx-2 ${isExtended ? "text-blue-600" : ""}`}>
            {internalTopic?.name}
          </div>
          <div>{internalTopic?.stargazerCount}</div>
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
            {internalTopic.relatedTopics?.map((t: TopicProps) => (
              <Topic
                topic={{ ...t, parent: internalTopic }}
                key={t.name}
                extended={false}
              />
            ))}
          </div>
        ))}
    </>
  );
};
