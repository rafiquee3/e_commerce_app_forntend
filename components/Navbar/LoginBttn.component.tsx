import Image from 'next/image'
import styled from "styled-components";
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useUserStore } from '../Store/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const LoginBttn: FC = (): JSX.Element => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
 
  useEffect(() => {
      const userLS = (localStorage.getItem('user') || "");
      setUser(userLS);  
  },[setUser])

  return (
    <Container>
      <Link style={{height: '30px'}} href={'/login'}>
        <Image
          src="/user.png"
          alt="User icon"
          width={30}
          height={30}
        />
      </Link>
    </Container>
  )
}
