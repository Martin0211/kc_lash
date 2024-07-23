'use client';
import { useState, useEffect } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';

export default function ModalEdit({ isVisible, onClose, subscriber, onEditSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [names, setNames] = useState(subscriber?.names || '');
  const [surname, setSurname] = useState(subscriber?.surname || '');
  const [email, setEmail] = useState(subscriber?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(subscriber?.phone_number || '');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  }, [isVisible]);

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  useEffect(() => {
    const phoneInput = intlTelInput(document.querySelector("#edit-phone"), {
      initialCountry: "auto",
      geoIpLookup: function (success, failure) {
        fetch("https://ipinfo.io/json?token=987f8e2a1cf396")
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to get user location");
            }
            return response.json();
          })
          .then(jsonResponse => {
            success(jsonResponse.country);
          })
          .catch(error => {
            failure(error);
          });
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    phoneInput.setNumber(phoneNumber);
  }, [phoneNumber]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone_number) => {
    const cleanedPhoneNumber = phone_number.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(cleanedPhoneNumber);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const cleanedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

    const isEmailValid = email.trim() === '' || isValidEmail(email);
    const isPhoneNumberValid = cleanedPhoneNumber.trim() === '' || isValidPhoneNumber(cleanedPhoneNumber);

    if (!isEmailValid && !isPhoneNumberValid) {
      Swal.fire({
        title: "¡Lo sentimos! Hay un problema con tu suscripción.",
        text: "Ingresa un correo electrónico o un número de teléfono válido.",
        icon: "error"
      });
      return;
    }

    let apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const res = await fetch(`https://kc-lash.vercel.app/api/subscribed?id=${subscriber.id}`, {
        method: 'PUT',
        body: JSON.stringify({ names, surname, email, phone_number: cleanedPhoneNumber }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`El servidor respondió con el estado ${res.status}`);
      }

      onEditSuccess();

      Swal.fire({
        title: "¡Suscriptor actualizado!",
        text: "El suscriptor ha sido actualizado correctamente.",
        icon: "success"
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Se produjo un error.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isModalOpen ? 'visible' : 'hidden'}`} id='wrapper' onClick={handleClose}>
      <div className="w-[400px] md:w-[600px] m-8 flex flex-col">
        <div className="bg-white p-4 rounded-md">
          <button className="text-black text-xl" onClick={() => onClose()}><IoClose /></button>
          <div className="flex flex-col items-center pb-4">
            <h1 className='text-gray-800 font-semibold text-lg py-3'>Editar Suscriptor {subscriber.id}</h1>
            <form onSubmit={handleSave} method='POST'>
              <div className='flex flex-col p-8 border-2 border-gray-800 rounded-3xl'>
                <div className='md:flex'>
                  <div className='w-[257px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] border-2 border-gray-800 rounded-3xl md:rounded-r-none md:rounded-l-3xl'>
                    <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                      type="text"
                      placeholder="Names"
                      name="names"
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                    />
                  </div>
                  <div className='w-[258px] h-[48px] p-[5px] pl-[10px] md:pl-0 mt-4 md:mt-0 border-2 md:border-l-0 md:border-t-2 md:border-r-2 md:border-b-2 border-gray-800 rounded-3xl md:rounded-l-none md:rounded-r-3xl'>
                    <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                      type="text"
                      placeholder="Surname"
                      name="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                </div>
                <div className='w-[257px] md:w-[515px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] mt-4 border-2 border-gray-800 rounded-3xl'>
                  <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='w-[257px] md:w-[515px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] mt-4 border-2 border-gray-800 rounded-3xl'>
                  <input
                    className='bg-transparent text-black focus:outline-none h-[32px] w-[236px] pl-[16px]'
                    type="tel"
                    placeholder="Whatsapp"
                    name="phone_number"
                    id="edit-phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button className='w-[257px] md:w-[515px] h-[48px] py-[5px] mt-4 border-2 border-gray-800 rounded-3xl bg-gray-800 text-white'>Guardar</button>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
