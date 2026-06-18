import { useContext, useState } from "react";
import { ArrowDownCircle, ArrowRightCircle, LogOut, } from "lucide-react";
import { Dumbbell, Users, CalendarCheck, CreditCard, Settings, } from "lucide-react";
import { SidebarConfig } from "./../Config/SidebarConfig";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MainContext } from "../Maincontext/Context";
const iconMap = { gym: Dumbbell, user: Users,  attendance: CalendarCheck, payment: CreditCard, setting: Settings, };




export default function Sidebar() {
  const [openItems, setOpenItems] = useState({});
  const { sidebarOpen, setSidebarOpen, isMobile, setisMobile , user  , logout} = useContext(MainContext)
  // ===========================================================
  const toggleItem = (label) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  console.log(user)



  // =============================================================


  return (
    <aside
      className={`${isMobile
          ? " h-full overflow-hidden z-50  bg-[#0e1424]  transition-transform transform w-full min-w-screen"
          : "w-64 min-h-screen bg-[#0e1424]"
        } p-6 space-y-6 text-gray-300`}
    >
      <h1 className="text-xl font-bold flex items-center gap-2 text-white">
        <Dumbbell className="text-indigo-400" /> FitPro Gym
      </h1>


      <nav className="mt-6 space-y-2">
        {SidebarConfig[user].map((item) => {
          const Icon = iconMap[item.icon] || null;

          return (
            <div key={item.label}>
              {/* Parent Item */}
              <div
                 onClick={() => ! item.children && isMobile && setSidebarOpen(false)} 
                  
                className="flex items-center  justify-between gap-3 p-2 rounded-lg  hover:bg-[#1b2440] cursor-pointer">
                <Link


                  to={item.path}
                  className="flex items-center   gap-2 flex-1"

                >
                  {Icon && <Icon className="text-indigo-400   w-4 h-4" />}
                  <span className="text-sm text-white">{item.label}</span>
                </Link>

                {item.children && (
                  <span
                    className="text-white text-sm  cursor-pointer"
                    onClick={() => toggleItem(item.label)}
                  >
                    {openItems[item.label] ? (

                      <ArrowDownCircle />
                    ) : (
                      <ArrowRightCircle />
                    )}
                  </span>
                )}
              </div>

              {/* Child Items */}
              {item.children && openItems[item.label] && (
                <div
                  className="ml-6 mt-1  space-y-1">
                  {item.children.map((child) => (
                    <Link
                      onClick={() => { setSidebarOpen(false) }}
                      key={child.label}
                      to={child.path} 

                    >
                      <div className="p-2 text-sm rounded-lg hover:bg-[#1b2440] cursor-pointer">
                        {child.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div onClick={()=>{logout()}} className="mt-auto flex   justify-center items-center gap-6 bg-purple-600 p-4  rounded-xl text-sm text-center">
        <p className="font-semibold cursor-pointer "> Logout</p> <LogOut />
      </div>
    </aside>
  );
}
