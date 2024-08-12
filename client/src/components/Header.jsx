import React, { useState } from 'react';
import FormModal from './FormModal'; 
import { BsFillLuggageFill } from "react-icons/bs";


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className='flex p-20'>
        <div className="flex items-center border-b pb-4 mx-auto w-full justify-center">
          <h1 className='w-1/2 flex gap-2 text-gray-900 font-bold text-4xl'><BsFillLuggageFill />
          Luggage Management</h1>
          <div
            onClick={openModal}
            className="bg-gray-900 rounded-md px-3 py-2 text-white font-semibold cursor-pointer hover:opacity-90"
          >
            Add New
          </div>
        </div>
      </div>

      {/* Render the FormModal and pass props */}
      <FormModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Header;
