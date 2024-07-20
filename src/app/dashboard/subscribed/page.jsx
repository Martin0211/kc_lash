import SubscribedClient from "@/components/SubscribedClient"

/* const fetchSubscribed = async () => {
  let NEXT_PUBLIC_API_URL = process.env.VERCEL_URL || "http://localhost:3000/";
  if (!/^https?:\/\//i.test(NEXT_PUBLIC_API_URL)) {
    NEXT_PUBLIC_API_URL = 'https://' + NEXT_PUBLIC_API_URL;  // Asumiendo que Vercel usa HTTPS
  }
  
  if (!NEXT_PUBLIC_API_URL.endsWith('/')) {
      NEXT_PUBLIC_API_URL += '/';
    }

  const res = await fetch(`${NEXT_PUBLIC_API_URL}api/subscribed/`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
  return res.json();
}; */

export default async function SubscribedPage({ params }) {
  const subscribedData = await fetchSubscribed();
  
  return (
    <SubscribedClient subscribedData={subscribedData} />
  );
}