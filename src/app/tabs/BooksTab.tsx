// 'use client'

// import React, { useEffect, useState } from "react";

// export default function BooksTab() {
//   const emptyBook = { id: null, title: "", author: "", summary: "", coverFile: null, coverPreview: null };
//   const [books, setBooks] = useState<any[]>([]);


//   const [editingBook, setEditingBook] = useState(emptyBook);
//   const [showBookModal, setShowBookModal] = useState(false);
//   const API_BASE_URL = "http://localhost:4000/api/books";


//   function openCreateBook() {
//     setEditingBook(emptyBook);
//     setShowBookModal(true);
//   }

//   function openEditBook(book) {
//     setEditingBook({ ...book, coverFile: null, coverPreview: book.coverPreview || null });
//     setShowBookModal(true);
//   }

//   function handleBookFileChange(e) {
//     const file = e.target.files?.[0] || null;
//     if (!file) return;
//     const preview = URL.createObjectURL(file);
//     setEditingBook((s) => ({ ...s, coverFile: file, coverPreview: preview }));
//   }

//   // function saveBook() {
//   //   if (editingBook.id) {
//   //     setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? { ...b, ...editingBook } : b)));
//   //   } else {
//   //     const id = Math.max(0, ...books.map((b) => b.id)) + 1;
//   //     setBooks((prev) => [{ ...editingBook, id }, ...prev]);
//   //   }
//   //   setShowBookModal(false);
//   // }

//   // async function saveBook() {
//   //     const formData = new FormData();
//   //     formData.append("title", editingBook.title);
//   //     formData.append("author", editingBook.author);
//   //     formData.append("summary", editingBook.summary);
//   //     if (editingBook.coverFile) {
//   //       formData.append("cover", editingBook.coverFile);
//   //     }

//   //     const url = editingBook.id
//   //       ? `${API_BASE_URL}/${editingBook.id}`
//   //       : `API_BASE_URL`;

//   //     const method = editingBook.id ? "PUT" : "POST";

//   //     await fetch(url, { method, body: formData });
//   //     fetchBooks();
//   //     setShowBookModal(false);
//   //   }

//   async function saveBook() {
//       const formData = new FormData();
//       formData.append("title", editingBook.title);
//       formData.append("author", editingBook.author);
//       formData.append("summary", editingBook.summary);

//       if (editingBook.coverFile) {
//         formData.append("cover", editingBook.coverFile);
//       }

//       const url = editingBook.id
//         ? `${API_BASE_URL}/${editingBook.id}`
//         : API_BASE_URL;

//       const method = editingBook.id ? "PUT" : "POST";

//       await fetch(url, {
//         method,
//         body: formData,
//       });

//       // ✅ ALWAYS refetch full list
//       await fetchBooks();

//       setShowBookModal(false);
//     }


//   async function fetchBooks() {
//       const res = await fetch(API_BASE_URL);
//       const data = await res.json();
//       // setBooks(data);
//       setBooks(Array.isArray(data) ? data : []);
//     }

//     useEffect(() => {
//       fetchBooks();
//     }, []);
  

//   // function deleteBook(id) {
//   //   if (!confirm("Delete this book?")) return;
//   //   setBooks((prev) => prev.filter((b) => b.id !== id));
//   // }

//   async function deleteBook(id) {
//       if (!confirm("Delete this book?")) return;

//       await fetch(`${API_BASE_URL}/${id}`, {
//         method: "DELETE",
//       });

//       fetchBooks();
//     }


//   return (
//     <section className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Books</h2>
//         <button onClick={openCreateBook} className="px-3 py-2 bg-green-600 text-white rounded">New Book</button>
//       </div>

//       <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-xs text-[#111827]">
//               <th className="py-2">Title</th>
//               <th>Author</th>
//               <th>Views</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((b) => (
//               <tr key={b.id} className="border-t">
//                 <td className="py-3">{b.title}</td>
//                 <td>{b.author}</td>
//                 <td>{b.views || 0}</td>
//                 <td className="text-right">
//                   <button onClick={() => openEditBook(b)} className="px-2 py-1 mr-2 bg-[#efe444] rounded">Edit</button>
//                   <button onClick={() => deleteBook(b.id)} className="px-2 py-1 bg-[#ef4444] rounded">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showBookModal && (
//         <div className="fixed inset-0 bg-black/30 flex items-start justify-center p-6">
//           <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">{editingBook.id ? 'Edit Book' : 'New Book'}</h3>
//               <button onClick={() => setShowBookModal(false)} className="text-gray-500">Close</button>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Title</label>
//                 <input value={editingBook.title} onChange={(e) => setEditingBook(s => ({ ...s, title: e.target.value }))} className="mt-1 p-2 border rounded w-full" />

//                 <label className="block text-sm font-medium text-gray-700 mt-3">Author</label>
//                 <input value={editingBook.author} onChange={(e) => setEditingBook(s => ({ ...s, author: e.target.value }))} className="mt-1 p-2 border rounded w-full" />

//                 <label className="block text-sm font-medium text-gray-700 mt-3">Summary</label>
//                 <textarea value={editingBook.summary} onChange={(e) => setEditingBook(s => ({ ...s, summary: e.target.value }))} className="mt-1 p-2 border rounded w-full" rows={4}></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Cover Image</label>
//                 <div className="mt-2">
//                   {editingBook.coverPreview ? (
//                     <img src={editingBook.coverPreview} alt="preview" className="w-40 h-56 object-cover rounded" />
//                   ) : (
//                     <div className="w-40 h-56 bg-gray-100 rounded flex items-center justify-center">No cover</div>
//                   )}
//                 </div>

//                 <input type="file" accept="image/*" onChange={handleBookFileChange} className="mt-3" />

//                 <div className="mt-6 flex gap-2">
//                   <button onClick={saveBook} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
//                   <button onClick={() => setShowBookModal(false)} className="px-3 py-2 bg-gray-100 rounded">Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


'use client'

import React, { useEffect, useState } from "react";

interface Book {
  _id?: string;
  title: string;
  author: string;
  summary: string;
  coverImage?: string;
  views?: number;
  isFeatured?: boolean;
}

interface EditingBook extends Book {
  coverFile: File | null;
  coverPreview: string | null;
}

export default function BooksTab() {
  const emptyBook: EditingBook = { 
    title: "", 
    author: "", 
    summary: "", 
    coverFile: null, 
    coverPreview: null 
  };
  
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<EditingBook>(emptyBook);
  const [showBookModal, setShowBookModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const API_BASE_URL = "http://localhost:4000/api/books";

  // Fetch all books
  async function fetchBooks() {
    try {
      setError(null);
      const res = await fetch(API_BASE_URL);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch books: ${res.statusText}`);
      }
      
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch books");
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  function openCreateBook() {
    setEditingBook(emptyBook);
    setShowBookModal(true);
  }

  function openEditBook(book: Book) {
    setEditingBook({ 
      ...book, 
      coverFile: null, 
      coverPreview: book.coverImage || null 
    });
    setShowBookModal(true);
  }

  function handleBookFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    
    const preview = URL.createObjectURL(file);
    setEditingBook((prev) => ({ 
      ...prev, 
      coverFile: file, 
      coverPreview: preview 
    }));
  }

  async function saveBook() {
    if (!editingBook.title.trim()) {
      alert("Title is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", editingBook.title);
      formData.append("author", editingBook.author);
      formData.append("summary", editingBook.summary);
      
      if (editingBook.isFeatured !== undefined) {
        formData.append("isFeatured", String(editingBook.isFeatured));
      }

      // Only append cover if a new file was selected
      if (editingBook.coverFile) {
        formData.append("cover", editingBook.coverFile);
      }

      const url = editingBook._id
        ? `${API_BASE_URL}/${editingBook._id}`
        : API_BASE_URL;

      const method = editingBook._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to save book: ${res.statusText}`);
      }

      await fetchBooks();
      setShowBookModal(false);
      setEditingBook(emptyBook);
    } catch (err) {
      console.error("Error saving book:", err);
      setError(err instanceof Error ? err.message : "Failed to save book");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(id: string) {
    if (!confirm("Delete this book?")) return;

    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete book: ${res.statusText}`);
      }

      await fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
      setError(err instanceof Error ? err.message : "Failed to delete book");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Books</h2>
        <button 
          onClick={openCreateBook} 
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          New Book
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-[#111827]">
              <th className="py-2">Cover</th>
              <th className="py-2">Title</th>
              <th>Author</th>
              <th>Views</th>
              <th>Featured</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="py-3">
                  {b.coverImage ? (
                    <img 
                      src={b.coverImage} 
                      alt={b.title} 
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-400 rounded flex items-center justify-center text-xs text-white">
                      No cover
                    </div>
                  )}
                </td>
                <td className="py-3 font-medium">{b.title}</td>
                <td>{b.author || '—'}</td>
                <td>{b.views || 0}</td>
                <td>
                  {b.isFeatured && (
                    <span className="inline-block px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded">
                      ★ Featured
                    </span>
                  )}
                </td>
                <td className="text-right">
                  <button 
                    onClick={() => openEditBook(b)} 
                    className="px-2 py-1 mr-2 bg-[#efe444] rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteBook(b._id!)} 
                    className="px-2 py-1 bg-[#ef4444] text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No books yet. Click "New Book" to add one.
          </div>
        )}
      </div>

      {showBookModal && (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingBook._id ? 'Edit Book' : 'New Book'}
              </h3>
              <button 
                onClick={() => setShowBookModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Close
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input 
                  value={editingBook.title} 
                  onChange={(e) => setEditingBook(prev => ({ ...prev, title: e.target.value }))} 
                  className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter book title"
                />

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Author
                </label>
                <input 
                  value={editingBook.author} 
                  onChange={(e) => setEditingBook(prev => ({ ...prev, author: e.target.value }))} 
                  className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter author name"
                />

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Summary
                </label>
                <textarea 
                  value={editingBook.summary} 
                  onChange={(e) => setEditingBook(prev => ({ ...prev, summary: e.target.value }))} 
                  className="mt-1 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" 
                  rows={4}
                  placeholder="Enter book summary"
                />

                <label className="flex items-center mt-3">
                  <input 
                    type="checkbox" 
                    checked={editingBook.isFeatured || false}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="mr-2 w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured Book
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <div className="mt-2">
                  {editingBook.coverPreview ? (
                    <img 
                      src={editingBook.coverPreview} 
                      alt="preview" 
                      className="w-40 h-56 object-cover rounded shadow-md" 
                    />
                  ) : (
                    <div className="w-40 h-56 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      No cover
                    </div>
                  )}
                </div>

                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleBookFileChange} 
                  className="mt-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                />

                <div className="mt-6 flex gap-2">
                  <button 
                    onClick={saveBook} 
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={() => setShowBookModal(false)} 
                    className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}