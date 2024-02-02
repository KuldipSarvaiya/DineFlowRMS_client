import React from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="border-x-4 border-y-4 rounded-md border-red-500 p-8 absolute top-1/2 left-1/2 font-sans capitalize -translate-y-1/2 -translate-x-1/2 flex flex-col gap-3 min-w-[400px]">
      <h2 className="text-left text-green-500">DineFlow : RMS</h2>
      <div className="font-bold text-3xl text-red-500">404 | page not found</div>
      <div
        className="text-left cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        <ArrowBackSharpIcon />
        go back to <span className="underline text-blue-500"> home</span>
      </div>
    </div>
  );
}

export default NotFound;
