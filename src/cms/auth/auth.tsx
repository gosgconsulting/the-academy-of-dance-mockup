import { createContext, useContext, useState, type ReactNode } from 'react'

type AuthContext = { authed: boolean; login: (t: string) => boolean; logout: () => void }
const Ctx = createContext<AuthContext>({ authed: false, login: () => false, logout: () => {} })

const EXPECTED = import.meta.env.VITE_CMS_TOKEN

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState(!!localStorage.getItem('cms:auth'))
  const login = (token: string) => {
    if (EXPECTED && token === EXPECTED) {
      localStorage.setItem('cms:auth', '1'); setAuthed(true); return true
    }
    return false
  }
  const logout = () => { localStorage.removeItem('cms:auth'); setAuthed(false) }
  return <Ctx.Provider value={{ authed, login, logout }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)


