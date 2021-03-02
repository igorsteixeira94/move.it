import ChallengeProvider from "../providers/ChallengeProvider"
import CountdownProvider from "../providers/CountdownContext"
import "../styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeProvider>
        <Component {...pageProps} />
    </ChallengeProvider>
  )
}

export default MyApp
