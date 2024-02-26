// IMPORT REACT
import { useEffect, useState, useRef, useContext } from "react";
// ICONOS
import { FaEllipsisV, FaPaperPlane, FaTimes } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { FcAddImage } from "react-icons/fc";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { GoArrowDown } from "react-icons/go";

// IMPORT NECESIDADES
import MyCurrentGroupContext from "../components/CurrentGroupContext";
import axios from "axios";

// FUNCION PRINCIPAL
function ChatMessages() {
  // ESTADOS
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRealTime, setCurrentRealTime] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mensajeData, setMensajeData] = useState([]);
  const currentGroup = useContext(MyCurrentGroupContext);
  const messagesEndRef = useRef(null); // Referencia a la última conversación
  const [uploadDesp, setUploadDesp] = useState(false);

  // SESSION STORAGE DEL USUARIO
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const altUser = JSON.parse(sessionStorage.getItem("currentUser"));
  // useEffect para cuando se cambia de grupo

  useEffect(() => {
    if(currentRealTime){
      clearTimeout(currentRealTime)
    }
    setMessages([]);
    fetchMessages();
    console.log(currentGroup);
  }, [currentGroup]);

  // FUNCION MENSAJES DE GRUPO ACTUAL
  const fetchMessages = async () => {
    if (currentGroup && currentGroup.id) {
      try {
        const response = await axios.get(
          `https://ivan.informaticamajada.es/api/groupmessages/${currentGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(response.data.data);
        setMensajeData(response.data.data);
        let newRealTime = setTimeout(() =>{fetchMessages()}, 3000);
        setCurrentRealTime(newRealTime);
        console.log(response);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // LO MISMO QUE EL ANTERIOR PERO SIN REPETIRSE
  const fetchMessagesNoRepit = async () => {
    if (currentGroup && currentGroup.id) {
      const response = await axios
        .get(
          `https://ivan.informaticamajada.es/api/groupmessages/${currentGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
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

  // EMOJI
  const handleEmojiSelect = (emoji) => {
    // Concatenar el emoji seleccionado con el texto existente en el campo de entrada
    setCurrentMessage(currentMessage + emoji);
  };
  // LISTA DE EMOJIS
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
  // FUNCION ELIMINAR MENSAJE
  const deleteMessage = (id) => {
    if(confirm("Estas seguro de que quieres eliminar el mensaje")){
      axios
      .delete(`https://ivan.informaticamajada.es/api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
            }`,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        fetchMessagesNoRepit();
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  // FUNCION ELIMINAR MENSAJES
  const blockUser = (id) => {
    if(confirm("Estas seguro de que quieres bloquear a el usuario")){
      axios.get(`https://ivan.informaticamajada.es/api/blockFriend/${id}`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
            }`,
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        fetchMessagesNoRepit();
      })
    }
  }
  // FUNCION ENVIAR MENSAJES CON ARCHIVOS / IMAGENES
  const sendMessageWithImage = () => {
    console.log(selectedFile)
    let imagen = new FormData();
    imagen.append('imagen', selectedFile);
    axios
      .post(
        `https://ivan.informaticamajada.es/api/message`,
        {
          user_id: user.user.id,
          group_id: currentGroup.id,
          text: "‎",
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
              }`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        console.log("Subiendo la imagen")
        axios.post(
          `https://ivan.informaticamajada.es/api/createMessageWithImage/${response.data.data.id}`,
          imagen,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
                }`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });

    setSelectedFile(null);
  };

  // Dentro de tu componente ChatMessages
  const [isSendingMessage, setIsSendingMessage] = useState(false); // Estado para controlar si se está enviando un mensaje

  // Dentro de tu componente ChatMessages
  // Modificar la función sendMessage para que se active solo cuando se presione el botón de enviar o la tecla "Enter"
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
              Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
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
  // FUNCION PARA BAJAR AL FINAL DE LA PAGINA
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // FUNCION PARA QUITAR /PUBLIC DEL PRINCIPIO DE UN STRING
  function quitarPublic(str) {
    // Longitud de "public/"
    const publicLength = 7;

    // Corta la cadena desde el índice publicLength
    return str.slice(publicLength);
  }
  // FUNCION PARA SALIR DEL GRUPO
  const leaveGroup = () => {
    // Aquí envías una solicitud al servidor para salir del grupo
    if(confirm("Estas seguro de que quieres salirte del grupo")){
      axios
      .post(
        `https://ivan.informaticamajada.es/api/leaveGroup/${currentGroup.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
              }`, // Asegúrate de ajustar esta parte según tu implementación de autenticación
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log("Saliste del grupo exitosamente");
        // Aquí puedes realizar cualquier otra acción necesaria, como actualizar la interfaz de usuario.
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al salir del grupo:", error);
      });
    }
  };

  
  return (
    <div className="flex-1 flex flex-col bg-white ">
      <div className="w-full bg-[#4aa88f] p-4  flex items-center h-16">
        {/* Perfil del usuario al que se habla */}
        <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
          <img
            src={
              currentGroup.image
                ? "https://ivan.informaticamajada.es/" + currentGroup.image
                : "/default-user.webp"
            }
            alt="Canal de Usuario"
            className="w-full h-full object-cover"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          />
          <dialog id="my_modal_3" className="modal ">
            <div className="modal-box border border-grey p-6 bg-[#4aa88f] rounded-lg shadow-lg">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* Imagen del grupo */}
              <div className="flex justify-center">
                <img
                  src={
                    currentGroup.image
                      ? "https://ivan.informaticamajada.es/" + currentGroup.image
                      : "/default-user.webp"
                  }
                  alt="Imagen del Grupo"
                  className="w-20 h-20 rounded-full object-cover mb-2 cursor-pointer"
                />

              </div>

              {/* Nombre del grupo */}
              <h3 className="text-lg text-white font-bold text-center mb-2">{currentGroup.name}</h3>

              {/* Descripción del grupo */}
              <p className="text-sm mb-2 text-white text-center">{currentGroup.description}</p>

              {/* ID del grupo con estilo decorativo */}
              <div className="border-2 border-gray-300 rounded p-2 mb-4 text-center bg-[#41947d] cursor-pointer hover:opacity-80 transition-opacity">
                <span className="font-bold mr-2 text-white">ID del Grupo:</span>
                <span className="text-white">{currentGroup.id}</span>
              </div>

              {/* Lista de usuarios asociados al grupo */}
              <h4 className="font-bold mb-2 text-white">Usuarios asociados:</h4>
              <div className="overflow-y-auto max-h-60">
                {/* Mapeo de la lista de usuarios asociados */}
                {currentGroup.users &&
                  currentGroup.users.map((user, index) => (
                    <div className="flex items-center mb-2 " key={index}>
                      {/* Imagen del usuario */}
                      <img
                        src={
                          user.image
                            ? "https://ivan.informaticamajada.es/" + user.image
                            : "/default-user.webp"
                        }
                        alt="Avatar Usuario"
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      {/* Nombre del usuario */}
                      <p className="text-white">{user.name}</p>
                      {user.id !== altUser.user.id && (
                        <button className="btn btn-sm bg-red-400 hover:bg-red-500 text-white rounded-md px-3 py-1 ms-10" onClick={() => { blockUser(user.id) }}>Bloquear al usuario</button>
                      )}
                    </div>
                  ))}
              </div>

              {/* Botones para bloquear el grupo y salir del grupo */}
              <div className="flex justify-center mt-4">
                {/* Botón para bloquear el grupo con estilo toggle */}
                <button className="btn btn-sm bg-red-400 hover:bg-red-500 text-white rounded-md px-3 py-1 mr-2">
                  Bloquear Grupo
                </button>
                {/* Botón para salir del grupo */}
                <button
                  className="btn btn-sm bg-red-400 hover:bg-red-500 text-white rounded-md px-3 py-1"
                  onClick={leaveGroup}
                >
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
          <h2 className="text-lg font-semibold cursor-pointer text-white" onClick={() => document.getElementById("my_modal_3").showModal()}>
            {currentGroup.name}

          </h2>
          <p className="text-white text-sm pt-[-0.2em] cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>
            {currentGroup.description}
          </p>
        </div>
        <div className=" items-center">
          <button
            className="text-white me-2 mt-2 text-xl hover:bg-purple-600 transition-colors duration-300 tooltip  tooltip-bottom rounded-full flex items-center justify-center w-9 h-9 "
            data-tip="Scroll"
            onClick={() => {
              scrollToBottom();
            }}
          >
            <GoArrowDown size={26} />
          </button>
        </div>
        <div className=" items-center">
          <button
            className="text-white mt-2 text-xl hover:bg-purple-600 transition-colors duration-300 tooltip  tooltip-bottom rounded-full flex items-center justify-center w-9 h-9"
            data-tip="Refresh"
            onClick={() => {
              fetchMessages();
            }}
          >
            <IoReload size={24} />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-full pb-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-gray-100 rounded-lg">
        {mensajeData.map((value, index) => (
          <div
            className={`chat ${value.user_id == user.user.id ? "chat-end" : "chat-start"
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
                      : "/default-user.webp"
                  }
                />
              </div>
              {value.user_id === user.user.id && (
                <button
                  className="hidden group-hover:block text-gray-600 hover:text-red-500 z-50  tooltip tooltip-left tooltip-error "
                  data-tip="Delete Message"
                  onClick={() => deleteMessage(value.id)}
                >
                  <FaTimes size={20} /> {/* Utilizar el ícono de una "X" */}
                </button>
              )}
            </div>
            <div className="chat-header">
              {value.user_id == user.user.id ? user.user.name : "Chatero"}
            </div>
            <div className="chat-bubble">
              {" "}
              {value.image && value.image.url !== null && (
                <img
                  src={`https://ivan.informaticamajada.es/storage/${quitarPublic(
                    value.image.url
                  )}`}
                  alt="Image"
                  className="w-full max-w-96 max-h-96 object-contain mx-auto block" // Establecer un tamaño máximo para la imagen
                />
                
              )}
              {value.image && value.image.url !== null && value.image.url.slice(-3) == "mp3" && (
                <audio controls src={`https://ivan.informaticamajada.es/storage/${quitarPublic(
                  value.image.url
                )}`}
                alt="Image"
                className="w-full max-w-96 max-h-96 object-contain mx-auto block" ></audio>
              )}
              {value.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Referencia a la última conversación */}
      </div>
      <div className="flex-1"></div>{" "}
      {/* Espacio flexible para empujar el contenido hacia arriba */}
      <div className={`${uploadDesp ? "block" : "hidden"}  bg-[#4aa88f] mb-4 ms-4 rounded-xl p-2 w-96 h-40 justify-center`}>
        <input type="file" name="subida" id="subida" className="text-white" onChange={(e) => { setSelectedFile(e.target.files[0]); }} />
        <button onClick={() => { sendMessageWithImage() }} className="bg-blue-500 p-1 rounded-xl text-white m-1 hover:scale-105 transition-all">Subir la Imagen</button>
      </div>
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
            id="messageInput"
            value={currentMessage}
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
        {/* Botón para abrir el selector de archivos */}
        <div className="transition-transform transform hover:scale-105 focus:outline-none p-2 ml-1 mr-1" onClick={() => { setUploadDesp(!uploadDesp) }}>
          <FcAddImage size={43} />
        </div>
        {/* <input
          type="file"
          onChange={(e) => {setSelectedFile(e.target.files[0]); setTimeout(sendMessageWithImage(),1500)}}
          className="hidden"
          id="fileInputImage"
        /> */}
      </div>
    </div>
  );
}

export default ChatMessages;
