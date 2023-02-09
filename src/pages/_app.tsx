import type { AppProps } from 'next/app'
import Image from 'next/legacy/image'
import { globalStyle } from '../styles/global'

import LogoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

globalStyle()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
