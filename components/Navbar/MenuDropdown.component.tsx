import { FC } from 'react'
import styled from "styled-components";
import Link from 'next/link'
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useCartStore } from '../Store/store';

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  top: 40px;
  right: 0;
  width: 200px;
  list-style-type: none;
  color: #BAD1CD;
  border: 1px solid black;
  margin: 0;
  padding: 1em;

  li {
    padding: 5px;
  }
  li:hover {
    background: gray;
  }
  li a {
    display: block;
  }
`
export const MenuDropdown: FC = (): JSX.Element => {
  const { resetItem } = useCartStore();
  const handleOnClick = () => {
    Cookies.remove('cartItems');
    Cookies.remove('address');
    Cookies.remove('user');
    resetItem();
    signOut({ callbackUrl: '/login'});
  }
  return (
    <MenuList>
      <li><Link href={'/profile'}>Profil</Link></li>
      <li><Link href={'#'} onClick={handleOnClick}>Logout</Link></li>
    </MenuList> 
    )
}
