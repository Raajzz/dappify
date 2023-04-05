import React, { useContext, useState } from "react";
import { TransactionContext } from "./context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="w-full bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6"
  />
);

function Payment() {

  const { formData, setFormData, handleChange, sendTransaction } =
    useContext(TransactionContext);
  const { addressTo, amount, artist, songName } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressTo || !amount || !artist || !songName) {
      return;
    };
    sendTransaction();
  };

  return (
    <div className="bg-white px-4 py-6 rounded-lg shadow-md">
      <div className="bg-gray-700 rounded-lg p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Address To"
            name="addressTo"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Amount (ETH)"
            name="amount"
            type="number"
            handleChange={handleChange}
          />
          <Input
            placeholder="Artist"
            name="artist"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Song"
            name="songName"
            type="text"
            handleChange={handleChange}
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
