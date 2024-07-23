import SubscribedClient from "@/components/SubscribedClient";

const fetchSubscribed = async () => {
  const res = await fetch(`https://kc-lash.vercel.app/api/subscribed/`);
  const data = await res.json();  // Espera a que res.json() se resuelva y almacena el resultado en una variable
  console.log(data);  // Loguea los datos obtenidos
  return data;  // Devuelve los datos
};

export default async function SubscribedPage({ params }) {
  const subscribedData = await fetchSubscribed();  // Espera a que fetchSubscribed() se resuelva
  return(
    <div>
    {subscribedData.subscribers.length > 0 ? (
      subscribedData.subscribers.map(subscriber => (
        <div key={subscriber.id} className="mb-2 w-full rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b px-4 pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <p>{subscriber.names} {subscriber.surname}</p>
              </div>
              <p className="text-sm text-gray-500">{subscriber.email}</p>
              <p className="text-sm text-gray-500">{subscriber.phone_number}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No subscribers found.</p>
    )}
  </div>
   /* <SubscribedClient  subscribedData={subscribedData}  /> */ // Pasa los datos al componente como una prop
  );
}

/* import SubscribedClient from "@/components/SubscribedClient"

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
    <SubscribedClient subscribedData={subscribedData} />
    );
} */