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
  repItem:  (product: any) => void;
  remRecordItem:  (product: ProductType) => void;
  resetItem: () => void;
  clearCartItem: () => void;
  saveAddress: (data: LocationType) => void;
  savePaymentMethod: (data: string) => void;
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
const paymentMethodCookie: string | any = Cookies.get('paymentMethod');

export const useCartStore = create<CartState>((set) => ({
  cartItems: Cookies.get('cartItems')
  ? JSON.parse(cartItemsCookie) : [],
  shippingAddress: Cookies.get('address')
  ? JSON.parse(addressCookie) : '',
  paymentMethod: Cookies.get('paymentMethod')
  ? paymentMethodCookie : '',
  
  addItem: (product: ProductType) => {
    set((state) => {
      const newItem = { ...product, quantity: 1}
      const existItem = state.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems =  existItem ? state.cartItems.map((item) => 
        item.name === existItem.name ? {...newItem, quantity: item.quantity + 1, countInStock: item.countInStock - 1} : item
      )
      : [...state.cartItems, {...newItem, countInStock: product.countInStock - 1}];
      
      if (product.countInStock <= 0) {
        return {
          carteItems: state.cartItems
        }
      }
      Cookies.set('cartItems', JSON.stringify(cartItems));
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
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        cartItems,
      }
    }); 
  },
  repItem: (product: any) => {
    set((state) => {
      //const cartItems =  [...state.cartItems, product];
      const cartItems = state.cartItems.map((item) => {
        if (item.slug === product.slug) {
          item.quantity = product.quantity;
          return item;
        } else {
          return item;
        }
      })
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        cartItems,
      }
    }); 
  },
  remRecordItem: (product: ProductType) => {
    set((state) => {
      const existItem = state.cartItems.find((item) => item.slug === product.slug);
      const cartItems =  existItem ? state.cartItems.filter((item) => item.slug !== existItem.slug) : state.cartItems;
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        cartItems,
      }
    }); 
  },
  resetItem: () => {
    Cookies.set('cartItems', '');
    Cookies.set('address', '');
    Cookies.set('paymentMethod', '');
    set(() => { return {
      cartItems: [],
      shippingAddress: { location: {}},
      paymentMethod: '',
    } }); 
  },
  clearCartItem: () => {
    Cookies.set('cartItems', '');
    set(() => { return {
      cartItems: [],
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
    Cookies.set('address', JSON.stringify({location: address}));
    set((state) => {
      return {
        shippingAddress: { location: address}
      }
    }); 
  },
  savePaymentMethod: (data: string) => {
    Cookies.set('paymentMethod', data);
    set((state) => {
      return {
        paymentMethod: data
      }
    }); 
  },
}));
