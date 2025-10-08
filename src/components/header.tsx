"use client"
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"



const Header = () => {


  const {
    // state,
    // open,
    // setOpen,
    // openMobile,
    // setOpenMobile,
    // isMobile,
    toggleSidebar,
  } = useSidebar()

  return < header className="w-full flex justify-between items-center sticky top-0 bg-gray-50/10" >
    <h2 className="text-2xl font-bold" > LangJson </h2>
    <Menu size={50} onClick={toggleSidebar} />
  </header >
}
export default Header
