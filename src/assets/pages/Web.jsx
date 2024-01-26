// Importa los módulos necesarios de React
import { useState, useEffect } from "react";


// Componente Chat que representa la página de chat
const Web = () => {
    // Estado para almacenar los mensajes
    const [messages, setMessages] = useState([]);
    // Estado para almacenar el mensaje actual que está siendo escrito
    const [currentMessage, setCurrentMessage] = useState("");

    // Efecto para simular la carga de mensajes (puedes reemplazar esto con llamadas a una API)
    useEffect(() => {
        // Simulación de mensajes
        const initialMessages = [
            { user: "John", text: "Hola, ¿cómo estás?" },
            { user: "Jane", text: "¡Hola! Estoy bien, ¿y tú?" },
        ];

        setMessages(initialMessages);
    }, []);

    // Función para enviar un nuevo mensaje
    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            const newMessage = { user: "John", text: currentMessage };
            setMessages([...messages, newMessage]);
            setCurrentMessage("");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Panel de usuarios */}
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
                {/* Lista de usuarios (puedes obtener esto de una API) */}
                <ul>
                    <li className="mb-2">John</li>
                    <li className="mb-2">Jane</li>
                </ul>
            </div>

            {/* Panel de chat */}
            <div className="flex-1 flex flex-col bg-white p-4">
                {/* Encabezado del chat */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Chat con Jane</h2>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-semibold">{message.user}:</span> {message.text}
                        </div>
                    ))}
                </div>

                {/* Área de entrada de mensajes */}
                <div className="flex items-center mt-4">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 border border-gray-300 p-2 rounded"
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Web;
