import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'ac-theme'

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

function applyTheme(theme) {
  if (theme) {
    document.documentElement.dataset.theme = theme
  } else {
    delete document.documentElement.dataset.theme
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => readStoredTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    const isDark =
      root.dataset.theme === 'dark' ||
      (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const next = isDark ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  return { theme, toggleTheme }
}
