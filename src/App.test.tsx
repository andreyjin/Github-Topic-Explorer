import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_TOPICS } from "./queries";
import App from "./App";

it("should render dog", async () => {
  const topicMock = {
    request: {
      query: GET_TOPICS,
      variables: { name: "react" },
    },
    result: {
      data: {
        topic: {
          name: "react",
          relatedTopics: [
            {
              __typename: "Topic",
              name: "angular",
              stargazerCount: 45734,
            },
            {
              __typename: "Topic",
              name: "nextjs",
              stargazerCount: 738,
            },
            {
              __typename: "Topic",
              name: "react-native",
              stargazerCount: 26160,
            },
            {
              __typename: "Topic",
              name: "vue",
              stargazerCount: 50726,
            },
            {
              __typename: "Topic",
              name: "python",
              stargazerCount: 232134,
            },
            {
              __typename: "Topic",
              name: "machine-learning",
              stargazerCount: 58880,
            },
            {
              __typename: "Topic",
              name: "cnn",
              stargazerCount: 92,
            },
            {
              __typename: "Topic",
              name: "web",
              stargazerCount: 1548,
            },
          ],
          stargazerCount: 77794,
          __typename: "Topic",
        },
      },
    },
  };
  render(
    <MockedProvider mocks={[topicMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText("react")).toBeInTheDocument();
  expect(await screen.findByText("77794")).toBeInTheDocument();
});
