import React from 'react';
import QRCode from 'qrcode.react';
import { MdKeyboardArrowRight, MdLuggage } from "react-icons/md";

const LuggageItem = ({ luggage }) => {
  const { ticketNumber, departurePoint, destination, email, phone, bags } = luggage;

  const qrData = JSON.stringify({  
    departurePoint,
    destination,
    ticketNumber,
    phone,
    bags
  });
  console.log('QR Data:', qrData);

  return (
    <div className="bg-white border shadow-md rounded-lg p-6 mb-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold border-b-2 pb-2 mb-4">Luggage Details</h2>
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-1 pr-4">
          <p className="mb-2 items-center flex"><strong>Departure Point</strong><MdKeyboardArrowRight className='mt-0.5' size={20} /> {departurePoint}</p>
          <p className="mb-2 items-center flex"><strong>Destination</strong><MdKeyboardArrowRight className='mt-0.5' size={20} /> {destination}</p>
          <p className="mb-2 items-center flex"><strong>Ticket Number</strong> <MdKeyboardArrowRight className='mt-0.5' size={20} />{ticketNumber}</p>
          <p className="mb-2 items-center flex"><strong>Email</strong><MdKeyboardArrowRight className='mt-0.5' size={20} /> {email}</p>
          <p className="mb-2 items-center flex"><strong>Phone</strong> <MdKeyboardArrowRight className='mt-0.5' size={20} />{phone}</p>
        </div>
        
        <div className="flex-none mt-4 md:mt-0">
          <QRCode value={qrData} size={150} />
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold flex gap-2 items-center mb-2"><MdLuggage />Bags</h3>
        {bags.length === 0 ? (
          <p>No bags listed.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bags.map((bag, index) => (
              <div key={index} className="bg-gray-100 p-4 border rounded-lg shadow">
                <h4 className="text-md font-medium mb-2">Bag {index + 1}</h4>
                <p className="mb-2"><strong>Item Count:</strong> {bag.itemCount}</p>
                <div>
                  {bag.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 bg-white p-3 rounded-lg shadow-md">
                      <p className="font-semibold">Item {itemIndex + 1}</p>
                      <p><strong>Characteristic 1:</strong> {item.characteristic1}</p>
                      <p><strong>Characteristic 2:</strong> {item.characteristic2}</p>
                      <p><strong>Characteristic 3:</strong> {item.characteristic3}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuggageItem;
