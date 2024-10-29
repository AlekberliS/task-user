import { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Ensure db is imported from your Firebase config
import { doc, getDoc } from "firebase/firestore";
import bgImg from '../assets/bgimg.jpg';
function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser; // Get the current authenticated user

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = doc(db, "users", user.uid); // Reference to user document
                const docSnap = await getDoc(userDoc); // Fetch document

                if (docSnap.exists()) {
                    setUserData(docSnap.data()); // Set user data from the document
                } else {
                    console.log("No such document!");
                }
            }
            setLoading(false); // Stop loading after fetching
        };

        fetchUserData(); // Call the function to fetch data
    }, [user]);

    if (loading) return <div className="text-center">Loading...</div>; // Show loading state

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-3xl font-semibold text-blue-600 mb-4 text-center">{userData.name}'s Profile</h2>
                <div className="text-gray-700 mb-2">
                    <p className="font-medium">Email: <span className="font-light">{userData.email}</span></p>
                    <p className="font-medium">Phone: <span className="font-light">{userData.telephone}</span></p>
                    {/* Add additional user info as required */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
