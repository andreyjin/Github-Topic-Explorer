export interface TopicProps {
  name: string;
  stargazerCount: number;
  relatedTopics?: TopicProps[];
  parent?: TopicProps;
}
