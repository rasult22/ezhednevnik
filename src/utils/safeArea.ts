import { Capacitor } from '@capacitor/core'
import { SafeArea } from 'capacitor-plugin-safe-area'

export const initSafeArea = () => {
  if (Capacitor.getPlatform() === 'ios') {
    SafeArea.addListener('safeAreaChanged', ({ insets }) => {
      setInsets(insets)
    })
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      setInsets(insets)
    })
  }
  return SafeArea.removeAllListeners
}

const setInsets = (incomingInsets: { top: number; bottom: number }) => {
  let insets = Capacitor.getPlatform() === 'ios' ? incomingInsets : { top: 0, bottom: 0 }
  document.documentElement.style.paddingTop = insets.top + 'px'
  document.documentElement.style.paddingBottom = insets.bottom + 'px'

  for (const [key, value] of Object.entries(insets)) {
    document.documentElement.style.setProperty(`--inset-${key}`, `${value}px`)
    document.documentElement.style.setProperty(`--inset-${key}-expand`, `${value + 15}px`)
  }
}
