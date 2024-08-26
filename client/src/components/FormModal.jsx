import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDelete } from "react-icons/md";


const FormModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    departurePoint: '',
    destination: '',
    ticketNumber: '',
    email: '',
    phone: '',
    bags: [{ bagType: '', weight: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBagChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBags = formData.bags.map((bag, i) =>
      i === index ? { ...bag, [name]: value } : bag
    );
    setFormData({
      ...formData,
      bags: updatedBags,
    });
  };

  const addBag = () => {
    setFormData({
      ...formData,
      bags: [...formData.bags, { bagType: '', weight: '' }],
    });
  };

  const removeBag = (index) => {
    const updatedBags = formData.bags.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      bags: updatedBags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bagCount = formData.bags.length;

    const payload = { ...formData, bagCount };

    try {
      const response = await fetch('http://localhost:5050/api/luggages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Form data successfully submitted:', payload);
        closeModal();
      } else {
        console.error('Failed to submit form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-10 overflow-y-auto">
      <DialogPanel className="relative mx-auto my-20 bg-white border shadow-md rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">Provide Your Information</DialogTitle>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Departure Point:</label>
            <input
              type="text"
              name="departurePoint"
              value={formData.departurePoint}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Destination:</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Ticket Number:</label>
            <input
              type="text"
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bags:</label>
            {formData.bags.map((bag, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="bagType"
                    placeholder="Bag Type"
                    value={bag.bagType}
                    onChange={(e) => handleBagChange(index, e)}
                    className="w-1/2 px-3 py-2 border-2 border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={bag.weight}
                    onChange={(e) => handleBagChange(index, e)}
                    className="w-1/2 px-3 py-2 border-2 border-gray-300 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeBag(index)}
                    className="text-red-500"
                  >
                   {/* <MdDelete size={40} />  */}
                   Remove
                
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addBag}
              className="mt-2 text-white px-4 py-2 bg-blue-600 rounded"
            >
              Add Another Bag
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 w-full py-2 mr-2 bg-gray-900 hover:opacity-90 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default FormModal;
