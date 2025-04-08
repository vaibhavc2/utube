import { CarouselItem } from "#/components/ui/carousel";
import { Skeleton } from "#/components/ui/skeleton";

const FilterCarouselSkeleton = () => {
  return Array.from({ length: 14 }).map((_, index) => (
    <CarouselItem key={index} className="basis-auto pl-3">
      <Skeleton className="h-full w-[100px] rounded-lg px-3 py-1 text-sm font-semibold">
        &nbsp;
      </Skeleton>
    </CarouselItem>
  ));
};
export default FilterCarouselSkeleton;
