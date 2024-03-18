import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.ezhednevnik.dev',
  appName: 'ezhednevnik',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    includePlugins: [
      '@capacitor-community/apple-sign-in',
      '@capacitor/device',
      'capacitor-plugin-safe-area',
      '@capacitor/app',
      '@capacitor/assets',
      '@capacitor/core'
    ]
  }
}

export default config
