import { css } from '@emotion/css'
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { BckgColor, FontColor } from '../../styles/colors';

const IMG_SIZE = 40;
const style = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 180px;
  background: ${BckgColor.FOOTER};
  margin-top: 8em;
  padding-bottom: 10px;
  p {
    position: absolute;
    bottom: 0.1em;
    font-size: 0.7em;
    color: ${FontColor.DEFAULT};
  }
  .socialStyle {
    display: flex;
    gap: 20px;
  }
  .imgStyle {
    &:hover {
      border-radius: 50%;
      box-shadow: 0 0 50px ${BckgColor.SKYBLUE};
      margin-top: -10px;
      transition: margin-top 0.5s;
      width: 50px;
      height: 50px;
    }
  }
`
const styleLink = css`
  height: 40px;
`

const Footer = () => {
  return (
    <>
      <footer className={style}>
        <div className="socialStyle">
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/linkedin.png"
              alt="linkedin icon"
              width={IMG_SIZE}
              height={IMG_SIZE}
              className="imgStyle"
            />
          </Link>
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/github.png"
              alt="github icon"
              width={IMG_SIZE}
              height={IMG_SIZE}
              className="imgStyle"
            />
          </Link>
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/mail.png"
              alt="email icon"
              width={IMG_SIZE}
              height={IMG_SIZE}
              className="imgStyle"
            />
          </Link>
        </div>
        <p>© 2023 Rafał Sokołowski - rafiquee3</p>
      </footer>
    </>
  )
}

export default Footer;