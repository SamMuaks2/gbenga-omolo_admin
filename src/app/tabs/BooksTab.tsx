'use client'

import React, { useEffect, useState } from "react";

export default function BooksTab() {
  const emptyBook = { id: null, title: "", author: "", summary: "", coverFile: null, coverPreview: null };
  const [books, setBooks] = useState<any[]>([]);


  const [editingBook, setEditingBook] = useState(emptyBook);
  const [showBookModal, setShowBookModal] = useState(false);
  const API_BASE_URL = "http://localhost:4000/api/books";


  function openCreateBook() {
    setEditingBook(emptyBook);
    setShowBookModal(true);
  }

  function openEditBook(book) {
    setEditingBook({ ...book, coverFile: null, coverPreview: book.coverPreview || null });
    setShowBookModal(true);
  }

  function handleBookFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setEditingBook((s) => ({ ...s, coverFile: file, coverPreview: preview }));
  }

  // function saveBook() {
  //   if (editingBook.id) {
  //     setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? { ...b, ...editingBook } : b)));
  //   } else {
  //     const id = Math.max(0, ...books.map((b) => b.id)) + 1;
  //     setBooks((prev) => [{ ...editingBook, id }, ...prev]);
  //   }
  //   setShowBookModal(false);
  // }

  // async function saveBook() {
  //     const formData = new FormData();
  //     formData.append("title", editingBook.title);
  //     formData.append("author", editingBook.author);
  //     formData.append("summary", editingBook.summary);
  //     if (editingBook.coverFile) {
  //       formData.append("cover", editingBook.coverFile);
  //     }

  //     const url = editingBook.id
  //       ? `${API_BASE_URL}/${editingBook.id}`
  //       : `API_BASE_URL`;

  //     const method = editingBook.id ? "PUT" : "POST";

  //     await fetch(url, { method, body: formData });
  //     fetchBooks();
  //     setShowBookModal(false);
  //   }

  async function saveBook() {
      const formData = new FormData();
      formData.append("title", editingBook.title);
      formData.append("author", editingBook.author);
      formData.append("summary", editingBook.summary);

      if (editingBook.coverFile) {
        formData.append("cover", editingBook.coverFile);
      }

      const url = editingBook.id
        ? `${API_BASE_URL}/${editingBook.id}`
        : API_BASE_URL;

      const method = editingBook.id ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: formData,
      });

      // ✅ ALWAYS refetch full list
      await fetchBooks();

      setShowBookModal(false);
    }


  async function fetchBooks() {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      // setBooks(data);
      setBooks(Array.isArray(data) ? data : []);
    }

    useEffect(() => {
      fetchBooks();
    }, []);
  

  // function deleteBook(id) {
  //   if (!confirm("Delete this book?")) return;
  //   setBooks((prev) => prev.filter((b) => b.id !== id));
  // }

  async function deleteBook(id) {
      if (!confirm("Delete this book?")) return;

      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      fetchBooks();
    }


  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Books</h2>
        <button onClick={openCreateBook} className="px-3 py-2 bg-green-600 text-white rounded">New Book</button>
      </div>

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-[#111827]">
              <th className="py-2">Title</th>
              <th>Author</th>
              <th>Views</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="py-3">{b.title}</td>
                <td>{b.author}</td>
                <td>{b.views || 0}</td>
                <td className="text-right">
                  <button onClick={() => openEditBook(b)} className="px-2 py-1 mr-2 bg-[#efe444] rounded">Edit</button>
                  <button onClick={() => deleteBook(b.id)} className="px-2 py-1 bg-[#ef4444] rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showBookModal && (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingBook.id ? 'Edit Book' : 'New Book'}</h3>
              <button onClick={() => setShowBookModal(false)} className="text-gray-500">Close</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input value={editingBook.title} onChange={(e) => setEditingBook(s => ({ ...s, title: e.target.value }))} className="mt-1 p-2 border rounded w-full" />

                <label className="block text-sm font-medium text-gray-700 mt-3">Author</label>
                <input value={editingBook.author} onChange={(e) => setEditingBook(s => ({ ...s, author: e.target.value }))} className="mt-1 p-2 border rounded w-full" />

                <label className="block text-sm font-medium text-gray-700 mt-3">Summary</label>
                <textarea value={editingBook.summary} onChange={(e) => setEditingBook(s => ({ ...s, summary: e.target.value }))} className="mt-1 p-2 border rounded w-full" rows={4}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                <div className="mt-2">
                  {editingBook.coverPreview ? (
                    <img src={editingBook.coverPreview} alt="preview" className="w-40 h-56 object-cover rounded" />
                  ) : (
                    <div className="w-40 h-56 bg-gray-100 rounded flex items-center justify-center">No cover</div>
                  )}
                </div>

                <input type="file" accept="image/*" onChange={handleBookFileChange} className="mt-3" />

                <div className="mt-6 flex gap-2">
                  <button onClick={saveBook} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
                  <button onClick={() => setShowBookModal(false)} className="px-3 py-2 bg-gray-100 rounded">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
