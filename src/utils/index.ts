import { TopicProps } from "../types";

export const checkExistInTree = (
  name: string,
  parent?: TopicProps
): boolean => {
  if (parent) {
    if (name === parent.name) return true;
    if (parent.relatedTopics?.some((t: TopicProps) => t.name === name)) {
      return true;
    } else {
      return checkExistInTree(name, parent.parent);
    }
  }
  return false;
};
