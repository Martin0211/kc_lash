'use client'
import Image from 'next/image';
import profilePic from '../components/profilePic.jpg';
import { useState, useEffect } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2'

export default function Modal({ isVisible, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const phoneInput = intlTelInput(document.querySelector("#phone"), {
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

    phoneInput.setNumber("+52 ");
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone_number) => {
    const cleanedPhoneNumber = phone_number.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(cleanedPhoneNumber);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const names = e.target.names.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const surname = e.target.surname.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const email = e.target.email.value;
    let phone_number = e.target.phone_number.value;
  
    // Limpia el número de teléfono
    phone_number = phone_number.replace(/[^\d+]/g, '');

    // Verifica si phoneNumber es igual al código de área predefinido y lo convierte en una cadena vacía
    const areaCode = '+52';
    if (phone_number === areaCode) {
      phone_number = '';
    }

    const isEmailValid = email.trim() === '' || isValidEmail(email);
    const isPhoneNumberValid = phone_number.trim() === '' || isValidPhoneNumber(phone_number);

    if (email && phone_number) {
      if (!isEmailValid && !isPhoneNumberValid) {
        Swal.fire({
          title: "¡Lo sentimos! Hay un problema con tu suscripción.",
          text: "Ingresa un correo electrónico o un número de teléfono válido.",
          icon: "error"
        });
        return;
      } else if (!isEmailValid) {
        Swal.fire({
          title: "¡Lo sentimos! Hay un problema con tu suscripción.",
          text: "Ingresa un correo válido.",
          icon: "error"
        });
        return;
      } else if (!isPhoneNumberValid) {
        Swal.fire({
          title: "¡Lo sentimos! Hay un problema con tu suscripción.",
          text: "Ingresa un número de teléfono válido.",
          icon: "error"
        });
        return;
      }
    }
    if (email || phone_number) {
      if (!isEmailValid && !phone_number) {
        Swal.fire({
          title: "¡Lo sentimos! Hay un problema con tu suscripción.",
          text: "ingresa un correo valido",
          icon: "error"
        });
        return;
      } else if (!isPhoneNumberValid && !email) {
        Swal.fire({
          title: "¡Lo sentimos! Hay un problema con tu suscripción.",
          text: "ingresa telefono valido",
          icon: "error"
        });
        return;
      }
    } else if (!email && !phone_number) {
      Swal.fire({
        title: "¡Lo sentimos! Hay un problema con tu suscripción.",
        text: "Ingresa un correo electrónico o un número de teléfono válido.",
        icon: "error"
      });
      return;
    }
    
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}api/subscribed/`, {
        method: 'POST',
        body: JSON.stringify({ names, surname, email, phone_number }),
        headers: {
          'Content-Type': 'application/json',
          'next-action': 'RENDER'
        }
      });

      if (!res.ok) {
        throw new Error(`El servidor respondió con el estado ${res.status}`);
      }

      const data = await res.json();
      Swal.fire({
        title: "¡Gracias por suscribirte!",
        text: "Prepárate para recibir contenido y ofertas que te encantará",
        icon: "success"
      });
      onClose();
      e.target.reset()
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Se produjo un error.'); // Proporciona un mensaje predeterminado
    }
  };

  return (
    <div className={`fixed inset-0 Obg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isModalOpen ? 'visible' : 'hidden'}`} id='wrapper' onClick={handleClose}>
      <div className="w-[400px] md:w-[600px] m-8 flex flex-col">
        <div className="bg-white  p-4 rounded-md">
          <button className="text-black text-xl" onClick={() => onClose()}><IoClose /></button>
          <div className="flex flex-col items-center pb-4">
            <Image className="rounded-full"
              src={profilePic}
              alt="Picture of the author"
              width={80}
              height={80}
            />
            <h1 className='text-gray-800 font-semibold text-lg py-3'>Subscribe to kclashes_mex</h1>
            <div>
              <h2 className='text-black font-light text-center text-sm pb-3'> Sign up to get exclusive email updates directly from me. </h2>
            </div>
            <form onSubmit={onSubmit} method='POST'>
              <div className='flex flex-col p-8  border-2 border-gray-800 rounded-3xl p-[24px]'>
                <div className='md:flex'>
                  <div className='w-[257px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] border-2 border-gray-800 rounded-3xl md:rounded-r-none md:rounded-l-3xl'>
                    <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                      type="text"
                      placeholder="Names"
                      name="names"
                    />
                  </div>
                  <div className='w-[258px] h-[48px] p-[5px] pl-[10px] md:pl-0 mt-4 md:mt-0 border-2 md:border-l-0 md:border-t-2 md:border-r-2 md:border-b-2 border-gray-800  rounded-3xl md:rounded-l-none md:rounded-r-3xl'>
                    <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                      type="text"
                      placeholder="Surname"
                      name="surname"
                    />
                  </div>
                </div>
                <div className='w-[257px] md:w-[515px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] mt-4 border-2 border-gray-800 rounded-3xl'>
                  <input className='bg-transparent text-black focus:outline-none h-[32px] pl-[16px]'
                    type="text"
                    placeholder="Email"
                    name="email" />
                </div>
                <div className='w-[257px] md:w-[515px] h-[48px] p-[5px] pl-[10px] md:pl-[15px] mt-4 border-2 border-gray-800 rounded-3xl'>
                  <input
                    className='bg-transparent text-black focus:outline-none h-[32px] w-[236px] pl-[16px]'
                    type="tel"
                    placeholder="Whatsapp"
                    name="phone_number"
                    id="phone"
                  />
                </div>
                <button className='w-[257px] md:w-[515px] h-[48px] py-[5px] mt-4 border-2 border-gray-800 rounded-3xl bg-gray-800 text-white' >Subscribe</button>
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
