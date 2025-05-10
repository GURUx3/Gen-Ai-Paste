"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ToggleThemeButton() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      className='cursor-pointer'
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
    >
      {theme === "light" ? <Moon className="h-5 w-5 cursor-pointer" /> : <Sun className="h-5 w-5 cursor-pointer" />}
    </Button>
  );
}
