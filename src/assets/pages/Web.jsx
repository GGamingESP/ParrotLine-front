import { useState, useEffect } from "react";

function Web() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        const initialMessages = [
            { user: "John", text: "Hola, ¿cómo estás?" },
            { user: "Jane", text: "¡Hola! Estoy bien, ¿y tú?" },
        ];

        setMessages(initialMessages);
    }, []);

    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            const newMessage = { user: "John", text: currentMessage };
            setMessages([...messages, newMessage]);
            setCurrentMessage("");
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (currentMessage.trim() !== "") {
            const newMessage = { user: "John", text: currentMessage };
            setMessages([...messages, newMessage]);
            setCurrentMessage("");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-[#4aa88f] p-4">
                <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
                <ul>
                    <li className="mb-2">John</li>
                    <li className="mb-2">Jane</li>
                </ul>
            </div>

            <div className="flex-1 flex flex-col bg-white p-4">
                <div className="overflow-y-auto max-h-[calc(100vh-64px)] pb-4">
                    {messages.map((message, index) => (
                        <div key={index} className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message.user}
                            </div>
                            <div className="chat-bubble">{message.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    ))}
                </div>
                <div className="flex-1"></div> {/* Espacio flexible para empujar el contenido hacia arriba */}

                <div className="flex justify-center ">
                    <form action="" className="flex-1 w-max" onSubmit={(e) => { handlesubmit(e) }}>
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className=" border border-gray-300 p-2 rounded w-[90%]"
                        />
                        <input
                            type="submit"
                            onClick={sendMessage}
                            value={"Enviar"}
                            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-[9%]"
                        >
                        </input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Web;
