import styled from "styled-components";
import React from 'react'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 70px);
`

export const FormLayout = ({children}: {children: React.ReactNode}): JSX.Element => {
  return (
    <Layout>
      {children}
    </Layout>
  )
}