import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerAPI } from '../services/api';

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    registerAPI({ name: form.name.trim(), email: form.email.trim(), password: form.password })
      .then(() => {
        toast.success('Account created successfully!');
        navigate('/tasks');
      })
      .catch((err) => {
        const message = err.response?.data?.message || err.message || 'Registration failed';
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#eef2ff_0%,#f0f9ff_50%,#f8fafc_100%)] bg-fixed">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-10 md:gap-20">
        <div className="w-full max-w-[420px] flex-shrink-0 order-2 md:order-1">
          <div className="bg-white/95 border border-gray-200 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Create account
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Join Task Manager to get started
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                        ${errors.name ? 'border-red-400' : 'border-gray-200'} `}
                    />
                  </div>

                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                        ${errors.email ? 'border-red-400' : 'border-gray-200'} `}
                    />
                  </div>

                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                        ${errors.password ? 'border-red-400' : 'border-gray-200'} `}
                    />
                  </div>

                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                        ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'} `}
                    />
                  </div>
                  
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-lg bg-indigo-500 text-white font-medium transition-colors hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>
            </div>

            <div className="px-8 py-4 border-t border-gray-200 bg-gray-50/80">
              <p className="text-center text-sm text-gray-600">
                Already have an account? {' '}
                <Link to="/login" className="font-medium text-indigo-500 hover:text-indigo-600">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center flex-1 min-w-0 md:max-w-[620px] order-1 md:order-2">
          <Link to="/">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg mb-6">
              <CheckSquare size={40} />
            </div>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Task Manager
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-[400px] md:max-w-full">
            Organize your daily tasks and get more done with a simple and focused workflow.
          </p>
        </div>
      </div>
    </div>
  );
}