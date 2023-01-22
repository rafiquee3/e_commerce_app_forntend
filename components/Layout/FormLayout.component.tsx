import styled from "styled-components";
import React from 'react'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 40px - 180px);
    margin-top: 40px;
    padding: 30px;
    background: rgb(193,214,197);
    background: linear-gradient(122deg, rgba(193,214,197,1) 0%, rgba(215,224,215,1) 35%, rgba(255,255,255,1) 100%);
    color: black;
`

export const FormLayout = ({children}: {children: React.ReactNode}): JSX.Element => {
  return (
    <Container>
      {children}
    </Container>
  )
}