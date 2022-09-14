import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { Loading } from "../components/Loading";
import { Topic } from "../components/Topic";
import { GET_TOPICS } from "../queries";

export const Home = () => {
  const [search, setSearch] = useState<string>("react");
  const [debouncedSearch] = useDebounce(search, 500);
  const { loading, error, data } = useQuery(GET_TOPICS, {
    variables: { name: debouncedSearch },
  });

  const updateSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  return (
    <div>
      <div className="flex">
        <input
          className="m-8 w-full border px-2 py-1"
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
          {!!data?.topic && <Topic topic={data.topic} extended />}
        </div>
      )}
    </div>
  );
};
