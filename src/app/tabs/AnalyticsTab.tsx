'use client'

import React, { useEffect, useState } from "react";

export default function AnalyticsTab() {
  const [analytics, setAnalytics] = useState({ visits: 0, subscriptions: 0, pageViews: 0 });

  useEffect(() => {
    setAnalytics({ visits: 4521, subscriptions: 128, pageViews: 17832 });
  }, []);

  const StatCard = ({ title, value }) => (
    <div className="bg-[#b5b8d8] rounded-2xl shadow p-4 flex flex-col gap-1">
      <div className="text-sm font-medium text-[#111827]">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <h3 className="font-medium mb-3">Traffic Overview (mock)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-[#111827] mb-2">Top Pages</div>
            <ul className="divide-y">
              <li className="py-2 flex justify-between">Home <span>7,200</span></li>
              <li className="py-2 flex justify-between">Book: Morning Prayer <span>320</span></li>
            </ul>
          </div>

          <div>
            <div className="text-sm text-[#111827] mb-2">Traffic Sources</div>
            <ul className="divide-y">
              <li className="py-2 flex justify-between">Organic <span>62%</span></li>
              <li className="py-2 flex justify-between">Direct <span>23%</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#6b7280] rounded-2xl p-4 shadow">
        <h3 className="font-medium mb-3">Subscription Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Active Subs" value={analytics.subscriptions} />
          <StatCard title="Conversion (est)" value="2.8%" />
          <StatCard title="MRR (est)" value="$1,280" />
        </div>
      </div>
    </section>
  )
}
