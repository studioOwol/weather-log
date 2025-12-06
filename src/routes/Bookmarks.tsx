import FilterBar from "@/components/FilterBar"
import CardBoard from "@/components/CardBoard"
import { useInfiniteCards } from "@/hooks/queries/useInfiniteCards"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { LoadingOverlay, LoadingInline } from "@/components/ui/spinner"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function Bookmarks() {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON)
  const {
    cards: bookmarkedCards,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCards("bookmarks")

  // Intersection Observer for infinite scroll
  const { ref } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  })

  return (
    <div>
      <div className="pt-6 pb-6">
        <h1 className="ml-1 text-2xl sm:text-3xl font-bold text-primary">
          {t("page.bookmarkedRecords")}
        </h1>
      </div>

      <FilterBar />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingOverlay />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-destructive">Error loading bookmarks: {error.message}</div>
        </div>
      ) : (
        <CardBoard cards={bookmarkedCards} emptyMessage={t("empty.bookmarks")} />
      )}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {hasNextPage && isFetchingNextPage && <LoadingInline size="md" />}
      </div>
    </div>
  )
}
