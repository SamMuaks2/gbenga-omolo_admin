'use client'

import React, { useState } from "react";

export default function DevotionalsTab() {
  const [devotionals, setDevotionals] = useState([
    { id: 1, title: "Day 1 - Hope", type: "daily", views: 120 },
    { id: 2, title: "Week 1 - Trust", type: "weekly", views: 80 },
  ]);

  function createDevotional(payload) {
    const id = Math.max(0, ...devotionals.map((d) => d.id)) + 1;
    setDevotionals((p) => [{ id, ...payload }, ...p]);
  }

  function deleteDevotional(id) {
    setDevotionals((p) => p.filter((d) => d.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Devotionals</h2>
        <DevotionalCreator onCreate={createDevotional} />
      </div>

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <ul className="divide-y">
          {devotionals.map((d) => (
            <li key={d.id} className="py-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{d.title}</div>
                <div className="text-xs text-[#111827]">{d.type}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-[#efe444] rounded">Edit</button>
                <button onClick={() => deleteDevotional(d.id)} className="px-2 py-1 bg-[#ef4444] rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function DevotionalCreator({ onCreate }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");

  function submit() {
    if (!title) return alert('Provide a title');
    onCreate({ title, type, views: 0 });
    setTitle("");
  }

  return (
    <div className="flex items-center gap-2">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New devotional title" className="p-2 border rounded" />
      <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button onClick={submit} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
    </div>
  );
}
