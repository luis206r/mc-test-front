import React from "react";
import { MdErrorOutline } from "react-icons/md";

const UnauthorizedPage = () => {
  return (
    <div className="flex h-[80%] items-center flex-col justify-center">
      <MdErrorOutline className="w-[100px] h-[100px]" />
      <h1>Ruta no autorizada</h1>
    </div>
  );
};

export default UnauthorizedPage;
