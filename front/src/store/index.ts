import { IProduct } from '@/types/product'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

interface ICredential {
  id: number
  password: string
}

interface IUser {
  id: number
  name: string
  email: string
  address: string
  phone: string
  role: string
  credential: ICredential
  orders: number[]
}

interface IUserData {
  login: boolean
  user: IUser
  token: string
}

interface IStoreState {
  userData: IUserData | null
  cart: IProduct[]
  redirectAfterLogin: string | null 

  setUserData: (userData: IUserData | null) => void
  setCart: (data: IProduct[]) => void
  setRedirectAfterLogin: (path: string | null) => void 

  login: (userData: IUserData) => void
  logout: () => void

  isAuthenticated: () => boolean
}

const store = create<IStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        userData: null,
        cart: [],
        redirectAfterLogin: null, 

        setUserData: (userData: IUserData | null) => set({ userData }),
        setCart: (data) => set({ cart: data }),
        setRedirectAfterLogin: (path) => set({ redirectAfterLogin: path }), 

        login: (userData: IUserData) => set({ userData }),
        logout: () => set({ userData: null, cart: [] }),

        isAuthenticated: () => !!get().userData?.login,
      }),
      {
        name: "userDataEcommerce",
        storage:
          typeof window !== "undefined"
            ? createJSONStorage(() => localStorage)
            : undefined, 
      }
    )
  )
)

export const useStoreHasHydrated = () => store.persist?.hasHydrated?.()
export const storePersist = store.persist

export default store;

