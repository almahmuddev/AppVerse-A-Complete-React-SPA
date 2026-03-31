import { useState, useCallback } from 'react'

const LS_KEY = 'appverse_installed_v1'

// Read the installed app IDs from localStorage on first render
function readFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(ids) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids))
}

export function useInstalledApps() {
  const [installed, setInstalled] = useState(readFromStorage)

  const install = useCallback((id) => {
    setInstalled((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      saveToStorage(next)
      return next
    })
  }, [])

  const uninstall = useCallback((id) => {
    setInstalled((prev) => {
      const next = prev.filter((x) => x !== id)
      saveToStorage(next)
      return next
    })
  }, [])

  const isInstalled = useCallback(
    (id) => installed.includes(id),
    [installed]
  )

  return { installed, install, uninstall, isInstalled }
}
