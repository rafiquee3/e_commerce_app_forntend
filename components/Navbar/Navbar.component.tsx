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
        alignItems: 'center',
        paddingRight: '2rem',
        width: '100%',
        height: '40px',
        background: 'white',
        fontSize: 18,
        color: 'white',
        zIndex: '999',
        boxShadow: '-1px 4px 3px 0px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{marginLeft: 'calc(2rem + 40px)'}}></div>
      <Menu/>
      <LoginBttn/>
    </nav>
  )
}