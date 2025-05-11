import { useEffect, useState } from 'react'
import store from '@/store/index'

export default function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const unsub = store.persist?.onFinishHydration?.(() => {
      setHasHydrated(true)
    })

    if (store.persist?.hasHydrated?.()) {
      setHasHydrated(true)
    }

    return () => {
      unsub?.()
    }
  }, [])

  return hasHydrated
}
