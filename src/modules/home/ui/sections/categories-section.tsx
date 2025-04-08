"use client";

import { FilterCarousel } from "#/components/filter-carousel";
import { useTRPC } from "#/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CategoriesSectionSkeleton from "../skeletons/categories-section.skeleton";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error loading categories</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const finalData = data.categories.map(({ id, name }) => ({
    value: id,
    label: name
  }));
  // TODO: pre-fetch this data in the server component
  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) url.searchParams.set("categoryId", value);
    else url.searchParams.delete("categoryId");

    router.push(url.toString());
  };

  return (
    <FilterCarousel onSelect={onSelect} value={categoryId} data={finalData} />
  );
};
