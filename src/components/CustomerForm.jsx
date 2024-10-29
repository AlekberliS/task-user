import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CountryFlag from 'react-country-flag';
import bgImg from '../assets/bgimg.jpg';
const countryCodes = [
  { code: '+994', country: 'Azerbaijan', flag: 'AZ' }
];

const CustomerForm = ({ onAdd }) => {
  const [selectedFlag, setSelectedFlag] = useState('AZ'); // Default flag

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|org)$/, "Email must be valid and end with .com, .ru, or .org")
      .required("Email is required"),
    telephone: Yup.string()
      .matches(/^(50|51|55|99|10|60|70|77)[2-9]{1}[\d]{6}$/, "Phone number must be correct!")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', telephone: '' },
    validationSchema,
    onSubmit: (values) => {
      onAdd(values);
      formik.resetForm();
    },
  });

  // Function to handle country code change and update the flag and telephone prefix
  const handleCountryCodeChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = countryCodes.find((country) => country.code === selectedCode);
    setSelectedFlag(selectedCountry.flag);
    formik.setFieldValue("telephone", `${formik.values.telephone.split(' ').slice(1).join(' ')}`);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-4 sm:p-6 rounded shadow-md mb-4 w-full max-w-md mx-auto" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Add Customer</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`border p-2 mb-2 w-full rounded ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
      />
      {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mb-2">{formik.errors.name}</div>}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={`border p-2 mb-2 w-full rounded ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
      />
      {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>}
      
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:space-x-2 mb-2">
        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
          {/* Display the selected flag */}
          <CountryFlag countryCode={selectedFlag} svg style={{ width: '2em', height: '2em' }} />
          
          {/* Dropdown for selecting country code */}
          <p
            onChange={handleCountryCodeChange}
            value={formik.values.telephone.split(' ')[0]} // Set dropdown to current prefix
          >
            {countryCodes.map(({ code, country }) => (
              <option key={country} value={code}>
                {code} 
              </option>
            ))}
          </p>
        </div>

        {/* Telephone input field */}
        <input
          type="text"
          name="telephone"
          placeholder="Phone number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.telephone}
          className={`border p-2 w-full rounded ${formik.touched.telephone && formik.errors.telephone ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>
      {formik.touched.telephone && formik.errors.telephone && <div className="text-red-500 text-sm mb-2">{formik.errors.telephone}</div>}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full sm:w-auto rounded mt-2 hover:bg-blue-600 transition-colors duration-300"
      >
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
