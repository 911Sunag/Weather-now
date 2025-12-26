import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps {
  className?: string
  duration?: number
}

export function AnimatedThemeToggler({ className, duration = 400 }: AnimatedThemeTogglerProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = savedTheme || (root.classList.contains("dark") ? "dark" : "light")
    setTheme(initialTheme)
    root.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)

    setTimeout(() => setIsAnimating(false), duration)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative overflow-hidden", className)}
      style={{ transitionDuration: `${duration}ms` }}
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          isAnimating && "animate-spin",
          theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          isAnimating && "animate-spin",
          theme === "light" ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}