import { Menu, LogOut } from "lucide-react";
import React, { useContext } from "react";
import { MainContext } from "../Maincontext/Context";

function Navbar() {
    const {sidebarOpen, setSidebarOpen} = useContext(MainContext)
  return (
    <div className="bg-white w-full h-12 flex sm:hidden justify-between items-center px-4 shadow">
      {/* Menu Button */}
     {
        sidebarOpen ? <button className="text-3xl" onClick={()=>{setSidebarOpen(false)}}>X</button> :  <button onClick={()=>{setSidebarOpen(true)}}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
     }

      {/* Logout Button */}
      <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-2xl text-sm">
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}

export default Navbar;
