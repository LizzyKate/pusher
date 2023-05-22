import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

const Chat = ({ username }) => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: "eu",
    authEndpoint: "/api/pusher/auth",
    auth: {
      params: { username },
    },
  });
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const channel = pusher.subscribe("presence-channel");

      // when a user subscribes to the channel, they will be added to the online users list
      channel.bind("pusher:subscription_succeeded", function (members) {
        setOnlineUsersCount(members.count);
      });

      // when a new members joins the channel the chat
      channel.bind("pusher:member_added", function (member) {
        setOnlineUsersCount(channel.members.count);
        setOnlineUsers((prevState) => [
          ...prevState,
          { username: member.info.username },
        ]);
      });

      // when a member sends a message to the channel, the message will be added to the chats list
      channel.bind("chat-update", function (data) {
        const { username, message } = data;
        setChats((prevState) => [...prevState, { username, message }]);
        console.log(data, "data");
      });
    }

    return () => {
      pusher.unsubscribe("presence-channel");
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/pusher", { message, username });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-2 flex flex-col bg-purple-50 rounded-lg px-5 py-5">
      head
      {chats.map((chat, index) => (
        <div key={index} className="flex flex-col">
          {/* <span className="text-gray-600">{chat.username}</span> */}
          <span>{chat.message}</span>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter your message"
          className="border-2 border-gray-900"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
