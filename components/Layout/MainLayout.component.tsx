import styled from "styled-components";
import React, { ReactNode } from 'react'

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding: 70px 0;
    width: 100%;
    min-height: calc(100vh - 40px - 180px);
    background: rgb(193,214,197);
    background: linear-gradient(122deg, rgba(193,214,197,1) 0%, rgba(215,224,215,1) 35%, rgba(255,255,255,1) 100%);

    ul {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(220px, 220px));
      grid-gap: 40px;
      justify-content: center;
      align-items: flex-start;
      padding: initial;
    }
`
export const MainLayout = ({children}: {children: ReactNode}): JSX.Element => {
  return (   
    <Container>
      <ul>
        {children}
      </ul>
    </Container>
  )
}