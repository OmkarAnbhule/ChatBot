'use client'
import { useSocket } from '@/utils/Socket';
import { useEffect, useRef, useState } from 'react';
import TypingAnimation from './ui/typing-animation';
import StarIcon from './ui/star-icon';
import { Meteors } from './ui/meteors';
import { BorderBeam } from './ui/border-beam';
import InteractiveHoverButton from './ui/interactive-hover-button';
import { useAuth } from '@clerk/nextjs';
import { useSelector } from 'react-redux';

const ChatRoom = () => {
    const user = useSelector((state) => state.user)
    const [messages, setMessages] = useState([]);
    const chatLogRef = useRef(null);
    const messageInputRef = useRef(null);
    const socket = useSocket();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
            setLoading(false);
        };

        socket.onclose = () => {
            console.error('Chat socket closed unexpectedly');
        };

        return () => {
            socket.close();
        };
    }, [socket]);

    console.log(loading)

    const handleSendMessage = () => {
        setLoading(true);
        const message = messageInputRef.current.value;
        if (message.trim() === '') return;

        setMessages((prevMessages) => [...prevMessages, message]);
        socket.send(JSON.stringify({ message, user_id: user.user_id }));

        messageInputRef.current.value = '';
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen relative overflow-x-hidden w-screen flex flex-col items-center justify-center">
            <Meteors number={30} />
            <div
                ref={chatLogRef}
                className="w-full max-w-5xl h-[480px] scroll-smooth border-none select-none p-6 mb-4 overflow-y-auto text-white rounded-lg shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            >
                {messages.map((msg, index) => (
                    index % 2 === 0 ? (
                        <div key={index} className="w-full flex justify-end">
                            <p className="text-xl my-1 w-fit flex justify-end rounded-lg h-fit px-3 py-2 bg-slate-600">
                                {msg}
                            </p>
                        </div>
                    ) : (
                        <div key={index} className="text-xl my-1 p-2 flex gap-2">
                            <StarIcon />
                            <TypingAnimation className="text-xl text-black dark:text-white font-normal my-1">
                                {msg}
                            </TypingAnimation>
                        </div>
                    )
                ))}

                {loading && (
                    <div key="loading" className="text-xl my-1 p-2 flex gap-2">
                        <div className="relative w-fit h-fit p-2 text-black dark:text-white">
                            <p className="p-1">Thinking....</p>
                            <BorderBeam />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full max-w-3xl">
                <input
                    ref={messageInputRef}
                    type="text"
                    placeholder="Type your message..."
                    disabled={loading}
                    onKeyUp={handleKeyUp}
                    className="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-indigo-500"
                />
                <InteractiveHoverButton
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-white bg-black disabled:bg-slate-600 rounded-r-lg rounded-l-none hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
                    disabled={loading}
                    text="Send"
                >
                </InteractiveHoverButton>
            </div>
        </div >
    );
};

export default ChatRoom;
