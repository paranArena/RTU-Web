import Head from 'next/head';

function Header() {
  return (
    <Head>
      <title>Ren2U</title>
      <meta name="description" content="Ren2U Web Service" />
      {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}

export default Header;
