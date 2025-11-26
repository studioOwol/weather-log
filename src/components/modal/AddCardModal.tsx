import { useState, useEffect } from "react"
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
import { RULES } from "../../constants/rules"
import { ERRORS } from "@/constants/messages"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { formatLocalizedDate } from "@/lib/dateUtils"

export default function AddCardModal() {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CARD)
  const [isOpen, setIsOpen] = useState(false)
  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

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

  const today = formatLocalizedDate(new Date().toISOString(), i18n.language)

  useEffect(() => {
    if (isOpen && !location) {
      handleGetLocation()
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
      date: new Date().toLocaleDateString("sv-SE"),
      location: location,
      country: locationInfo.country,
      city: locationInfo.city,
      state: locationInfo.state,
      memo: memo,
      minTemp: Math.ceil(weatherData.daily.temperature_2m_min[0]),
      maxTemp: Math.ceil(weatherData.daily.temperature_2m_max[0]),
      isBookmarked: false,
      createdAt: Date.now(),
      language: i18n.language,
    }

    try {
      await addCardMutation.mutateAsync(newCard)
      handleClose()
    } catch (error) {
      console.error("Failed to add card:", error)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setMemo("")
    setLocation(null)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-15 right-4 sm:right-7 h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all duration-200 z-50 bg-primary hover:bg-primary shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer">
          <Plus className="size-5 sm:size-6 text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none sm:max-w-md text-muted-foreground">
        <DialogHeader className="mb-1">
          <DialogTitle>{t("add.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("add.description")}</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label>
              {t("field.date")}: <div className="text-sm">{today}</div>
            </Label>

            <Label className="flex items-center gap-2">
              {t("field.location")}:{" "}
              {isGettingLocation || isGeocodeLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {t("loading.location")}
                </div>
              ) : isGeocodeError ? (
                <div className="text-sm text-destructive">{t("error.locationNotFound")}</div>
              ) : locationInfo ? (
                <div className="text-sm">
                  {locationInfo.country} {locationInfo.state} {locationInfo.city}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">{t("error.locationNotFound")}</div>
              )}
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("field.minTemp")}</Label>
              {isWeatherLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {t("loading.weather")}
                </div>
              ) : isWeatherError ? (
                <div className="text-sm text-destructive">{t("error.weatherNotFound")}</div>
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
              <Label>{t("field.maxTemp")}</Label>
              {isWeatherLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  {t("loading.weather")}
                </div>
              ) : isWeatherError ? (
                <div className="text-sm text-destructive">{t("error.weatherNotFound")}</div>
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
            <Label htmlFor="memo">{t("field.note")}</Label>
            <Textarea
              id="memo"
              className="resize-none bg-inner border-border-default w-full h-28 break-all  overflow-y-auto"
              rows={3}
              value={memo}
              maxLength={300}
              onChange={(e) => setMemo(e.target.value)}
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
              className="flex-1 bg-inner border-border-default cursor-pointer"
              onClick={handleClose}
            >
              {t("button.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 text-inner cursor-pointer"
              disabled={!location || !weatherData || addCardMutation.isPending}
            >
              {addCardMutation.isPending ? t("button.saving") : t("button.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
