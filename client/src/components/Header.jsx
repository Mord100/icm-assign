import React, { useState } from 'react';
import FormModal from './FormModal'; 
import { BsFillLuggageFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className='flex md:w-[70%] justify-center mx-auto md:p-20 py-8'>
        <div className="flex items-center border-b pb-4 mx-auto justify-between w-full flex-wrap md:flex-nowrap">
          <h1 className='flex gap-2 text-gray-900 items-center font-bold text-3xl md:text-4xl whitespace-nowrap'>
            <BsFillLuggageFill />
            <span className="whitespace-nowrap items-center flex gap-2">Luggage<FaPlus className='items-center mt-2' size={30} color='blue' />
            </span>
          </h1>
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
