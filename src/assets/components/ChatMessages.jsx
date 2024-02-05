import { useEffect, useState } from "react";
import { FaSmile, FaPlus, FaEllipsisV, FaPaperPlane } from 'react-icons/fa';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);


  const handleEmojiSelect = (emoji) => {
    setCurrentMessage((prevMessage) => prevMessage + emoji);
  };

  const emojiList = [
    '\u{1F60A}', '\u{1F44D}', '\u{2764}', '\u{1F602}', '\u{1F389}', '\u{1F44B}', '\u{1F525}',
    '\u{1F64C}', '\u{2B50}', '\u{1F914}', '\u{1F680}', '\u{1F4A1}', '\u{1F4DA}', '\u{1F3A8}',
    '\u{1F468}', '\u{200D}', '\u{1F4BB}', '\u{1F6A6}', '\u{1F3A4}', '\u{1F4F7}', '\u{2615}',
    '\u{1F917}'
  ];



  useEffect(() => {
    const initialMessages = [
      { user: "John", text: "Hola, ¿cómo estás?" },
      { user: "Jane", text: "¡Hola! Estoy bien, ¿y tú?" },
    ];

    setMessages(initialMessages);
  }, []);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      sendMessageWithImage(file);
    }
  };


  const sendMessageWithImage = (imageFile) => {
    // Obtener la hora actual
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Crear el nuevo mensaje con la hora actual y la imagen
    const newMessage = {
      user: "John",
      text: "",
      file: imageFile,
      time: formattedTime,
      timestamp: currentTime.getTime(), // Guardar el timestamp del mensaje
    };

    // Agregar el mensaje al estado
    setMessages([...messages, newMessage]);

    // Limpiar la selección de archivo
    setSelectedFile(null);

  };

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      // Obtener la hora actual
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      // Crear el nuevo mensaje con la hora actual y el texto con emoji
      const newMessage = {
        user: "John",
        text: currentMessage,
        time: formattedTime,
      };

      // Agregar el mensaje al estado
      setMessages([...messages, newMessage]);

      // Limpiar el campo de mensaje actual y el emoji seleccionado
      setCurrentMessage("");
    }
  };

  return (
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


        <input id="my-drawer-4" type="checkbox" className="drawer-toggle y" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="btn btn-primary">
       
            <FaEllipsisV className="text-white" size={20} />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
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
                )
              </div>
            </div>
            <div className="chat-header">{message.user}</div>
            {/* Contenido del mensaje */}

            {message.text && (
              <div className={`chat-bubble ${message.user === "John" ? "bg-green-500 text-white ml-auto" : ""}`}>
                <p>{message.text}</p>

              </div>
            )}

            {/* Contenido de la imagen adjunta */}
            {message.file && (
              <div className={`chat-bubble ${message.user === "John" ? "bg-green-500 text-white ml-auto" : ""}`}>
                <div className="max-w-96 max-h-96 flex-shrink-0"> {/* Contenedor con tamaño máximo y sin encoger */}
                  <img
                    src={URL.createObjectURL(message.file)}
                    alt="Imagen adjunta"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <span className="chat-time text-xs opacity-50">{message.time}</span>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      <div className="flex-1"></div> {/* Espacio flexible para empujar el contenido hacia arriba */}

      <div className="flex justify-center items-center">
        <form
          action=""
          className="flex w-full bg-[#4aa88f] p-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          {/* Icono de emoji */}
          <button className="text-gray-500 p-2 hover:text-gray-700" onClick={() => document.getElementById('my_modal_2').showModal()}>
            <FaSmile size={27} />
          </button>

          {/* Modal emoji */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              {emojiList.map((emoji, index) => (
                <button
                  key={index}
                  className="text-2xl cursor-pointer focus:outline-none"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>


          {/* Input para texto */}
          <input
            type="text"
            value={`${currentMessage}`}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              // Verifica si la tecla presionada es Enter
              if (e.key === 'Enter') {
                e.preventDefault(); // Evita el comportamiento predeterminado (enviar formulario)
                sendMessage(); // Envía el mensaje
              }
            }}
            placeholder="Write a Message..."
            className="flex-1 border border-gray-300 p-2 rounded ml-2 focus:outline-none"
          />

          {/* Botón para enviar mensaje */}
          <button
            type="submit"
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600"
          >
            <FaPaperPlane size={20} />
          </button>

          {/* Input para seleccionar archivos */}
          <input
            type="file"
            accept="image/*, audio/*, video/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />

          {/* Botón para abrir el selector de archivos */}
          <label htmlFor="fileInput" className="text-gray-500 p-2 hover:text-gray-700 cursor-pointer ml-2">
            <FaPlus size={27} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default ChatMessages;
