import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Twali';

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1>{siteTitle}</h1>
            <p>

I, Twali, am the sum of many parts. A decentralized professional services platform interacting, operating, and servicing on-chain. 

A collective composed of individuals, experts, builders, educators, & advisors, intent on destroying the hegemony of so-called "consultancies" by developing a peer-reviewed, validated body of knowledge and an expertise-as-a-service platform. 

It may be easy for you to think of me as an on-chain consultancy, a professional services DAO, and that's a good place to start. Start there. Here. Come with me.
            </p>
            <p>
            In Twali, there are two types of people: Builders and Experts. 

Experts provide their knowledge and expertise to Builders, who book it, who come to experts for help on projects. 

Which are you
            </p>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={siteTitle}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{siteTitle}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
