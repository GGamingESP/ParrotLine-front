import { useEffect, useState, useRef, useContext } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import MyCurrentGroupContext from "../components/CurrentGroupContext";
import axios from "axios";
import { FcAddImage } from "react-icons/fc";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { GoArrowDown } from "react-icons/go";

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaDesp, setMediaDesp] = useState(false);
  const [mensajeData, setMensajeData] = useState([]);
  const currentGroup = useContext(MyCurrentGroupContext);
  const messagesEndRef = useRef(null); // Referencia a la última conversación

  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  // useEffect para cuando se cambia de grupo

  useEffect(() => {
    fetchMessages();
    console.log(currentGroup);
  }, [currentGroup]);

  const fetchMessages = async () => {
    if (currentGroup && currentGroup.id) {
      const response = await axios
        .get(
          `https://ivan.informaticamajada.es/api/groupmessages/${currentGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("currentUser")).token
              }`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          setMessages(response.data.data);
          setMensajeData(response.data.data);
          console.log(response);
          setTimeout(() => {
            fetchMessages();
          }, 5000);
        });
    }
  };

  const fetchMessagesNoRepit = async () => {
    if (currentGroup && currentGroup.id) {
      const response = await axios
        .get(
          `https://ivan.informaticamajada.es/api/groupmessages/${currentGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("currentUser")).token
              }`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          setMessages(response.data.data);
          setMensajeData(response.data.data);
          console.log(response);
        });
    }
  };

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage((prevMessage) => prevMessage + emoji);
  };

  const emojiList = [
    "\u{1F60A}",
    "\u{1F44D}",
    "\u{2764}",
    "\u{1F602}",
    "\u{1F389}",
    "\u{1F44B}",
    "\u{1F525}",
    "\u{1F64C}",
    "\u{2B50}",
    "\u{1F914}",
    "\u{1F680}",
    "\u{1F4A1}",
    "\u{1F4DA}",
    "\u{1F3A8}",
    "\u{1F468}",
    "\u{200D}",
    "\u{1F4BB}",
    "\u{1F6A6}",
    "\u{1F3A4}",
    "\u{1F4F7}",
    "\u{2615}",
    "\u{1F917}",
  ];

  const deleteMessage = (id) => {
    axios
      .delete(`https://ivan.informaticamajada.es/api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("currentUser")).token
          }`,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        fetchMessages();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTimeout(() => {
        sendMessageWithImage();
      }, 2000);
    }
  };

  const sendMessageWithImage = () => {


    axios
      .post(
        `https://ivan.informaticamajada.es/api/message`,
          {
            user_id: user.user.id,
            group_id: currentGroup.id,
            text: 'imagen',
          },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("currentUser")).token
            }`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response)
        axios.post (`https://ivan.informaticamajada.es/api/createMessageWithImage/${response.data.data.id}`, {imagen: selectedFile},{
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("currentUser")).token
            }`,
            "Content-Type": "multipart/form-data",
          },
        } )
      })
      .catch((error) => {
        console.error(error);
      });

    setSelectedFile(null);
  };

  // Dentro de tu componente ChatMessages
  const [isSendingMessage, setIsSendingMessage] = useState(false); // Estado para controlar si se está enviando un mensaje

  // Dentro de tu componente ChatMessages
  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      // Verifica si ya se está enviando un mensaje
      if (isSendingMessage) {
        return; // Evita enviar múltiples solicitudes si ya se está enviando un mensaje
      }

      setIsSendingMessage(true); // Marca que se está enviando un mensaje

      axios
        .post(
          `https://ivan.informaticamajada.es/api/message`,
          {
            user_id: user.user.id,
            group_id: currentGroup.id,
            text: currentMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("currentUser")).token
              }`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          fetchMessagesNoRepit();
          setCurrentMessage(""); // Reinicia el estado del mensaje actual
          scrollToBottom(); // Desplaza hacia abajo después de enviar un nuevo mensaje
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSendingMessage(false); // Marca que el envío del mensaje ha terminado
        });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 flex flex-col bg-white ">
      <div className="w-full bg-[#4aa88f] p-4  flex items-center h-16">
        {/* Perfil del usuario al que se habla */}
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={
              currentGroup.image
                ? "https://ivan.informaticamajada.es/" + currentGroup.image
                : "/default-user.png"
            }
            alt="Canal de Usuario"
            className="w-full h-full object-cover"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          />
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              {/* Imagen del grupo */}
              <img
                src={
                  currentGroup.image
                    ? "https://ivan.informaticamajada.es/" + currentGroup.image
                    : "/default-group-image.png"
                }
                alt="Imagen del Grupo"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              {/* Nombre del grupo */}
              <h3 className="text-lg font-bold mb-2">{currentGroup.name}</h3>
              {/* Descripción del grupo */}
              <p className="text-sm mb-2">{currentGroup.description}</p>
              {/* ID del grupo */}
              <div className="border border-gray-300 rounded p-2 mb-4">
                {currentGroup.id}
              </div>
              {/* Collapse con usuarios asociados al grupo */}
              <h4 className="font-bold mb-2">Usuarios asociados:</h4>
              <div className="w-64 overflow-y-auto max-h-60">
                {/* Aquí irían los usuarios asociados al grupo */}
                <div className="border border-gray-300 rounded p-2">
                  {/* Ejemplo de usuario */}
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Usuario</p>
                  </div>
                  {/* Ejemplo de otro usuario */}
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Otro Usuario</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Otro Usuario</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Otro Usuario</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Otro Usuario</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src="url_de_la_imagen"
                      alt="Avatar Usuario"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <p>Nombre del Otro Usuario</p>
                  </div>

                  {/* Y así sucesivamente */}
                </div>
              </div>
              <div className="flex justify-start mb-4 mt-4">
                {/* Botón para bloquear el grupo */}
                <button className="btn bg-red-500 text-white rounded-md px-3 py-1 mr-5 hover:bg-red-600">
                  Bloquear Grupo
                </button>
                {/* Botón para salir del grupo */}
                <button className="btn bg-gray-500 text-white rounded-md px-3 py-1 hover:bg-gray-600">
                  Salir del Grupo
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>

        {/* Información del usuario */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            {currentGroup.name}
          </h2>
          <p className="text-white text-sm pt-[-0.2em]">
            {currentGroup.description}
          </p>
        </div>
        <div className=" items-center">
          <button
            className="text-white me-4 mt-2 text-xl"
            onClick={() => {
              scrollToBottom();
            }}
          >
            <GoArrowDown size={26} />
          </button>
        </div>
        <div className=" items-center">
          <button
            className="text-white me-4 mt-2 text-xl"
            onClick={() => {
              fetchMessages();
            }}
          >
            <IoReload size={22} />
          </button>
        </div>

        {/* Icono de opciones al final */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className=" m-1">
            <FaEllipsisV className="text-white" size={21} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <p>¿Quiere Eliminar este usuario/Grupo?</p>
            <button className="py-1 bg-red-500 text-white rounded mr-2">
              Aceptar
            </button>
            <button className=" py-1 bg-gray-300 text-gray-700 rounded">
              Cancelar
            </button>
          </ul>
        </div>
      </div>
      <div className="overflow-y-auto max-h-full pb-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-gray-100 rounded-lg">
        {mensajeData.map((value, index) => (
          <div
            className={`chat ${
              value.user_id == user.user.id ? "chat-end" : "chat-start"
            }`}
            key={index}
          >
            <div className="chat-image avatar group">
              <div className="w-10 rounded-full">
                <img
                  alt="user image"
                  src={
                    value.image
                      ? "https://ivan.informartica.es/" + value.image
                      : "/default-user.png"
                  }
                />
              </div>
              {value.user_id == user.user.id ? (
                <button
                  className="hidden group-hover:block text-black z-50 opacity-80"
                  onClick={() => deleteMessage(value.id)}
                >
                  X
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="chat-header">
              {value.user_id == user.user.id ? user.user.name : "Chatero"}
            </div>
            <div className="chat-bubble">{value.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Referencia a la última conversación */}
      </div>
      <div className="flex-1"></div>{" "}
      {/* Espacio flexible para empujar el contenido hacia arriba */}
      <div className="flex justify-center items-center bg-[#4aa88f]">
        <form
          action=""
          className="flex w-full bg-[#4aa88f] p-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          {/* Icono de emoji */}
          <button
            className="flex items-center mr-2 justify-center w-10 h-10 rounded-md bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none mt-1 transition-transform transform hover:scale-105"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <BsEmojiLaughingFill size={24} color="" />
          </button>

          {/* Modal emoji */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
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
              if (e.key === "Enter") {
                e.preventDefault(); // Evita el comportamiento predeterminado (enviar formulario)
                sendMessage(); // Envía el mensaje
              }
            }}
            placeholder="Write a Message..."
            className="flex-1 border border-gray-300 p-2 rounded mr-2 mt-1 focus:outline-none"
          />

          {/* Botón para enviar mensaje */}
          <button
            type="submit"
            onClick={sendMessage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none mt-1 transition-transform transform hover:scale-105"
          >
            <div className="mr-1">
              <FaPaperPlane size={20} />
            </div>
          </button>
        </form>
        {/* Input para seleccionar archivos */}
        <input
          type="file"
          accept="image/*, audio/*, video/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileInputImage"
        />

        {/* Botón para abrir el selector de archivos */}
        <label
          htmlFor="fileInputImage"
          className="text-gray-500 p-2 hover:text-gray-700 cursor-pointer ml-1 mr-1"
        >
          <div className="transition-transform transform hover:scale-105 focus:outline-none">
            <FcAddImage size={43} />
          </div>
        </label>
      </div>
    </div>
  );
}

export default ChatMessages;
