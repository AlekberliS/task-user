import bgImg from '../assets/bgimg.jpg';
const InputFieldWithError = ({ formik, name, placeholder, type = "text" }) => (
    <div className="mb-4" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full p-2 border rounded"
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-sm">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
  
  export default InputFieldWithError;
  