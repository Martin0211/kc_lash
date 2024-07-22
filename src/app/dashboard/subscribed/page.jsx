import SubscribedClient from "@/components/SubscribedClient"

const fetchSubscribed = async () => {

  const res = await fetch(`/api/subscribed/`, {
    method: 'GET',
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
  
  return (
    <SubscribedClient subscribedData={subscribedData} />
  );
}