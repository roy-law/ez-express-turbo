const stats = [
  { name: "Total Deliveries", stat: "71,897" },
  { name: "Avg. Open Rate", stat: "58.16%" },
  { name: "Avg. Click Rate", stat: "24.57%" },
];

export const DashboardStats = () => {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.name}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            {item.name}
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {item.stat}
          </dd>
        </div>
      ))}
    </dl>
  );
};
