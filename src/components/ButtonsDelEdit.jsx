'use client';

import { useState } from 'react';
import { IoMdCreate } from "react-icons/io";
import ModalEdit from './ModalEdit';
import DeleteButton from './DeleteButton';

function Botones({ subscriber, onEditSuccess }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex justify-between'>
      <ModalEdit
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        subscriber={subscriber}
        onEditSuccess={onEditSuccess}
      />
      <button onClick={() => setShowModal(true)}>
        <IoMdCreate size={25} />
      </button>
      <DeleteButton subscriberId={subscriber.id} onDeleteSuccess={onEditSuccess} />
    </div>
  );
}

export default Botones;
