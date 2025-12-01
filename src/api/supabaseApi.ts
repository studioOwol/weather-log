import { supabase } from "./supabase"
import type { WeatherCardType, ServerFilterParams } from "../types"
import { RULES } from "@/constants/rules"
import { getUserId } from "@/stores/useAuthStore"

// Table name (DB table is weather_card)
const TABLE_NAME = "weather_card"

// Convert WeatherCardType to DB format
const toDbFormat = (card: WeatherCardType) => ({
  id: card.id,
  date: card.date,
  lat: card.location.lat,
  lon: card.location.lon,
  country: card.country,
  city: card.city,
  state: card.state,
  memo: card.memo,
  min_temp: card.minTemp,
  max_temp: card.maxTemp,
  is_bookmarked: card.isBookmarked,
  created_at: new Date(card.createdAt).toISOString(),
  language: card.language,
})

// Convert DB format to WeatherCardType
const fromDbFormat = (dbCard: any): WeatherCardType => ({
  id: dbCard.id,
  date: dbCard.date,
  location: { lat: dbCard.lat, lon: dbCard.lon },
  country: dbCard.country,
  city: dbCard.city,
  state: dbCard.state,
  memo: dbCard.memo,
  minTemp: dbCard.min_temp,
  maxTemp: dbCard.max_temp,
  isBookmarked: dbCard.is_bookmarked,
  createdAt: new Date(dbCard.created_at).getTime(),
  language: dbCard.language || null,
})

// Get cards with pagination (Infinite Scroll)
export const getFilteredCardsPaginated = async (
  filters: ServerFilterParams = {},
  offset: number = 0,
  bookmarksOnly: boolean = false
): Promise<WeatherCardType[]> => {
  const userId = getUserId()

  const { data, error } = await supabase.rpc("filter_weather_cards_paginated", {
    p_user_id: userId,
    p_year: filters.year || null,
    p_month: filters.month || null,
    p_day: filters.day || null,
    p_memo_search: filters.memoSearch || null,
    p_location_search: filters.locationSearch || null,
    p_sort_by: filters.sortBy || "date-desc",
    p_bookmarks_only: bookmarksOnly,
    p_offset: offset,
    p_limit: RULES.PAGE_SIZE,
  })

  if (error) throw error
  return data?.map(fromDbFormat) || []
}

// Get cards statistics (all counts in one query)
export const getCardsStats = async (
  filters: ServerFilterParams = {}
): Promise<{
  totalCards: number
  totalBookmarks: number
  filteredCards: number
  filteredBookmarks: number
}> => {
  const userId = getUserId()

  const { data, error } = await supabase.rpc("get_cards_stats", {
    p_user_id: userId,
    p_year: filters.year || null,
    p_month: filters.month || null,
    p_day: filters.day || null,
    p_memo_search: filters.memoSearch || null,
    p_location_search: filters.locationSearch || null,
  })

  if (error) throw error

  const result = data?.[0] || {}
  return {
    totalCards: result.total_cards || 0,
    totalBookmarks: result.total_bookmarks || 0,
    filteredCards: result.filtered_cards || 0,
    filteredBookmarks: result.filtered_bookmarks || 0,
  }
}

// Add new card
export const addCard = async (card: WeatherCardType): Promise<WeatherCardType> => {
  const userId = getUserId()

  const dbCard = {
    ...toDbFormat(card),
    user_id: userId,
  }

  const { data, error } = await supabase.from(TABLE_NAME).insert(dbCard).select().single()

  if (error) throw error
  return fromDbFormat(data)
}

// Update existing card
export const updateCard = async (
  id: string,
  updatedCard: WeatherCardType
): Promise<WeatherCardType> => {
  const userId = getUserId()

  const dbCard = toDbFormat(updatedCard)

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(dbCard)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error
  return fromDbFormat(data)
}

// Delete card
export const deleteCard = async (id: string): Promise<void> => {
  const userId = getUserId()

  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id).eq("user_id", userId)

  if (error) throw error
}

// Toggle bookmark status
export const toggleBookmark = async (id: string, isBookmarked: boolean): Promise<WeatherCardType> => {
  const userId = getUserId()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ is_bookmarked: isBookmarked })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error
  return fromDbFormat(data)
}
