import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const shadcnColors = [
  "background", "foreground",
  "primary", "primary-foreground",
  "secondary", "secondary-foreground",
  "muted", "muted-foreground",
  "accent", "accent-foreground",
  "destructive", "destructive-foreground",
  "card", "card-foreground",
  "popover", "popover-foreground",
  "border", "input", "ring",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color":      [{ bg:      shadcnColors }],
      "text-color":    [{ text:    shadcnColors }],
      "border-color":  [{ border:  shadcnColors }],
      "ring-color":    [{ ring:    shadcnColors }],
      "outline-color": [{ outline: shadcnColors }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}