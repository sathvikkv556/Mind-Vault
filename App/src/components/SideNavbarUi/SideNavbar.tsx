import { useNavigate } from "react-router-dom";
import AppLogo from "../icons/AppLogo";
import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import All from "../icons/All";
import TwitterIcon from "../icons/TwitterIcon";
import { useTheme } from "../../context/ThemeContext";

import { toast,Toaster } from "react-hot-toast";

interface SideNavbarProps {
  data1: any;
  setData: any;
  setYTData: any;
  setNitionData: any;
  setDataShow: any;
}

const SideNavbar = ({
  data1,
  setData,
  setYTData,
  setNitionData,
  setDataShow,
}: SideNavbarProps) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const filterYoutube = () => {
    const ytData = data1.filter((item: any) => item.contentType === "Youtube");
    setYTData(ytData);
    setDataShow("Youtube");
  };

  const filterDocuments = () => {
    const ntData = data1.filter(
      (item: any) =>
        item.contentType === "Notion" 
    );
    setNitionData(ntData);
    setDataShow("Notion");
  };

  const showAll = () => {
    setDataShow("All");
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/", { state: { loggedOut: true } });
  toast.success("logged out successfully")
};


  return (
    <div
      className={`w-64 h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800  border-gray-700" : "bg-zinc-100 border-gray-200"
      } border-r`}
    >
      {/* Logo Section */}
      <div
        className={`flex items-center gap-3 p-6 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <AppLogo
         
        />
        <span
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-blue-600"
          }`}
        >
         MindVault
        </span>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem icon={<All />} label="All" onClick={showAll} />
        <NavItem icon={<YoutubeIcon />} label="YouTube" onClick={filterYoutube} />
        <NavItem icon={<DocumentIcon />} label="Documents" onClick={filterDocuments} />
       
      </div>

      {/* Bottom Section */}
      <div
        className={`p-4 border-t space-y-2 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          v1.0.0
        </div>
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Your digital knowledge hub
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full mt-2 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
            isDarkMode
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`group flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
        isDarkMode
          ? "hover:bg-gray-800 text-gray-300 hover:text-white"
          : "hover:bg-blue-50 text-gray-700 hover:text-blue-600"
      }`}
    >
      <div
        className={`mr-3 transition-colors ${
          isDarkMode
            ? "group-hover:text-white text-gray-400"
            : "group-hover:text-blue-600 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default SideNavbar;
