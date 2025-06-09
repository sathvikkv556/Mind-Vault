

import DocumentIcon from "../icons/DocumentIcon";
import NotionIcon from "../icons/NotionIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Tags from "./Tags";
import { format } from 'date-fns';
import { JSX, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import{toast} from 'react-hot-toast';
  import axios from "axios";
interface CardProps {
  icon: "Youtube" | "Twitter" | "Notion";
  tag: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration";
  title: string;
  link: string;
  createdAt:string;
  reload?: () => void;
}

declare global {
  interface Window {
    twttr: any;
  }
}

const Card = (props: CardProps) => {
  const navigate = useNavigate();
 const date = format(new Date(props.createdAt), 'dd MMM yyyy'); // ✅ Correct

  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const twitterRef = useRef<HTMLDivElement | null>(null);

  const getYoutubeId = (url: string): string | null => {
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (props.icon === "Youtube") {
      const id = getYoutubeId(props.link);
      setYoutubeId(id);
    }

    if (props.icon === "Twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        if (window.twttr && window.twttr.widgets && twitterRef.current) {
          window.twttr.widgets.load(twitterRef.current);
        }
      };
      document.body.appendChild(script);
    }
  }, [props.link, props.icon]);



async function deleteHandle() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      navigate("/");
      return;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const res = await axios.delete(`${backendUrl}/api/v1/delete/${props.title}`, {
      headers: {
        token: token
      },
      withCredentials: true
    });

    if (res.status === 200) {
      toast.success("Item deleted");
      props.reload && props.reload();
    }
  } catch (err) {
    console.log("Item not deleted", err);
  }
}


  const renderContentPreview = (): JSX.Element => {
    if (props.icon === "Youtube" && youtubeId) {
      return (
        <div className="flex justify-center items-center py-4">
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={props.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md w-[90%]"
          ></iframe>
        </div>
      );
    }

    if (props.icon === "Twitter") {
      return (
        <div ref={twitterRef} className="w-full overflow-hidden">
  <blockquote className="twitter-tweet">
    <a href={props.link}></a>
  </blockquote>
</div>

      );
    }

   if (props.icon === "Notion") {
  const formatUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    return url;
  };

  const formattedLink = formatUrl(props.link);
  const isPdf = formattedLink.toLowerCase().endsWith(".pdf");

  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-[90%] h-36 bg-red-50 border border-red-200 rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col justify-center items-center text-center">
        {isPdf ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-25 w-10 text-red-400 mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM13 9V3.5L18.5 9H13zm-1 4a1 1 0 10-2 0 1 1 0 002 0zm-2 2a1 1 0 100 2h4a1 1 0 100-2h-4z" />
            </svg>
            <a
              href={formattedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-300 font-semibold underline hover:text-red-500 transition"
            >
              Open PDF
            </a>
          </>
        ) : (
          <a
            href={formattedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex items-center justify-center"
          >
            <NotionIcon />
          </a>
        )}
      </div>
    </div>
  );
}



    return <p className="text-gray-400 text-center pt-4">No content available</p>;
  };

  return (
  <div className="w-[22vw] min-h-[52vh] rounded-2xl shadow-md bg-sky-50 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 font-sans overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3 overflow-hidden w-full">
        <DocumentIcon />
        <span className="font-semibold text-zinc-600 text-md truncate w-0 flex-1">
          {props.title}
        </span>
      </div>
      <button
        onClick={deleteHandle}
        className="text-gray-500 hover:text-red-500 transition-colors duration-200 flex-shrink-0"
        title="Delete"
      >
        <DeleteIcon />
      </button>
    </div>

    {/* Content Preview */}
    <div className="px-2">{renderContentPreview()}</div>

    {/* Tag */}
    <div className="px-5 pt-2">
      <Tags tagTypes={props.tag} />
    </div>

    {/* Footer */}
    <div className="text-sm text-gray-500 px-5 pb-3 pt-2">
      Created on: <span className="font-medium text-gray-700">{date}</span>
    </div>
  </div>
);

};

export default Card;

