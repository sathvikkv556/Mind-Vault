import ButtonUi from "../components/ButtonUi/Button";
import SideNavbar from "../components/SideNavbarUi/SideNavbar";
import ShareIcon from "../components/icons/ShareIcon";
import PlusIcon from "../components/icons/PlusIcon";
import { JSX, useEffect, useState } from "react";
import Modal from "../components/ModalUi/Modal";
import Card from "../components/CardUi/Card";
import { useNavigate } from "react-router-dom";
import MoonIcon from "../components/icons/MoonIcon";
import SunIcon from "../components/icons/SunIcon";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState<any[]>([]);
  const [ytData, setYTData] = useState<any[]>([]);
  const [notionData, setNotionData] = useState<any[]>([]);
  const [shareData, setShareData] = useState<any[]>([]);
  const [dataShow, setDataShow] = useState("All");
  const [twitterData, setTwitterData] = useState<any[]>([]);
  
  const location = useLocation();

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetchingData();
  }, [reloadData]);

  async function fetchingData() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const isLoggedOut = location.state?.loggedOut;

      if (!token && !isLoggedOut) {
        toast.error("Please log in first");
        navigate("/");
        return;
      }
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
const res = await axios.get(`${backendUrl}/api/v1/content`
      , {
        headers: token ? { token } : {},
        withCredentials: true,
      });

      setData(res.data.data);
    } catch (err) {
      console.log("Error while fetching data", err);
      toast.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }

  let show: JSX.Element | JSX.Element[] = Data;

  if (dataShow === "All") {
    show = loading ? (
      <div className="text-2xl font-semibold dark:text-gray-200">Loading...</div>
    ) : Data.length > 0 ? (
      Data.map((item: any, idx: number) => (
        <Card
          createdAt={item.createdAt}
          key={idx}
          icon={item.contentType}
          tag={item.tag}
          title={item.title}
          link={item.link}
          reload={() => setReloadData(!reloadData)}
        />
      ))
    ) : (
      <div className="text-2xl font-semibold dark:text-gray-200">You do not have any Content</div>
    );
  } else if (dataShow === "Youtube") {
    show = loading ? (
      <div className="text-2xl font-semibold dark:text-gray-200">Loading...</div>
    ) : ytData.length > 0 ? (
      ytData.map((item: any, idx: number) => (
        <Card
          createdAt={item.createdAt}
          key={idx}
          icon={item.contentType}
          tag={item.tag}
          title={item.title}
          link={item.link}
          reload={() => setReloadData(!reloadData)}
        />
      ))
    ) : (
      <div className="text-2xl font-semibold dark:text-gray-200">You do not have any Content</div>
    );
  } else if (dataShow === "Twitter") {
    show = loading ? (
      <div className="text-2xl font-semibold dark:text-gray-200">Loading...</div>
    ) : twitterData.length > 0 ? (
      twitterData.map((item: any, idx: number) => (
        <Card
          createdAt={item.createdAt}
          key={idx}
          icon={item.contentType}
          tag={item.tag}
          title={item.title}
          link={item.link}
          reload={() => setReloadData(!reloadData)}
        />
      ))
    ) : (
      <div className="text-2xl font-semibold dark:text-gray-200">You do not have any Content</div>
    );
  } else {
    // Notion
    show = loading ? (
      <div className="text-2xl font-semibold dark:text-gray-200">Loading...</div>
    ) : notionData.length > 0 ? (
      notionData.map((item: any, idx: number) => (
        <Card
          createdAt={item.createdAt}
          key={idx}
          icon={item.contentType}
          tag={item.tag}
          title={item.title}
          link={item.link}
          reload={() => setReloadData(!reloadData)}
        />
      ))
    ) : (
      <div className="text-2xl font-semibold dark:text-gray-200">You do not have any Content</div>
    );
  }

  async function share() {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        toast.error("Please log in first");
        navigate("/");
        return;
      }
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(`${backendUrl}/api/v1/content`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        const jsonData = res.data;
        setShareData(jsonData.data);

        const encodedData = encodeURIComponent(JSON.stringify(jsonData.data));
        const shareLink = `https://mind-vault-r5mk.vercel.app/share/${userId}?data=${encodedData}`;

        console.log("Generated share link:", shareLink);

        navigator.clipboard
          .writeText(shareLink)
          .then(() => {
            toast.success("Shareable link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
            toast.error("Failed to copy link to clipboard. Here's the link:\n" + shareLink);
          });
      } else {
        toast.error("Something went wrong while sharing.");
      }
    } catch (err) {
      console.log("Error while sharing content", err);
      toast.error("Failed to share content.");
    }
  }

  return (
    <div className="flex dark:bg-gray-900 min-h-screen">
      <SideNavbar
        setTwitterData={setTwitterData}
        setData={setData}
        setYTData={setYTData}
        setNotionData={setNotionData}
        Data={Data}
        setDataShow={setDataShow}
      />

      <div className="bg-slate-200 dark:bg-gray-800 w-full pb-10 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <div className="font-bold text-3xl mt-4 ml-8 dark:text-white">All Notes</div>
          <div className="flex gap-2 mt-5 mr-8 items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <div onClick={share}>
              <ButtonUi variant="secondary" size="lg" text={"Share Brain"} startIcon={<ShareIcon />} />
            </div>

            <ButtonUi
              variant="primary"
              size="lg"
              text={"Add Content"}
              startIcon={<PlusIcon />}
              onClick={() => setModal(!modal)}
            />
          </div>
        </div>

        <div className="ml-7 mt-6 flex flex-wrap gap-x-3 gap-y-5">{show}</div>
      </div>

      {modal && <Modal onClick={() => setModal(!modal)} setModal={setModal} setReloadData={() => setReloadData(!reloadData)} />}
    </div>
  );
};

export default HomePage;
