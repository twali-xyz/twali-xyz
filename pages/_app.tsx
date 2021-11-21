import '../styles/global.css'
import { AppProps } from 'next/app'
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps}/>
    </ChakraProvider>
  )
}

export default App;