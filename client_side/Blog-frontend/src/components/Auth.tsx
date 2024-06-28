import { signinInput, signupInput } from '@vickikhan/common';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://127.0.0.1:8787/api/v1/user';

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
}

function LabelledInput({ label, placeholder, onChange, type = 'text', value }: LabelledInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let data;
      if (isSignUp) {
        data = signupInput.parse({ email, password, name });
      } else {
        data = signinInput.parse({ email, password });
      }

      const response = await axios.post(`${BACKEND_URL}/${isSignUp ? 'signup' : 'signin'}`, data);
      console.log("API Response:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token stored:", response.data.token);
        Navigate("/blogs");
      } else {
        throw new Error("No token received from the server");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred during authentication.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create an account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <LabelledInput
              label="Full Name"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          )}
          <LabelledInput
            label="Email Address"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
          <LabelledInput
            label="Password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;