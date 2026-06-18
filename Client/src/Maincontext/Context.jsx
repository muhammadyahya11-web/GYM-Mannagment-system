import { createContext, useState, useEffect } from "react";

//=================Create context========================
export const MainContext = createContext();

//============Provider component============================
const MainContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // detect mobile initially
  const [user, setUser] = useState("");
  const [token, settoken] = useState("");
  const [loading, setloading] = useState(false)
  const [email, setemail] = useState("")


  //===================== Detect mobile on resize=================
  useEffect(() => {
    settoken(localStorage.getItem("token"))
    setUser(localStorage.getItem("user"))
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Optional: automatically close sidebar on mobile resize
      if (window.innerWidth > 768) setSidebarOpen(true);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

// ===========================================================

 const  logout=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setUser("")
  settoken("")
 }
// ===========================================================

  return (
    <MainContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isMobile,
        setIsMobile,
        user,
        setUser,
        token,
        settoken,
        loading, setloading,
        email, setemail ,
        logout,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
