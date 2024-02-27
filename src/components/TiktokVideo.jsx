import Head from 'next/head'
import Script from 'next/script';

const fetchVideo = () => {

    return fetch('https://www.tiktok.com/oembed?url=https://www.tiktok.com/@kclashes_mex/video/7134150439125126405')
    .then((response) => response.json())
    .then((data) => data.html)
}

export default async function VideoTiktok(){
    const dataApi = await fetchVideo()
    return (
        <div className='w-min bg-trasparent'>
        <Head>
          <link rel="stylesheet" href="/styles.css" />
        </Head>
        <main>
          <div dangerouslySetInnerHTML={{ __html: dataApi }} />
          {/* <Script className='bg-transparent' src="/script.js"></Script> */}
        </main>
      </div>
        )
    }
   