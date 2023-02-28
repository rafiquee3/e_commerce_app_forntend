import Image from 'next/image'
import styled from "styled-components";
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
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
  type Html = any;
  const [showMenu, setShowMenu] = useState(false);
  const { status, data: session } = useSession();
  const [showStatus, setShowStatus] = useState<Html>();
  const handleOnClick = () => {
    setShowMenu(prev => !prev);
  }
  const data = useMemo(() => status === 'loading' ? (
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
   setShowStatus(data);
  },[data]);

  return (
    <Container>
      {showStatus}
      {showMenu && <MenuDropdown />}
    </Container>
  )
}
