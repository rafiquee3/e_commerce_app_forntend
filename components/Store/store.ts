import { create } from 'zustand'
import { ProductType } from '../Product/ProductItem.component';
import Cookies from 'js-cookie';

export type CartProductType = ProductType & {quantity: number};
export type LocationType = {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  telephone: string;
}
interface PageState {
    page: string;
    setPage: (page: string) => void;
}
interface UserState {
    user: string;
    setUser: (user: string) => void;
}
interface CartState {
  cartItems: CartProductType[];
  shippingAddress: any;
  paymentMethod: string;
  addItem: (product: ProductType) => void;
  remItem:  (product: ProductType) => void;
  remRecordItem:  (product: ProductType) => void;
  resetItem: () => void;
  saveAddress: (data: LocationType) => void;
}
export const useNavStore = create<PageState>((set) => ({
  page: '',
  setPage: (page: string) => set(() => ({ page })),
}))
export const useUserStore = create<UserState>((set) => ({
    user: '',
    setUser: (user: string) => set(() => ({ user })),
}))

type ItemsCookie = CartProductType[] | undefined;
const cartItemsCookie: ItemsCookie | any = Cookies.get('cartItems');
const addressCookie: {location: LocationType} | any = Cookies.get('address');

export const useCartStore = create<CartState>((set) => ({
  cartItems: Cookies.get('cartItems')
  ? JSON.parse(cartItemsCookie) : [],
  shippingAddress: Cookies.get('address')
  ? JSON.parse(addressCookie) :{location: {}},
  paymentMethod: 'paypal',
  
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
  resetItem: () => {
    set(() => { return {
      cartItems: [],
      shippingAddress: { location: {}},
      paymentMethod: '',
    } }); 
  },
  saveAddress: (data: LocationType) => {
    const address = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      address: data.address,
      city: data.city,
      postal: data.postal,
      telephone: data.telephone,
    }
    set((state) => {
      return {
        shippingAddress: { location: address}
      }
    }); 
  },
}));
