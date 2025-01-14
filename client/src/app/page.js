import ChatRoom from "@/components/Chatbox";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Navbar />
      <ChatRoom roomName={'chat_12'} />
    </div>
  )
}
