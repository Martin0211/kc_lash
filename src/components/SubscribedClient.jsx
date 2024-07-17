'use client';

/* import { useState, useEffect } from 'react';
import ButtonSubscribe from "@/components/ButtonSubs.jsx";
import Botones from '@/components/ButtonsDelEdit'; */

const SubscribedClient = ({ subscribedData }) => {
  /* const [subscribers, setSubscribers] = useState(subscribedData.subscribers);

  const fetchSubscribed = async () => {
    let NEXT_PUBLIC_API_URL = process.env.VERCEL_URL || "http://localhost:3000/";
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
    const data = await res.json();
    setSubscribers(data.subscribers);
  };

  useEffect(() => {
    setSubscribers(subscribedData.subscribers);
  }, [subscribedData]);

  const handleEditSuccess = () => {
    fetchSubscribed();
  }; */

  return (
    <>
    <h1>hola hola</h1>
      {/* <div className="flex items-center justify-between mx-12 my-6">
        <strong className="text-2xl">Suscritos</strong>
        <ButtonSubscribe
          label="Nuevo Suscriptor"
          className="md:mt-2 md:mb-1 md:h-48px p-2 rounded-lg md:rounded-md text-base flex items-center bg-gray-300 hover:text-gray-700"
        />
      </div>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-100 p-2 md:pt-0">
            <div className="md:hidden">
              {subscribers.map(subscriber => (
                <div key={subscriber.id} className="mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b px-4 pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{subscriber.names}</p>
                      </div>
                      <p className="text-sm text-gray-500">{subscriber.email}</p>
                      <p className="text-sm text-gray-500">{subscriber.phone_number}</p>
                    </div>
                    <Botones subscriber={subscriber} onEditSuccess={handleEditSuccess} fetchSubscribed={fetchSubscribed} />
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Nombre</th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Apellido</th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Email</th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Telefono</th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {subscribers.map(subscriber => (
                  <tr key={subscriber.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">{subscriber.names}</td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">{subscriber.surname}</td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">{subscriber.email}</td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">{subscriber.phone_number}</td>
                    <td className="acciones whitespace-nowrap py-3 pl-6 pr-3">
                      <Botones subscriber={subscriber} onEditSuccess={handleEditSuccess} fetchSubscribed={fetchSubscribed} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SubscribedClient;
