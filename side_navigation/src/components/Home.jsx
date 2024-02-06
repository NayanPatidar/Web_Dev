import React, { useState } from "react";

function NavBar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 bg-black h-screen pt-3 text-white relative`}
      >
        <img
          src="./public/assets/control.png"
          className={` absolute cursor-pointer rounded-full -right-3 top-10 border-2 w-7 border-black ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className=" flex gap-x-4 p-5 items-center">
          <img
            src="/public/assets/logo.png"
            className={` cursor-pointer duration-500`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>

        <ul className="p-5">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className=" text-sm flex items-center g-x-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md"
            >
              <img src={`/public/assets/${menu.src}.png`} />
              <span className={`${!open && "hidden" } origin-center duration-200 ml-2`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className=" text-2xl text-gray-900 font-semibold flex-1 m-10">
        REACT TAILWIND
      </div>
    </div>
  );
}

export default NavBar;
