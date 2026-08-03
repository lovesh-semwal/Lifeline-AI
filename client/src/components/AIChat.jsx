import { useState } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm LifeLine AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    sender: "user",
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);

  const question = input;
  setInput("");

  try {
    // Show loading message
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Thinking...",
      },
    ]);

    const res = await axios.post(
      `${API_URL}/api/ai/chat`,
      {
        message: question,
      }
    );

    const aiReply = res.data.response;

    setMessages((prev) => {
      const updated = [...prev];

      // Replace Thinking...
      updated[updated.length - 1] = {
        sender: "bot",
        text: aiReply,
      };

      return updated;
    });

  } catch (error) {
    setMessages((prev) => {
      const updated = [...prev];

      updated[updated.length - 1] = {
        sender: "bot",
        text: "Sorry, I couldn't connect to the AI server.",
      };

      return updated;
    });

    console.error(error);
  }
};

  

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-red-600 text-white p-4 flex items-center gap-5 AI-header">
        <FaRobot className="text-3xl" />
        <div>
          <h2 className="text-xl font-bold">LifeLine AI Assistant</h2>
          <p className="text-sm">Ask about emergencies & first aid</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-112.5 overflow-y-auto p-5 bg-gray-100 space-y-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                msg.sender === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              <div className="text-2xl mt-1">
                {msg.sender === "user" ? (
                  <FaUser className="text-blue-600" />
                ) : (
                  <FaRobot className="text-red-600" />
                )}
              </div>

              <div
                className={`p-3 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className="flex p-4 border-t bg-white AI-input">

        <input
          type="text"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 AI-input"
        />

        <button
          onClick={sendMessage}
          className="ml-3 bg-red-600 hover:bg-red-700 text-white px-5 rounded-lg flex items-center justify-center"
        >
          <FaPaperPlane className="paperPlane"/>
        </button>

      </div>

    </div>
  );
};

export default AIChat;