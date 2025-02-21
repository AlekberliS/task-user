import { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from './ThemeContext';
import UserModal from "./UserModal";
import Select from 'react-select';
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const [searchUser, setSearchUser] = useState('');
  const generateEmployeeNumber = () => {
    const lastDigit = Math.floor(Math.random() * 3) + 1;
    console.log(Math.floor(Math.random()*3))//0-2
    const firstFourDigits = Math.floor(1000 + Math.random() * 9000);
    return parseInt(`${firstFourDigits}${lastDigit}`);
  };

  const getReasonByLastDigit = (number, name) => {
    const lastDigit = number % 10;
    if (lastDigit === 1) return `${name} Ərizəsi`;
    if (lastDigit === 2) return `${name} Təqdimatı`;
    if (lastDigit === 3) return `${name} Razılıq Ərizəsi`;
   
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const updatedUsers = data.map((user) => {
          const employeeNumber = generateEmployeeNumber();
          return {
            id: user.id,
            name: user.name,
            employeeNumber,
            reason: getReasonByLastDigit(employeeNumber, user.name),
          };
        });
        setUsers(updatedUsers);
        console.log(updatedUsers)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const validationSchema = Yup.object({
    rows: Yup.array().of(
      Yup.object({
        id: Yup.string().required('İşçi seçilməlidir'),
       
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      rows: [{ id: '', note: '' }],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAddRow = () => {
    formik.setValues({
      rows: [...formik.values.rows, { id: '', note: '' }],
    });
  };

  // const handleUserSelect = (index, userId) => {
  //   const user = users.find((u) => u.id === parseInt(userId));
  //   const updatedRows = [...formik.values.rows];
  //   updatedRows[index] = { id: user.id, note: '', reason: user.reason };
  //   formik.setValues({ rows: updatedRows });
  // };

  const handleView = (row) => {
    const user = users.find((u) => u.id === row.id);
    setSelectedUser({ ...user, note: row.note });
    setIsModalOpen(true);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = formik.values.rows.filter((_, i) => i !== index);
    formik.setValues({ rows: updatedRows });
  };
  const options = users.map(user => ({
    value: user.id,
    label: `${user.name} - ${user.employeeNumber}`
  }));
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-4 flex flex-col items-center`}>
      <div className="container mx-auto p-4 text-white min-h-screen">
        <div className="header flex justify-between">
          <h1 className="md:text-3xl font-bold mb-6 text-blue-400">İşçi Məlumatları</h1>
          <div className="right-sec flex">
            <button onClick={toggleTheme} className="text-white px-4 py-2 rounded-lg transition duration-300">
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            <button
              onClick={handleAddRow}
              className="bg-blue-500 sm:px-6 md:py-3 rounded-lg text-white hover:bg-blue-600 duration-300 ease-in w-24 h-9 sm:w-32 md:h-12"
            >
              Əlavə Et
            </button>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="employee-data bg-white p-4 rounded-lg shadow-lg">
          <table className={`w-full rounded-lg text-sm ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <thead>
              <tr className={`rounded-lg ${theme === 'light' ? 'text-gray-300 ' : 'text-slate-500 bg-gray-200'}` }>
                <th className="p-2">Sıra</th>
                <th className="p-2">İşçi</th>
                <th className="p-2">Xüsusi Qeyd</th>
                <th className="p-2">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {formik.values.rows.map((row, index) => (
                <tr key={index} className={`${theme === 'light' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <td className="p-2 text-center font-semibold ">{index + 1}</td>
                  <td className='max-w-44'>
                  <Select
  options={options}
  isSearchable
  placeholder="İşçilər..."
  onChange={(selectedOption) => {
    const selectedUser = users.find(u => u.id === selectedOption.value);
    const updatedRows = [...formik.values.rows];
    updatedRows[index] = { 
      id: selectedUser.id, 
      note: "", 
      reason: selectedUser.reason 
    };
    formik.setValues({ rows: updatedRows });
  }}
  classNamePrefix="custom-select"
  styles={{
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === 'light' ? '#374151' : '#E5E7EB', 
      color: theme === 'light' ? '#FFFFFF' : '#000000',
      height: '48px',
      borderRadius: '6px',
      border: 'none',
      boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'light' ? '#FFFFFF' : '#000000',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'light' ? '#4B5563' : '#F3F4F6',
      overflow: 'hidden', 
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto', 
      scrollbarWidth: 'none', 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? theme === 'light'
          ? '#6B7280'
          : '#D1D5DB'
        : 'transparent',
      color: theme === 'light' ? '#FFFFFF' : '#000000',
    }),
  }}
/>

</td>

                  <td className="p-2 text-center">
                    <input
                      type="text"
                      name={`rows[${index}].note`}
                      value={row.note}
                      onChange={formik.handleChange}
                      className={`p-1 rounded-md w-full border-none h-12 ${
                        theme === 'light' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
                      }`}
                      placeholder="Xüsusi qeyd"
                    />
                    {formik.errors.rows?.[index]?.note && (
                      <div className="text-red-500 text-xs mt-1">{formik.errors.rows[index].note}</div>
                    )}
                  </td>
                  <td className="p-2 text-center flex flex-col md:flex-row md:justify-center">
                    <button
                    key="blur"                  
                      type="button"
                      onClick={() => handleView(row)}
                      className={`py-[2px] md:py-2 px-3 rounded-md mb-1 md:mb-0 md:mr-2 ${
                        theme === 'dark' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400 hover:bg-green-500'
                      }`}
                    >
                      Baxış
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      className={`py-[2px] md:py-2 px-3 rounded-md ${
                        theme === 'dark' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 hover:bg-red-500'
                      }`}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </form>

        <UserModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedUser={selectedUser}
      />
      </div>
    </div>
  );
}
