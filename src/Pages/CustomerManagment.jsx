// src/pages/CustomerManagement.js
import  { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import bgImg from '../assets/bgimg.jpg';
const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  return (
    <div className="p-6" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <CustomerForm onAdd={handleAddCustomer} /> {/* Ensure onAdd is passed correctly */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Customer List</h2>
        <ul>
          {customers.map((customer, index) => (
            <li key={index} className="border p-2 mb-2 rounded">
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Telephone:</strong> {customer.telephone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerManagement;
