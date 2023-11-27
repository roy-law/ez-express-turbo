import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface BackToHeaderProps {
  href?: string;
  title?: string;
}

export const BackToHeader = ({ href, title }: BackToHeaderProps) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (href ? navigate(href) : navigate(-1))}
      className="md:flex md:items-center md:justify-between px-8 py-10"
    >
      <ArrowLeftIcon
        className="h-8 w-8 text-gray-900 pr-2"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <h2 className="text-base leading-7 text-gray-900">
          {href ? title : "Go back"}
        </h2>
      </div>
    </button>
  );
};
