import { SignInWithApple } from '@capacitor-community/apple-sign-in'

export const redirectURI = 'https://rasult22.pockethost.io/api/oauth2-redirect'

let options = {
  clientId: 'app.ezhednevnik.dev',
  redirectURI,
  scopes: 'email name',
  state: '12345',
  nonce: 'nonce'
}

export const signInWithApple = async () => {
  try {
    return await SignInWithApple.authorize(options)
  } catch {
    console.error('Error oauth Apple')
  }
}
