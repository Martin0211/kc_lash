import SubscribedClient from "@/components/SubscribedClient"

const fetchSubscribed = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`https://${apiUrl}/api/subscribed/`, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!res.ok) {
      // Manejar errores de respuesta no exitosa
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // Verificar si la respuesta es JSON válida
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Error: Expected JSON response');
      throw new Error('Expected JSON response');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error('Failed to fetch subscribed data:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};

export default async function SubscribedPage({ params }) {
  const subscribedData = await fetchSubscribed();
  console.log(subscribedData);
  
  return (
    <SubscribedClient /* subscribedData={subscribedData} */ />
  );
}