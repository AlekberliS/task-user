import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select'; // Install react-select for dropdowns
import Flag from 'react-world-flags'; // Install react-world-flags for flag icons
import bgImg from '../assets/bgimg.jpg';
const countryOptions = [
    { value: "+994", label: <><Flag code="AZ" /> +994</>, code: 'AZ' },
    { value: "+90", label: <><Flag code="TR" /> +90</>, code: 'TR' },
    { value: "+1", label: <><Flag code="US" /> +1</>, code: 'US' },
    { value: "+7", label: <><Flag code="RU" /> +7</>, code: 'RU' },
    // Add more countries as needed
];

const Register = () => {
    const navigate = useNavigate();
    const [countryCode, setCountryCode] = useState(countryOptions[0].value);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        email: Yup.string()
            .email("Invalid email address")
            .matches(/\.(org|ru|com)$/, "Email must end with .org, .ru, or .com")
            .required("Email is required"),
        telephone: Yup.string()
            .matches(/^[0-9]{9}$/, "Telephone must be a 9-digit number")
            .required("Telephone number is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            telephone: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    telephone: `${countryCode}${values.telephone}`,
                });

                navigate("/dashboard");
            } catch (error) {
                console.error("Error during registration:", error);
                alert(error.message);
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
            <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={`border rounded p-2 mb-3 w-full ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm">{formik.errors.name}</div> : null}

                <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                    className={`border rounded p-2 mb-3 w-full ${formik.touched.surname && formik.errors.surname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.surname && formik.errors.surname ? <div className="text-red-500 text-sm">{formik.errors.surname}</div> : null}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`border rounded p-2 mb-3 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}

                <div className="flex mb-3">
                    <Select
                        options={countryOptions}
                        defaultValue={countryOptions[0]}
                        onChange={(option) => setCountryCode(option.value)}
                        className="w-2/5 mr-2"
                    />
                    <input
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telephone}
                        className={`border rounded p-2 w-full ${formik.touched.telephone && formik.errors.telephone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                </div>
                {formik.touched.telephone && formik.errors.telephone ? <div className="text-red-500 text-sm mb-3">{formik.errors.telephone}</div> : null}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`border rounded p-2 mb-4 w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}

                <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                >
                    Register
                </button>
                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link to="/" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
