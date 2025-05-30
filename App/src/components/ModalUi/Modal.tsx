import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
interface ModalProps {
  onClick: () => void;
  setModal: (value: boolean) => void;
  setReloadData: () => void;
  darkMode?: boolean;
}

const Modal = ({ onClick, setModal, setReloadData, darkMode = false }: ModalProps) => {
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState("Productivity");
  const [category, setCategory] = useState("Youtube");
  const mapTags = ["Productivity", "Tech & Tools", "Mindset", "Learning & Skills", "Workflows", "Inspiration"] as const;

  const submitData = async () => {
    setModal(false);
    if (!linkRef.current?.value.trim() || !titleRef.current?.value.trim()) {
      toast.error("Please fill all the required fields");
      return;
    }

    const data = {
      link: linkRef.current.value,
      contentType: category,
      title: titleRef.current.value,
      tag,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first");
        navigate("/");
        return;
      }

      const response = await fetch("http://localhost:5000/api/v1/addcontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setReloadData();
        toast.success("Content added successfully!");
      } else {
        throw new Error("Failed to add content");
      }
    } catch (err) {
      console.error("Error while sending data:", err);
      alert("Failed to add content. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-full flex justify-center items-center z-50">
      <div 
        ref={modalRef} 
        onClick={onClick} 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      ></div>
      
      <div className={`relative z-10 w-full max-w-md rounded-xl shadow-2xl overflow-hidden transition-colors duration-300 
      ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}>
        {/* Modal Header */}
        <div className={`flex justify-between items-center p-4 border-b ${
          darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50"
        }`}>
          <h2 className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-blue-600"
          }`}>Add Content</h2>
          <button 
            onClick={onClick}
            className={`text-xl font-semibold transition-colors ${
              darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            &times;
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>Title</label>
            <input 
              ref={titleRef}
              type="text" 
              placeholder="Enter title"  
              maxLength={20} 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
            />
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>Link</label>
            <input 
              ref={linkRef}
              type="text" 
              required 
              placeholder="Enter URL" 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
            />
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>Choose Tag</label>
            <div className="flex flex-wrap gap-2">
              {mapTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    tag === t 
                      ? "bg-blue-600 text-white shadow-md"
                      : darkMode 
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>Choose Category</label>
            <div className="flex gap-2">
              {["Youtube", "Twitter", "Notion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    category === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : darkMode 
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex justify-end ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
        }`}>
          <button 
            onClick={submitData}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;