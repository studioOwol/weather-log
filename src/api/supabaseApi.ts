import { supabase } from './supabase'
import type { WeatherCardType, ServerFilterParams } from '../types'

// Table name (DB table is weather_card)
const TABLE_NAME = 'weather_card'

// Get current user ID
const getCurrentUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')
  return user.id
}

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
  created_at: new Date(card.createdAt).toISOString()
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
  createdAt: new Date(dbCard.created_at).getTime()
})

// Get all cards for current user
export const getAllCards = async (): Promise<WeatherCardType[]> => {
  const userId = await getCurrentUserId()
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data?.map(fromDbFormat) || []
}

// Get cards with server-side filtering
export const getFilteredCards = async (filters: ServerFilterParams = {}): Promise<WeatherCardType[]> => {
  const userId = await getCurrentUserId()
  
  const { data, error } = await supabase.rpc('filter_weather_cards', {
    p_user_id: userId,
    p_year: filters.year || null,
    p_month: filters.month || null,
    p_day: filters.day || null,
    p_memo_search: filters.memoSearch || null,
    p_location_search: filters.locationSearch || null,
    p_sort_by: filters.sortBy || 'date-desc'
  })

  if (error) throw error
  return data?.map(fromDbFormat) || []
}

// Add new card
export const addCard = async (card: WeatherCardType): Promise<WeatherCardType> => {
  const userId = await getCurrentUserId()
  
  const dbCard = {
    ...toDbFormat(card),
    user_id: userId
  }
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(dbCard)
    .select()
    .single()

  if (error) throw error
  return fromDbFormat(data)
}

// Update existing card
export const updateCard = async (id: string, updatedCard: WeatherCardType): Promise<WeatherCardType> => {
  const userId = await getCurrentUserId()
  
  const dbCard = toDbFormat(updatedCard)
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(dbCard)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return fromDbFormat(data)
}

// Delete card
export const deleteCard = async (id: string): Promise<void> => {
  const userId = await getCurrentUserId()
  
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
}

// Toggle bookmark status
export const toggleBookmark = async (id: string): Promise<WeatherCardType> => {
  const userId = await getCurrentUserId()
  
  // Get current bookmark status
  const { data: currentCard, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('is_bookmarked')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  // Toggle bookmark status
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ is_bookmarked: !currentCard.is_bookmarked })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return fromDbFormat(data)
}