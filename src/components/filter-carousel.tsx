"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "#/components/ui/carousel";
import { cn } from "#/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import FilterCarouselSkeleton from "#/modules/home/ui/skeletons/filter-carousel.skeleton";

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect?: (value: string | null) => void;
  data?: {
    value: string;
    label: string;
  }[];
}

export const FilterCarousel = ({
  value,
  isLoading,
  onSelect,
  data
}: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentVal, setCurrentVal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentVal(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentVal(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {/* Left fade */}
      <div
        className={cn(
          "from-background pointer-events-none absolute top-0 bottom-0 left-12 z-10 w-12 bg-gradient-to-r to-transparent",
          currentVal === 1 && "hidden"
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true
        }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-3">
          {isLoading && <FilterCarouselSkeleton />}
          {!isLoading && (
            <CarouselItem
              className="basis-auto pl-3"
              onClick={() => onSelect?.(null)}
            >
              <Badge
                variant={!value ? "default" : "secondary"}
                className="cursor-pointer rounded-lg px-3 py-1 text-sm whitespace-nowrap"
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {!isLoading &&
            data?.map((item) => (
              <CarouselItem
                key={item.value}
                className="basis-auto pl-3"
                onClick={() => onSelect?.(item.value)}
              >
                <Badge
                  variant={value === item.value ? "default" : "secondary"}
                  className="cursor-pointer rounded-lg px-3 py-1 text-sm whitespace-nowrap"
                  onClick={() => onSelect?.(item.value)}
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20 cursor-pointer" />
        <CarouselNext className="right-0 z-20 cursor-pointer" />
      </Carousel>
      {/* Right fade */}
      <div
        className={cn(
          "from-background pointer-events-none absolute top-0 right-12 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent",
          currentVal === count && "hidden"
        )}
      />
    </div>
  );
};
