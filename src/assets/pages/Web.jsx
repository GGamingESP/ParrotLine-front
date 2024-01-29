import { useState, useEffect } from "react";
import { FaSmile, FaPlus, FaEllipsisV, FaCog, FaUserPlus } from 'react-icons/fa';
import { MdGroupAdd } from "react-icons/md";
import logoImage from '../images/loro.png'

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
            <div className="w-64 bg-[#4aa88f] p-4 border-r-2 border-[#327462]">
                {/* Perfil del usuario */}
                <div className="flex items-center mb-4 ">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="User profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <h3 className=" text-3x1 font-semibold">Nombre del Usuario</h3>
                        {/* Botón de ajustes */}
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => handleSettingsClick()}>
                            <FaCog />
                        </button>
                    </div>
                </div>

                {/* Botón de búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar usuarios"
                        className="w-full border border-gray-300 p-2 rounded-xl"
                    />
                </div>

                {/* Iconos de "Agregar amigo" y "Crear grupo" */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleAddFriend()}>
                        <FaUserPlus size={24} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCreateGroup()}>
                        <MdGroupAdd size={24} />
                    </button>
                </div>

                {/* Lista de canales de usuarios */}
                <ul className="sm:max-h-[420px] md:max-h-[420px] lg:max-h-[420px] xl:max-h-[420px] 2xl:max-h-[640px] overflow-y-auto">
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Jane</h3>
                                <p className="text-xs text-gray-500">!Hola¡ Estoy bien, ¿y tú?</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>
                    <li className="mb-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    alt="Canal de Usuario"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-gray-500">Último mensaje...</p>
                            </div>
                        </div>
                    </li>




                    {/* Agrega más elementos de la lista según sea necesario */}
                </ul>

                <div className="flex-1"></div>

                <div className="flex  border-t pt-4 items-center justify-center">
                    <img src={logoImage} alt="Logotipo" className="flex-1 w-32 " />
                </div>
            </div>


            <div className="flex-1 flex flex-col bg-white ">
                <div className="w-full bg-[#4aa88f] p-4 mb-4 flex items-center h-16">
                    {/* Perfil del usuario al que se habla */}
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="Canal de Usuario"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Información del usuario */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-2">Jane</h2>
                        <p className="text-gray-500 text-sm">Descripcion</p>
                    </div>

                    {/* Icono de opciones al final */}
                    <div>
                        {/* Puedes reemplazar FaEllipsisV con el icono que desees */}
                        <FaEllipsisV size={20} />
                    </div>
                </div>



                <div className="overflow-y-auto max-h-[calc(100vh-64px)] pb-4 px-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat ${message.user === "John" ? "chat-end" : "chat-start"}`}
                        >
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    />
                                </div>
                            </div>
                            <div className="chat-header">{message.user}</div>
                            <div className={`chat-bubble ${message.user === "John" ? "bg-green-500 text-white ml-auto" : ""}`}>
                                {message.text}
                            </div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    ))}
                </div>
                <div className="flex-1"></div> {/* Espacio flexible para empujar el contenido hacia arriba */}

                <div className="flex justify-center ">
                    <form action="" className="flex-1 w-max " onSubmit={(e) => { handlesubmit(e) }}>
                        {/* Icono de emoji */}
                        <button className="text-gray-500 p-2  hover:text-gray-700" onClick={() => toggleModal('emoji')}>
                            <FaSmile size={27} />
                        </button>

                        {/* Icono para abrir el mini modal */}
                        <button className="text-gray-500 p-2  hover:text-gray-700" onClick={() => setIsModalOpen(true)}>
                            <FaPlus size={27} />
                        </button>

                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Write a Messaje..."
                            className="border border-gray-300 p-2 rounded w-[80%]" // Ajusté el ancho del input
                        />
                        <input
                            type="submit"
                            onClick={sendMessage}
                            value={"Send"}
                            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-[9%]"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Web;
