import { create } from 'zustand'
import { ProductType } from '../Product/ProductItem.component';
import Cookies from 'js-cookie';

export type CartProductType = ProductType & {quantity: number};
interface PageState {
    page: string;
    setPage: (page: string) => void;
}
interface UserState {
    user: string;
    setUser: (user: string) => void;
}
interface CartState {
  cartItems: CartProductType[] 
  addItem: (product: ProductType) => void;
  remItem:  (product: ProductType) => void;
  remRecordItem:  (product: ProductType) => void;
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
  cartItems: Cookies.get('cartItems')
  ? JSON.parse(Cookies.get('cartItems')) : [],
  addItem: (product: ProductType) => {
    set((state) => {
      const newItem = { ...product, quantity: 1}
      const existItem = state.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems =  existItem ? state.cartItems.map((item) => 
        item.name === existItem.name ? {...newItem, quantity: item.quantity + 1, countInStock: item.countInStock - 1} : item
      )
      : [...state.cartItems, {...newItem, countInStock: product.countInStock - 1}];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      if (product.countInStock <= 0) {
        return {
          carteItems: state.cartItems
        }
      }
      return {
        cartItems,
      }
    }); 
  },
  remItem: (product: ProductType) => {
    set((state) => {
      const newItem = { ...product, quantity: 1}
      const existItem = state.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems =  existItem ? state.cartItems.map((item) => 
        item.name === existItem.name ? {...newItem, quantity: item.quantity - 1, countInStock: item.countInStock + 1} : item
      )
      : state.cartItems;
      if (product.countInStock < 0) {
        return {
          carteItems: state.cartItems
        }
      }
      return {
        cartItems,
      }
    }); 
  },
  remRecordItem: (product: ProductType) => {
    set((state) => {
      const existItem = state.cartItems.find((item) => item.slug === product.slug);
      const cartItems =  existItem ? state.cartItems.filter((item) => item.slug !== existItem.slug) : state.cartItems;
 
      return {
        cartItems,
      }
    }); 
  },
}));
