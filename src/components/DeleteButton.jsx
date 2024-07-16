'use client';

import { IoIosTrash } from "react-icons/io";
import Swal from 'sweetalert2';

const DeleteButton = ({ subscriberId, fetchSubscribed }) => {
  const handleEliminar = async () => {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}api/subscribed?id=${subscriberId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error(`Error al eliminar usuario: ${res.status}`);
      }

      await fetchSubscribed();

      Swal.fire({
        title: "Suscriptor eliminado",
        text: "El suscriptor se ha eliminado correctamente",
        icon: "success"
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el suscriptor",
        icon: "error"
      });
    }
  };

  const confirmEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliminar();
      }
    });
  };

  return (
    <button onClick={confirmEliminar}>
      <IoIosTrash size={25} />
    </button>
  );
};

export default DeleteButton;
