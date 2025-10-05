"use client"
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"



const Header = () => {


  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return < header className="w-full flex justify-between" >
    <h2> LangJson </h2>
    <Menu onClick={toggleSidebar} />
  </header >
}
export default Header
