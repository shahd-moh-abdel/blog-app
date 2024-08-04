import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AdminPanel from "./components/AdminPanel";
import BlogPosts from "./components/BlogPosts";
import ReadingMode from "./components/ReadingMode";
import { auth, db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const isAdmin =
    user &&
    ["shahd.mohammed.abdel@gmail.com", "example@example.com"].includes(
      user.email
    );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold">Blog App</h1>
                </Link>
              </div>
              <div className="flex items-center">
                {user && (
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-gray-900 mx-4"
                  >
                    Home
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-gray-900 mx-4"
                  >
                    Admin Panel
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={signOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={signIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BlogPosts db={db} />} />
            <Route path="/read/:postId" element={<ReadingMode db={db} />} />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPanel db={db} user={user} />
                ) : (
                  <p>Access denied.</p>
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
