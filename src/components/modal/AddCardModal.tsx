import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Plus, Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useWeather } from "@/hooks/queries/useWeather"
import { useGeocode } from "@/hooks/queries/useGeocode"
import { useAddCard } from "@/hooks/queries/useWeatherMutations"
import { getCurrentLocation } from "@/lib/apiUtils"
import { formatDate } from "@/lib/dateUtils"
import { RULES } from "../../constants/rules"
import { DISPLAY_MESSAGES, ERRORS } from "@/constants/messages"
import { cn } from "@/lib/utils"

export default function AddCardModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isClosingRef = useRef(false)

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
  } = useWeather(location?.lat, location?.lon)
  const {
    data: locationInfo,
    isLoading: isGeocodeLoading,
    isError: isGeocodeError,
    error: geocodeError,
  } = useGeocode(location?.lat, location?.lon)
  const addCardMutation = useAddCard()

  const today = formatDate(new Date().toISOString())

  useEffect(() => {
    if (isOpen && !location) {
      handleGetLocation()
    }
    if (isOpen) {
      isClosingRef.current = false
      setIsKeyboardVisible(false)
    }
  }, [isOpen])

  // For debugging
  useEffect(() => {
    if (isWeatherError && weatherError) {
      console.error(weatherError.message, weatherError)
    }
    if (isGeocodeError && geocodeError) {
      console.error(geocodeError.message, geocodeError)
    }
  }, [isWeatherError, weatherError, isGeocodeError, geocodeError])

  const handleGetLocation = async () => {
    setIsGettingLocation(true)
    try {
      const coords = await getCurrentLocation()
      setLocation(coords)
    } catch (error) {
      console.error(ERRORS.GEOCODE.UNKNOWN, error)
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!location || !weatherData || !locationInfo) return

    const newCard = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      location: location,
      country: locationInfo.country,
      city: locationInfo.city,
      state: locationInfo.state,
      memo: memo,
      minTemp: Math.ceil(weatherData.daily.temperature_2m_min[0]),
      maxTemp: Math.ceil(weatherData.daily.temperature_2m_max[0]),
      isBookmarked: false,
      createdAt: Date.now(),
    }

    try {
      await addCardMutation.mutateAsync(newCard)
      handleClose()
    } catch (error) {
      console.error("Failed to add card:", error)
    }
  }

  const handleClose = () => {
    isClosingRef.current = true
    setIsOpen(false)
    setMemo("")
    setLocation(null)
  }

  const handleTextareaFocus = () => {
    setIsKeyboardVisible(true)
  }

  const handleTextareaBlur = () => {
    // 다이얼로그가 닫히는 중이 아닐 때만 키보드 상태 변경
    if (!isClosingRef.current) {
      setIsKeyboardVisible(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-22 right-4 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all duration-200 z-50 bg-primary shadow-lg hover:shadow-xl">
          <Plus className="size-5 sm:size-6 text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={dialogRef}
        className="border-none sm:max-w-md text-muted-foreground transition-all duration-300"
      >
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
          <DialogDescription>Create a new weather record for today.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>
              Date: <div className="text-sm">{today}</div>
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Location:{" "}
              {isGettingLocation || isGeocodeLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {DISPLAY_MESSAGES.LOADING.LOCATION}
                </div>
              ) : isGeocodeError ? (
                <div className="text-sm text-red-500">
                  {DISPLAY_MESSAGES.ERROR.LOCATION_NOT_FOUND}
                </div>
              ) : locationInfo ? (
                <div className="text-sm">
                  {locationInfo.country} {locationInfo.state} {locationInfo.city}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {DISPLAY_MESSAGES.ERROR.LOCATION_NOT_FOUND}
                </div>
              )}
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Temp</Label>
              {isWeatherLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {DISPLAY_MESSAGES.LOADING.WEATHER}
                </div>
              ) : isWeatherError ? (
                <div className="text-sm text-red-500">
                  {DISPLAY_MESSAGES.ERROR.WEATHER_NOT_FOUND}
                </div>
              ) : weatherData ? (
                <div className="text-sm">
                  {Math.ceil(weatherData.daily.temperature_2m_min[0])}
                  {RULES.TEMP_UNIT}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">--{RULES.TEMP_UNIT}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Max Temp</Label>
              {isWeatherLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {DISPLAY_MESSAGES.LOADING.WEATHER}
                </div>
              ) : isWeatherError ? (
                <div className="text-sm text-red-500">
                  {DISPLAY_MESSAGES.ERROR.WEATHER_NOT_FOUND}
                </div>
              ) : weatherData ? (
                <div className="text-sm">
                  {Math.ceil(weatherData.daily.temperature_2m_max[0])}
                  {RULES.TEMP_UNIT}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">--{RULES.TEMP_UNIT}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Note</Label>
            <Textarea
              id="memo"
              className="resize-none bg-inner border-border-default w-full h-28 break-all  overflow-y-auto"
              rows={3}
              value={memo}
              maxLength={300}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              tabIndex={-1}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground/70">
                {memo.length}/{RULES.NOTE_LENGTH}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-inner border-border-default"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 text-inner"
              disabled={!location || !weatherData || addCardMutation.isPending}
            >
              {addCardMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
