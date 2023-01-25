import Image from 'next/image'
import styled from "styled-components";
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useUserStore } from '../Store/store';
import { useSession } from 'next-auth/react';
import { MenuDropdown } from './MenuDropdown.component';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
  
  }
  .login {
    display: block;
    cursor: pointer;
  }
`
export const LoginBttn: FC = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const { status, data: session } = useSession();
  const [showStatus, setShowStatus] = useState();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const handleOnClick = () => {
    setShowMenu(prev => !prev);
  }
  const data = useMemo( () => status === 'loading' ? (
    'Loading'
  ) : session?.user ? (
    <div className='login' onClick={handleOnClick}>{session.user.login}</div>
  ) : (
    <Link style={{height: '30px'}} href={'/login'}>
      <Image
        src="/user.png"
        alt="User icon"
        width={30}
        height={30}
      />
    </Link>
  ), [session?.user, status]);

  useEffect(() => {
      const userLS = (localStorage.getItem('user') || "");
      setUser(userLS);  
  },[setUser])
  useEffect(() => {
   setShowStatus(data);
},[data])
  console.log(session)
  return (
    <Container>
      {showStatus}
      {showMenu && <MenuDropdown />}
    </Container>
  )
}
