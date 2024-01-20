import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  text: string;
}

export const DashboardPageButton = ({ to, text }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      type="button"
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {text}
    </button>
  );
};
