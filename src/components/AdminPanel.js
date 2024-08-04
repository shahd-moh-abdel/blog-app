import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AdminPanel({ db, user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  //this need to be changed :)
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (
        user &&
        ["shahd.mohammed.abdel@gmail.com", "admin2@example.com"].includes(
          user.email
        )
      ) {
        setIsAdmin(true);
      }
    };
    checkAdminStatus();
  }, [user, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      alert("You do not have permission to add posts.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author: user.displayName,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      alert("Post added successfully!");
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("Error adding post. Please try again.");
    }
  };

  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPanel;
