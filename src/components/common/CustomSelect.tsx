import { ChevronDown, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface CustomSelectProps {
  value: string
  placeholder: string
  options: { value: string; label: string }[]
  onSelect: (value: string) => void
  className?: string
}

export default function CustomSelect({
  value,
  placeholder,
  options,
  onSelect,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleOptionClick = (optionValue: string) => {
    onSelect(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)
  const displayText = selectedOption ? selectedOption.label : (value || placeholder)

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border text-muted-foreground border-border-default rounded-md bg-inner cursor-pointer"
      >
        <span>{displayText}</span>
        <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-inner border border-border-default rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-memo transition-colors flex items-center justify-between ${
                value === option.value ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="size-4 text-muted-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
