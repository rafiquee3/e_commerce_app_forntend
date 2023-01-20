import { FC } from 'react';
import { LoginBttn } from '.';
import { Menu } from ".";

export const Navbar: FC = (): JSX.Element => {
  return (
    <nav 
      style={{
        position: 'fixed',
        top: '0px',
        display: 'flex',
        justifyContent: 'space-between',
       
        paddingRight: '2rem',
        width: '100%',
        height: '40px',
        background: '#F0F4F4',
        fontSize: 18,
        color: 'white',
        zIndex: '999',
      }}
    >
      <div style={{marginLeft: 'calc(2rem + 40px)'}}><div style={{position: 'absolute', lineHeight: '40px', color: 'black'}}>SKLEP</div></div>
      <Menu/>
      <LoginBttn/>
    </nav>
  )
}