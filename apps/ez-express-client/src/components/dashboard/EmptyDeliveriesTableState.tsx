import { useNavigate } from "react-router-dom";

export const EmptyDeliveriesTableState = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/parcel/form-new")}
      className="mt-12 relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="mx-auto h-12 w-12 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>

      <span className="mt-2 block text-sm font-semibold text-gray-900">
        + New parcel
      </span>
    </button>
  );
};
