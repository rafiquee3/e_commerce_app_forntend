import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styled from "styled-components";
import { LoginBttn } from '.';
import { Menu } from ".";
import { useCartStore } from '../Store/store';

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
    .cart {
      position: absolute;
      left: -40px;
      top: 5px;
      line-height: 40px;
    }
  }
`
export const Navbar: FC = (): JSX.Element => {
  const { cartItems } = useCartStore();
  return (
    <Nav>
      <div className='logo'>
        <div>
          SKLEP
        </div>
      </div>
      <Menu/>
      <div className='actionPanel'>
        <div className='itemCounter'>{cartItems.length ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : ''}</div>
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