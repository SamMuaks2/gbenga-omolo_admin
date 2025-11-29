import React, { useEffect, useState } from "react";

export default function DashboardTab() {
  const [analytics, setAnalytics] = useState({ visits: 0, subscriptions: 0, pageViews: 0 });
  const [books, setBooks] = useState([]);
  const [devotionals, setDevotionals] = useState([]);
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    setBooks([
      { id: 1, title: "Morning Prayer", author: "Author A", views: 320 },
      { id: 2, title: "Evening Devotion", author: "Author B", views: 210 },
    ]);
    setDevotionals([
      { id: 1, title: "Day 1 - Hope", type: "daily", views: 120 },
      { id: 2, title: "Week 1 - Trust", type: "weekly", views: 80 },
    ]);
    setAnalytics({ visits: 4521, subscriptions: 128, pageViews: 17832 });
    setUserActivity([
      { id: 1, user: "Jane", action: "Viewed Book: Morning Prayer", time: "2025-11-25 10:12" },
      { id: 2, user: "Tom", action: "Subscribed", time: "2025-11-25 09:55" },
    ]);
  }, []);

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-1 hover:shadow-lg transition">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    </div>
  );

  return (
    <section className="space-y-6">
      {/* Analytics Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Site Visits" value={analytics.visits} />
        <StatCard title="Subscriptions" value={analytics.subscriptions} />
        <StatCard title="Page Views" value={analytics.pageViews} />
      </div>

      {/* Most Viewed */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Most Viewed (Books & Devotionals)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Books */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Books</h3>
            <ul className="divide-y divide-gray-200">
              {books.map(b => (
                <li key={b.id} className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition">
                  <div>
                    <div className="font-medium text-gray-800">{b.title}</div>
                    <div className="text-xs text-gray-400">{b.author}</div>
                  </div>
                  <div className="text-sm text-gray-500">{b.views || 0} views</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Devotionals */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Devotionals</h3>
            <ul className="divide-y divide-gray-200">
              {devotionals.map(d => (
                <li key={d.id} className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition">
                  <div>
                    <div className="font-medium text-gray-800">{d.title}</div>
                    <div className="text-xs text-gray-400">{d.type}</div>
                  </div>
                  <div className="text-sm text-gray-500">{d.views || 0} views</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Recent User Activity</h2>
        <ul className="divide-y divide-gray-200">
          {userActivity.map(u => (
            <li key={u.id} className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition">
              <div className="text-gray-700">{u.user} — {u.action}</div>
              <div className="text-xs text-gray-400">{u.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
