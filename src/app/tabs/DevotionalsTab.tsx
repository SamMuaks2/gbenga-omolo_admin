// 'use client'

// import React, { useEffect, useState } from "react";

// export default function DevotionalsTab() {
//   const [devotionals, setDevotionals] = useState([]);
//   //   { id: 1, title: "Day 1 - Hope", type: "daily", views: 120 },
//   //   { id: 2, title: "Week 1 - Trust", type: "weekly", views: 80 },
//   // ]);

//   const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

//   async function fetchDevotionals() {
//     const res = await fetch(`${API}/api/devotionals`);
//     setDevotionals(await res.json());
//   }

//   function DevotionalCreator({ onCreate }) {
//     const [title, setTitle] = useState("");
//     const [type, setType] = useState("daily");
//     const [cover, setCover] = useState<File | null>(null);
//     const [file, setFile] = useState<File | null>(null);

//     function submit() {
//       if (!title || !file) return alert("Title and devotional file required");

//       const form = new FormData();
//       form.append("title", title);
//       form.append("type", type);
//       if (cover) form.append("cover", cover);
//       if (file) form.append("file", file);

//       onCreate(form);

//       setTitle("");
//       setFile(null);
//       setCover(null);
//     }

//     return (
//       <div className="flex flex-col flex-wrap gap-2">
//         <h2 className="text-xl font-semibold">Add new devotional</h2>

//         <div className="flex flex-row gap-10">
//           <div className="title flex-col justify-center">
//             <h3>Devotional name:</h3>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               className="p-2 border rounded"
//             />
//           </div>

//           <div className="duration flex-col">
//             <h3>Select period</h3>

//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="p-2 border rounded"
//             >
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="weekly">Monthly</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-row gap-10">
//           <div className="cover flex-col">
//             <label>Cover image</label> 

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setCover(e.target.files?.[0] || null)}
//             />
//           </div>

//           <div className="document flex-col">
//             <h3>Add devotional document</h3>

//             <input
//               type="file"
//               accept=".pdf,.txt,.docx"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//           </div>
//         </div>

        
//         <button
//           onClick={submit}
//           className="px-3 py-2 bg-blue-600 text-white rounded w-[30%] justify-center"
//         >
//           Upload
//         </button>
//       </div>
//     );
//   }


//   // async function createDevotional(payload) {
//   //   await fetch(`${API}/api/devotionals`, {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(payload),
//   //   });

//   //   fetchDevotionals();
//   // }

//   async function createDevotional(formData: FormData) {
//   await fetch(`${API}/api/devotionals`, {
//     method: "POST",
//     body: formData,
//   });

//   fetchDevotionals();
// }


//   async function deleteDevotional(id) {
//     await fetch(`${API}/api/devotionals/${id}`, { method: "DELETE" });
//     fetchDevotionals();
//   }

//   useEffect(() => {
//     fetchDevotionals();
//   }, []);


//   // function createDevotional(payload) {
//   //   const id = Math.max(0, ...devotionals.map((d) => d.id)) + 1;
//   //   setDevotionals((p) => [{ id, ...payload }, ...p]);
//   // }

//   // function deleteDevotional(id) {
//   //   setDevotionals((p) => p.filter((d) => d.id !== id));
//   // }

//   return (
//     <section className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Devotionals</h2>
//         <DevotionalCreator onCreate={createDevotional} />
//       </div>

//       <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
//         <ul className="divide-y">
//           {devotionals.map((d) => (
//             <li key={d.id} className="py-3 flex justify-between items-center">
//               <div>
//                 <div className="font-medium">{d.title}</div>
//                 <div className="text-xs text-[#111827]">{d.type}</div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="px-2 py-1 bg-[#efe444] rounded">Edit</button>
//                 <button onClick={() => deleteDevotional(d.id)} className="px-2 py-1 bg-[#ef4444] rounded">Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   )
// }

// function DevotionalCreator({ onCreate }) {
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("daily");

//   function submit() {
//     if (!title) return alert('Provide a title');
//     onCreate({ title, type, views: 0 });
//     setTitle("");
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New devotional title" className="p-2 border rounded" />
//       <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
//         <option value="daily">Daily</option>
//         <option value="weekly">Weekly</option>
//       </select>
//       <button onClick={submit} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
//     </div>
//   );
// }

'use client'

import React, { useEffect, useState } from "react";

type Devotional = {
  coverImage?: string;
  id: string;
  title: string;
  type: string;
};

export default function DevotionalsTab() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [open, setOpen] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function fetchDevotionals() {
  const res = await fetch(`${API}/api/devotionals`);
  const data = await res.json();

  setDevotionals(
    data.map((item: any) => ({
      id: item._id,
      title: item.title,
      type: item.type,
      coverImage: item.coverImage
        ? item.coverImage.startsWith("http")
          ? item.coverImage
          : `${API}/${item.coverImage}`
        : null,
    }))
  );
}

  async function createDevotional(formData: FormData) {
    await fetch(`${API}/api/devotionals`, {
      method: "POST",
      body: formData,
    });

    setOpen(false);
    fetchDevotionals();
  }

  async function deleteDevotional(id: string) {
    await fetch(`${API}/api/devotionals/${id}`, { method: "DELETE" });
    fetchDevotionals();
  }

  useEffect(() => {
    fetchDevotionals();
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Devotionals</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Devotional
        </button>
      </div>

      {/* List */}
      <div className="bg-[#6b7280] rounded-2xl p-4 shadow overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="text-left text-sm text-white border-b border-white/20">
        <th className="py-3 px-2">Cover</th>
        <th className="py-3 px-2">Title</th>
        <th className="py-3 px-2">Type</th>
        <th className="py-3 px-2 text-right">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-white/20">
      {devotionals.map((d) => (
        <tr key={d.id} className="text-white">
          {/* Cover */}
          <td className="py-3 px-2">
            {d.coverImage ? (
              <img
                src={d.coverImage}
                alt={d.title}
                className="w-12 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-16 bg-gray-400 rounded flex items-center justify-center text-xs">
                No cover
              </div>
            )}
          </td>

          {/* Title */}
          <td className="py-3 px-2">
            <div className="font-medium">{d.title}</div>
          </td>

          {/* Type */}
          <td className="py-3 px-2 text-sm capitalize">
            {d.type}
          </td>

          {/* Actions */}
          <td className="py-3 px-2 text-right">
            <button
              onClick={() => deleteDevotional(d.id)}
              className="px-3 py-1 bg-[#ef4444] rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <DevotionalForm onCreate={createDevotional} onCancel={() => setOpen(false)} />
        </Modal>
      )}
    </section>
  );
}

/* ================= MODAL ================= */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-xl p-6 w-full max-w-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}

/* ================= FORM ================= */

function DevotionalForm({
  onCreate,
  onCancel,
}: {
  onCreate: (data: FormData) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const [cover, setCover] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function submit() {
    if (!title || !file) {
      alert("Title and devotional file are required");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("type", type);
    if (cover) form.append("cover", cover);
    if (file) form.append("file", file);

    onCreate(form);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add New Devotional</h2>

      <div className="flex-row title">
        <label className="text-black">Devotional Title</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Devotional title"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="duration">
        <label className="text-black">Devotional duration</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>



      <div className="flex">
        <div className="cover flex flex-col">
          <label className="text-black">Cover image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
          />
        </div>

        <div className="document flex flex-col">
          <label className="text-black">Add devotional document</label>

          <input
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>


      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 text-white border rounded"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
