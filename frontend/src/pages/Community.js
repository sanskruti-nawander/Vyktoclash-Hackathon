import React from "react";
import { FaSearch, FaUsers, FaComments } from "react-icons/fa";
import Chatbot from "../components/Chatbot";
import AI from "../assets/images/AI.jpg";
import ML from "../assets/images/ML.jpg";
import DS from "../assets/images/data science.jpeg";
import software from "../assets/images/softwaredev.jpeg";
import cybersecurity from "../assets/images/cybersecurity.jpeg";
import cloud_computing from "../assets/images/cloud_computing.jpeg";
import Product from "../assets/images/Product.jpg";
import UI from "../assets/images/UI_UX.jpeg";
import digital from "../assets/images/digital_marketing.jpeg";


const Community = () => {
  const communities = [
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Software Development",
    "Cybersecurity",
    "Cloud Computing",
    "Product Management",
    "UI/UX Design",
    "Digital Marketing",
  ];

  const communityImages = [
    ML,
    AI,
    DS,
    software,
    cybersecurity,
    cloud_computing,
    Product,
    UI,
    digital
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Discover</h2>
        <nav className="flex-1">
          {["Home", "Career Advice", "Resume Building", "Job Opportunities", "Skill Development", "Networking"].map((item) => (
            <div
              key={item}
              className="px-4 py-3 rounded-lg hover:bg-purple-800 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </nav>
        
        {/* Chat Option */}
        <div className="mt-4 p-3 bg-purple-600 rounded-lg cursor-pointer flex items-center gap-2">
          <FaComments />
          <span>Chat with Career Bot</span>
        </div>
        <Chatbot />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-purple-500 text-white p-6 rounded-lg mb-8 text-center">
            <h1 className="text-2xl font-bold">Find Career Communities</h1>
            <div className="mt-4 flex justify-center">
              <input
                type="text"
                placeholder="Search career communities..."
                className="p-2 rounded-l-lg text-black w-64"
              />
              <button className="bg-purple-700 p-2 rounded-r-lg">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Popular Communities */}
          <h2 className="text-xl font-bold mb-4">Popular Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <a
                key={index}
                href="https://discord.gg/NCxeVYap"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-purple-200 transition block"
              >
                <img src={communityImages[index]} alt={community} className="w-full h-40 object-cover rounded-lg mb-4" />
                <div className="flex items-center gap-4">
                  <FaUsers className="text-3xl text-purple-700" />
                  <div>
                    <h3 className="text-lg font-bold">{community}</h3>
                    <p className="text-sm text-gray-600">Join {Math.floor(Math.random() * 1000) + 500} people in this community.</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
