import SubscribedClient from "@/components/SubscribedClient"

const fetchSubscribed = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  

  const res = await fetch(`${apiUrl}/api/subscribed/`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
  return res.json();
};

export default async function SubscribedPage({ params }) {
  const subscribedData = await fetchSubscribed();
  console.log(subscribedData);
  
  return (
    <SubscribedClient /* subscribedData={subscribedData} */ />
  );
}