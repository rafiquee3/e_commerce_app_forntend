import { create } from 'zustand'
import { ProductType } from '../Product/ProductItem.component';

type ArrProductType = ProductType & {quantity: number};
interface PageState {
    page: string;
    setPage: (page: string) => void;
}
interface UserState {
    user: string;
    setUser: (user: string) => void;
}
interface CartState {
  cartItems: ArrProductType[] 
  addItem: (item: ProductType) => void;
}
export const useNavStore = create<PageState>((set) => ({
  page: '',
  setPage: (page: string) => set(() => ({ page })),
  // pageMain: () => set((state) => ({ page: 'main' })),
}))
export const useUserStore = create<UserState>((set) => ({
    user: '',
    setUser: (user: string) => set(() => ({ user })),
    // pageMain: () => set((state) => ({ page: 'main' })),
}))
export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addItem: (item: ProductType) => {
    set((state) => {
      const newItem = { ...item, quantity: 1}
      const existItem = state.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems =  existItem ? state.cartItems.map((item) => 
        item.name === existItem.name ? {...newItem, quantity: item.quantity + 1, countInStock: item.countInStock - 1} : item
      )
      : [...state.cartItems, {...newItem, countInStock: item.countInStock - 1}];
      if (item.countInStock <= 0) {
        return {
          carteItems: state.cartItems
        }
      }
      return {
        cartItems,
      }
    }); 
  },
  remItem: (item: ProductType) => {
    set((state) => {
      const newItem = { ...item, quantity: 1}
      const existItem = state.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems =  existItem ? state.cartItems.map((item) => 
        item.name === existItem.name ? {...newItem, quantity: item.quantity - 1, countInStock: item.countInStock + 1} : item
      )
      : state.cartItems;
      return {
        cartItems,
      }
    }); 
  },
}));
