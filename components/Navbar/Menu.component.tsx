import { FC } from 'react'
import styled from "styled-components";
import { FontColor } from '../../styles/colors'
import Link from 'next/link'
import { useNavStore } from '../Store/store';

const MenuList = styled.ul`
  display: flex;
  height: 40px;
  list-style-type: none;
  color: #BAD1CD;
  margin: 0;
  padding: 0;

  .linkStyle {
    display: block;
    line-height: 40px;
    padding: 0 1rem 0 1rem;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      box-shadow: inset 0 -5px 0 ${FontColor.BLUE};
      color: ${FontColor.BLUE};
    }
  }

  .linkStyleSelected {
    display: block;
    line-height: 40px;
    padding: 0 1rem 0 1rem;
    cursor: pointer;
    text-decoration: none;
    color: ${FontColor.BLUE};
  }
`
export const Menu: FC = (): JSX.Element => {
  const page = useNavStore((state) => state.page);
  return (
    <MenuList>
      <li><Link href={'/'} className={page === 'home' ? 'linkStyleSelected' : 'linkStyle'}>Meble</Link></li>
      <li><Link href={'/articles'} className={page === 'blog' ? 'linkStyleSelected' : 'linkStyle'}>Akcesoria</Link></li>
    </MenuList> 
)
}
