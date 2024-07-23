import SubscribedClient from "@/components/SubscribedClient"

const fetchSubscribed = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log(`Fetching from: ${apiUrl}/api/subscribed/`);

  const res = await fetch(`${apiUrl}/api/subscribed/`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

  if (!res.ok) {
    console.error(`API responded with status ${res.status}`);
    const errorText = await res.text();
    console.error(errorText);
    throw new Error('Failed to fetch subscribed data');
  }

  try {
    return await res.json();
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Failed to parse JSON');
  }
};

export default async function SubscribedPage({ params }) {
  let subscribedData;
  try {
    subscribedData = await fetchSubscribed();
  } catch (error) {
    console.error('Error fetching subscribed data:', error);
    subscribedData = { error: 'Failed to load data' };
  }

  return (
    <SubscribedClient subscribedData={subscribedData} />
  );
}
