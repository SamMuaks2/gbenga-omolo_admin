'use client'

import React, { useState } from "react";

export default function BlogsTab() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Writing Tips", author: "Admin" },
    { id: 2, title: "Publishing 101", author: "Admin" },
  ]);

  function createBlog(payload) {
    const id = Math.max(0, ...blogs.map((b) => b.id)) + 1;
    setBlogs((p) => [{ id, ...payload }, ...p]);
  }

  function deleteBlog(id) {
    setBlogs((p) => p.filter((b) => b.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Articles</h2>
        <BlogCreator onCreate={createBlog} />
      </div>

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <ul className="divide-y">
          {blogs.map((b) => (
            <li key={b.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{b.title}</div>
                <div className="text-xs text-[#111827]">{b.author}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-[#efe444] rounded">Edit</button>
                <button onClick={() => deleteBlog(b.id)} className="px-2 py-1 bg-[#ef4444] rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BlogCreator({ onCreate }) {
  const [title, setTitle] = useState('');

  function submit() {
    if (!title) return alert('Provide title');
    onCreate({ title, author: 'Admin' });
    setTitle('');
  }

  return (
    <div className="flex items-center gap-2">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New blog article title" className="p-2 border rounded" />
      <button onClick={submit} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
    </div>
  )
}
