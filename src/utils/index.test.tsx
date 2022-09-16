import { checkExistInTree } from ".";
import { TopicProps } from "../types";

const SAMPLE_TRUE_CASE: TopicProps = {
  name: "react",
  relatedTopics: [
    {
      name: "angular",
      relatedTopics: [],
      stargazerCount: 100,
    },
  ],
  stargazerCount: 1250,
};

describe("checkExistInTree", () => {
  it("should return true if tree has same term", () => {
    expect(checkExistInTree("react", SAMPLE_TRUE_CASE)).toEqual(true);
  });

  it("should return false if tree has no same term", () => {
    expect(checkExistInTree("vue", SAMPLE_TRUE_CASE)).toEqual(false);
  });
});
