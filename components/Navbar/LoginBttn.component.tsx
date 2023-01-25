import Image from 'next/image'
import styled from "styled-components";
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useUserStore } from '../Store/store';
import { useSession } from 'next-auth/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const LoginBttn: FC = (): JSX.Element => {
  const { status, data: session } = useSession();
  const [showStatus, setShowStatus] = useState();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const data = useMemo( () => status === 'loading' ? (
    'Loading'
  ) : session?.user ? (
    session.user.login
  ) : (
    <Image
      src="/user.png"
      alt="User icon"
      width={30}
      height={30}
    />
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
      <Link style={{height: '30px'}} href={'/login'}>
        {showStatus}
      </Link>
    </Container>
  )
}
