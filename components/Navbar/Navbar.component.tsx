import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import styled from "styled-components";
import { LoginBttn } from '.';
import { Menu } from ".";
import { useCartStore } from '../Store/store';
import { SessionProvider, useSession } from 'next-auth/react';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding-right: 2rem;
  width: 100%;
  height: 40px;
  background: white;
  font-size: 18px;
  color: black;
  z-index: 999;

  .logo {
    margin-left: calc(2rem + 40px);

    div {
      position: absolute;
      line-height: 40px;
      color: black;
    }
  }
  .actionPanel {
    position: relative;
    display: flex;
    align-items: center;

    .itemCounter {
      position: absolute;
      left: -70px;
      line-height: 40px;
    }
    a {
      margin: 0;
      padding: 0;
    }
    a.cart {
      position: absolute;
      left: -40px;
      top: 5px;
    }
  }
`
export const Navbar: FC = (props: any): JSX.Element => {
  const { cartItems, paymentMethod } = useCartStore();
  const [cartItemsQt, setCartItemsQt] = useState(0);
  useEffect(() => {
    setCartItemsQt(cartItems.reduce((acc, curr) => acc + curr.quantity, 0))
  }, [cartItems]);
  console.log(paymentMethod)
  return (
    <Nav>
      <div className='logo'>
        <div>
          SKLEP
        </div>
      </div>
      <Menu/>
      <div className='actionPanel'>
        <div className='itemCounter'>{cartItemsQt}</div>
        <Link className='cart' href={'/cart'}>
          <Image
            src="/cart.png"
            alt="Cart icon"
            width={30}
            height={30}
          />
        </Link>
        <LoginBttn/>
      </div>
    </Nav>
  )
}
