import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex flex-wrap px-24 mt-14">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl mb-4">Contact Us</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Send
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col items-center ">
        <h1 className="text-2xl mb-4">Contact Information</h1>
        <p><strong>Address:</strong> 123 Main St, City, Country</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
        <p><strong>Email:</strong> info@example.com</p>
      </div>
    </div>
  );
};

export default ContactForm;