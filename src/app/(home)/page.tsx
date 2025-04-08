import { HydrateClient, prefetchQuery, trpc } from "#/trpc/server";
import { Suspense } from "react";
import { PageClient } from "./client";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  void prefetchQuery(
    trpc.hello.queryOptions({
      text: "world"
    })
  );
  // void prefetchQuery({
  //   type: "infinite",
  //   ...trpc.hello.queryOptions({
  //     text: "world"
  //   })
  // });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<p>Loading...</p>}>
          <PageClient />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
