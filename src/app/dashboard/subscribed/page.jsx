import SubscribedClient from "@/components/SubscribedClient";
import { fetchSubscribed } from "@/utils/fetch";

export default async function SubscribedPage() {
  try {
    const subscribedData = await fetchSubscribed();
    return <SubscribedClient subscribedData={subscribedData} />;
  } catch (error) {
    console.error('Error in SubscribedPage:', error);
    return <div>Error loading subscribers. Please try again later.</div>;
  }
}