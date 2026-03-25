import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[linear-gradient(135deg,#eef2ff_0%,#f0f9ff_50%,#f8fafc_100%)] bg-fixed">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-500 text-white mb-6 shadow-lg">
          <CheckSquare size={40} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          Task Manager
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
          Organize your daily tasks and get more done with a simple and focused workflow.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-indigo-300 transition-colors"
            to="/login"
          >
            Sign in
          </Link>

          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium shadow-md hover:bg-indigo-600 transition-colors"
            to="/register"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}