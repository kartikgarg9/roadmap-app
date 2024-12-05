import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { BG_URL } from "../utils/constants";

// TypeScript types for the state and refs
interface FirebaseError {
    code: string;
}

const Login: React.FC = () => {
    const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate(); // Hook to navigate after sign-in or sign-up

    // Refs with types
    const name = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = async () => {
        if (email.current && password.current) {
            const message = checkValidData(email.current.value, password.current.value);
            setErrorMessage(message);

            if (message) return;

            try {
                if (!isSignInForm) {
                    // Sign Up
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        email.current.value,
                        password.current.value
                    );
                    const user = userCredential.user;
                    if (name.current) {
                        await updateProfile(user, {
                            displayName: name.current.value,
                        });
                    }
                    navigate("/home");  // Redirect to home or dashboard after sign-up
                } else {
                    // Sign In
                    await signInWithEmailAndPassword(
                        auth,
                        email.current.value,
                        password.current.value
                    );
                    navigate("/home");  // Redirect to home or dashboard after sign-in
                }
            } catch (error) {
                console.error("Firebase Error: ", error);

                let errorMessage;

                // Typecast error as FirebaseError
                const firebaseError = error as FirebaseError;

                switch (firebaseError.code) {
                    case "auth/invalid-email":
                        errorMessage =
                            "The email address is not valid. Please enter a valid email address.";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "Account not found. Please sign up first.";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "Incorrect password. Please try again.";
                        break;
                    case "auth/invalid-credential":
                        errorMessage = "Invalid credentials. Please check your input.";
                        break;
                    case "auth/too-many-requests":
                        errorMessage = "Too many requests. Please try again later.";
                        break;
                    default:
                        errorMessage = "Sign In failed. Please try again.";
                        break;
                }

                setErrorMessage(errorMessage);
            }
        }
    };

    return (
        <div className="relative h-screen">
            <img
                className="absolute inset-0 h-full w-full object-cover"
                src={BG_URL}  // Add your background image URL here
                alt="Background"
            />
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-black bg-opacity-80 p-8 rounded-lg text-white">
                <h1 className="font-bold text-3xl py-4 text-center">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-4 my-4 bg-gray-700 rounded-md"
                    />
                )}
                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 my-4 bg-gray-700 rounded-md"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 my-4 bg-gray-700 rounded-md"
                />
                {errorMessage && (
                    <p className="text-red-500 text-center text-sm">{errorMessage}</p>
                )}
                <button
                    onClick={handleButtonClick}
                    className="w-full py-2 my-4 bg-red-700 rounded-lg hover:bg-red-600"
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className="py-4 text-center cursor-pointer text-sm"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm
                        ? "New to Roadmap.ai? Sign Up Now"
                        : "Already registered? Sign In Now"}
                </p>
            </div>
        </div>
    );
};

export default Login;
