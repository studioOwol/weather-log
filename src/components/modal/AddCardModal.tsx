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
import { useWeather } from "@/hooks/useWeather"
import { useGeocode } from "@/hooks/useGeocode"
import { useWeatherStore } from "@/stores/useWeatherStore"
import { getCurrentLocation } from "@/lib/apiUtils"
import { formatDate } from "@/lib/dateUtils"
import { RULES } from "../../constants/rules"

export default function AddCardModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const { data: weatherData, isLoading: isWeatherLoading } = useWeather(
    location?.lat,
    location?.lon
  )
  const { data: locationInfo, isLoading: isGeocodeLoading } = useGeocode(
    location?.lat,
    location?.lon
  )
  const { addCard } = useWeatherStore()

  const today = formatDate(new Date().toISOString())

  useEffect(() => {
    if (isOpen && !location) {
      handleGetLocation()
    }
  }, [isOpen])

  const handleGetLocation = async () => {
    setIsGettingLocation(true)
    try {
      const coords = await getCurrentLocation()
      setLocation(coords)
    } catch (error) {
      console.error("위치 정보 가져오기 실패:", error)
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
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

    addCard(newCard)
    handleClose()
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
        <Button className="fixed bottom-22 right-4 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all duration-200 z-50 bg-primary shadow-lg hover:shadow-xl">
          <Plus className="size-5 sm:size-6 text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none sm:max-w-md text-muted-foreground">
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
                  Getting location...
                </div>
              ) : locationInfo ? (
                <div className="text-sm">
                  {locationInfo.country} {locationInfo.state} {locationInfo.city}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Location not available</div>
              )}
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Temp</Label>
              {isWeatherLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading...
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
                  Loading...
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
              disabled={!location || !weatherData}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
