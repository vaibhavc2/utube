"use client";

import { useTRPC } from "#/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PageClient = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <div>
      <p>Page Client says: {data.greeting}</p>
    </div>
  );
};
