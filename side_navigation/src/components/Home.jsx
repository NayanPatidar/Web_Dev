import React, { useState } from "react";

function NavBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div className={`${open ? 'w-72' : 'w-20'} duration-300 bg-black h-screen text-white relative`}>
        <img
          src="./public/assets/control.png"
          className={` absolute cursor-pointer rounded-3xl -right-6 top-9 border-2 border-white ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className=" text-2xl text-gray-900 font-semibold flex-1 m-10">
        REACT TAILWIND
      </div>
    </div>
  );
}

export default NavBar;
