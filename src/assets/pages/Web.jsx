import { useState, useEffect } from "react";
import { FaSmile, FaPlus, FaEllipsisV, FaCog, FaUserPlus, FaPaperPlane } from 'react-icons/fa';
import { MdGroupAdd } from "react-icons/md";

import logoImage from '../images/loro.png'


function Web() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const [isNameEditMode, setNameEditMode] = useState(false);
    const [isDescriptionEditMode, setDescriptionEditMode] = useState(false);
    const [name, setName] = useState('John'); // Cambia 'Tu Nombre' por el nombre actual
    const [description, setDescription] = useState('Tu Descripción'); // Cambia 'Tu Descripción' por la descripción actual // Cambia 'Tu Descripción' por la descripción actual


    const handleFileChange = (e) => {
        // Lógica para manejar el cambio de archivo
        console.log('Archivo seleccionado:', e.target.files[0]);
    };



    const handleNameEdit = () => {
        setNameEditMode(!isNameEditMode);
    };
    const handleDescriptionEdit = () => {
        setDescriptionEditMode(!isDescriptionEditMode);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };



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
                        <h3 className=" text-3x1 text-white font-semibold">John</h3>
                        {/* Botón de ajustes */}
                        <div className="ml-4 relative">
                            <button className="text-white hover:text-gray-700 " onClick={() => document.getElementById('modal_1').showModal()}>
                                <FaCog />
                            </button>

                            {/* Modal */}
                            <dialog id="modal_1" className="modal">
                                <div className="modal-box p-4">
                                    <form method="dialog">
                                        <button
                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                            onClick={() => document.getElementById('modal_1').close()}
                                        >
                                            ✕
                                        </button>
                                    </form>

                                    <div className="flex items-center justify-center mb-4">

                                        {/* Avatar */}
                                        <div
                                            className="relative group"
                                            onMouseEnter={() => setHovered(true)}
                                            onMouseLeave={() => setHovered(false)}
                                            onClick={() => setEditMode(!isEditMode)}
                                        >
                                            <img
                                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                                alt="Avatar Logo"
                                                className={`w-20 h-20 rounded-full object-cover ${isHovered ? 'filter blur-sm' : ''}`}

                                            />


                                            {isHovered && (
                                                <span className="absolute top-0 right-0 m-2 cursor-pointer text-xl text-gray-500" title="Personalizar">
                                                    🎨
                                                </span>
                                            )}

                                            {isEditMode && (
                                                <div className="absolute bg-white p-4 border rounded">
                                                    {/* Contenido para cambiar la foto */}
                                                    <label className="block mb-2 text-gray-600 cursor-pointer">
                                                        Seleccionar archivo
                                                        <input type="file" className="hidden" onChange={handleFileChange} />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Nombre */}
                                    <div className="text-lg font-semibold mb-4">
                                        {isNameEditMode ? (
                                            <>
                                                <textarea
                                                    value={name}
                                                    onChange={handleNameChange}
                                                    className="w-full border p-2 rounded"
                                                    placeholder="Escribe tu nombre..."
                                                />
                                                <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleNameEdit}>
                                                    Aceptar
                                                </button>
                                            </>
                                        ) : (
                                            <span className="cursor-pointer text-blue-500" onClick={handleNameEdit}>
                                                Nombre: {name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <div className="mb-4">
                                        <button className="text-blue-500 underline" onClick={handleDescriptionEdit}>
                                            Descripción
                                        </button>
                                        {isDescriptionEditMode && (
                                            <div>
                                                {/* Texto editable y opciones para cambiar */}
                                                <textarea
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                    className="w-full border p-2 rounded"
                                                    placeholder="Escribe tu descripción..."
                                                />
                                                <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleDescriptionEdit}>
                                                    Aceptar
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Personalización */}
                                    <div className="mb-4">
                                        <button
                                            className="text-blue-500 underline"
                                            onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                                        >
                                            Personalización
                                        </button>
                                        {isCustomizationOpen && (
                                            <div>
                                                {/* Opciones de personalización */}
                                                {/* ... */}
                                            </div>
                                        )}
                                    </div>

                                    {/* Logout */}
                                    <button
                                        className="text-red-500 underline"
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </button>
                                </div>

                                <form
                                    method="dialog"
                                    className="modal-backdrop"
                                    onClick={() => document.getElementById('modal_1').close()}
                                >
                                    {/* Fondo para cerrar el modal al hacer clic fuera */}
                                </form>
                            </dialog>

                        </div>
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
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <button className="text-white hover:text-gray-700" onClick={() => document.getElementById('modal_2').showModal()}>
                            <FaUserPlus size={24} />
                        </button>
                        <button className="text-white hover:text-gray-700" onClick={() => document.getElementById('modal_3').showModal()}>
                            <MdGroupAdd size={24} />
                        </button>
                    </div>

                    <dialog id="modal_2" className="modal">
                        <div className="modal-box p-4">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h2>Tu id:</h2>
                            <input
                                type="text"
                                placeholder="ID del amigo"
                                className="w-full border p-2 rounded"
                            />
                            <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded">
                                Enviar Solicitud
                            </button>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    {/* Modal para crear grupo */}
                    <dialog id="modal_3" className="modal">
                        <div className="modal-box p-4">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h2>Crear Grupo</h2>
                            {/* Lista de amigos */}
                            {/* ... (muestra la lista de amigos y permite seleccionar) */}
                            <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded" >
                                Crear Grupo
                            </button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
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
                                <h3 className="text-sm text-white font-semibold">Jane</h3>
                                <p className="text-xs text-white">!Hola¡ Estoy bien, ¿y tú?</p>
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
                                <h3 className="text-sm text-white font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-white">Último mensaje...</p>
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
                                <h3 className="text-sm text-white font-semibold">Nombre del Canal</h3>
                                <p className="text-xs text-white">Último mensaje...</p>
                            </div>
                        </div>
                    </li>




                    {/* Agrega más elementos de la lista según sea necesario */}
                </ul>

                <div className="flex-1"></div>

                <div className="  border-t pt-4 items-center justify-center">
                    <img src={logoImage} alt="Logotipo" className="flex-1 w-32 " />
                </div>
            </div >


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
                        <h2 className="text-lg font-semibold text-white">Jane</h2>
                        <p className="text-white text-sm pt-[-0.2em]">Descripcion</p>
                    </div>

                    {/* Icono de opciones al final */}
                    <div>
                        {/* Puedes reemplazar FaEllipsisV con el icono que desees */}
                        <FaEllipsisV className="text-white" size={20} />
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
                            <div className={`chat-bubble ${message.user === "John" ? "bg-green-500 text-white ml-auto" : ""}`}
                                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                {message.text}
                            </div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    ))}
                </div>

                <div className="flex-1"></div> {/* Espacio flexible para empujar el contenido hacia arriba */}

                <div className="flex justify-center ">
                    <form action="" className="flex-1 w-max bg-[#4aa88f]" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                        {/* Icono de emoji */}
                        <button className="text-gray-500 p-2   hover:text-gray-700">
                            <FaSmile size={27} />
                        </button>

                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Write a Messaje..."
                            className="border border-gray-300 p-2 rounded w-[80%]" // Ajusté el ancho del input
                        />
                        <button
                            type="submit"
                            onClick={sendMessage}
                            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >

                            <FaPaperPlane size={20} />
                        </button>

                    </form>
                </div>
            </div>
        </div >
    );
}

export default Web;
