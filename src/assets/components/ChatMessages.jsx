import { useEffect, useState, useContext  } from "react";
import { FaSmile, FaPlus, FaEllipsisV, FaPaperPlane } from 'react-icons/fa';
import { IoReload } from "react-icons/io5";
import MyCurrentGroupContext from '../components/CurrentGroupContext';
import axios from 'axios';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaDesp, setMediaDesp] = useState(false);
  // const [mensaje, setMensaje] = useState([]);
  const [mensajeData, setMensajeData] = useState([]);
  const currentGroup = useContext(MyCurrentGroupContext);

  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  // useEffect para cuando se cambia de grupo

  const fetchMessages = async () => {
    if (currentGroup && currentGroup.id) {
      const response = await axios.get(
        `https://ivan.informaticamajada.es/api/groupmessages/${currentGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("currentUser")).token
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setMessages(response.data.data);
      setMensajeData(response.data.data);
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log(currentGroup);
  }, [currentGroup]); // Se ejecuta cada vez que el grupo actual seleccionado cambia

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

  // useEffect(() => {
  //   const drawMessages = () => {
  //     setMensaje(
  //       mensajeData.map((value) => {
  //         <div className="chat chat-start">
  //           <div className="chat-image avatar">
  //             <div className="w-10 rounded-full">
  //               <img
  //                 alt="Tailwind CSS chat bubble component"
  //                 src={
  //                   value.image
  //                     ? "https://ivan.informartica.es/" + value.image
  //                     : "/public/default-user.png"
  //                 }
  //               />
  //             </div>
  //           </div>
  //           <div className="chat-header">
  //             {value.user_id == user.user.id ? user.user.name : "Chatero"}
  //           </div>
  //           <div className="chat-bubble">{value.text}</div>
  //         </div>;
  //       })
  //     );
  //   };
  //   drawMessages();
  //   // setMessages(initialMessages);
  // }, [mensajeData]);

  const deleteMessage = (id) => {
    axios.delete(`https://ivan.informaticamajada.es/api/message/${id}`,{
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem("currentUser")).token
        }`,
        "Content-Type": "application/json",
      },
    }).then(function(response) {
      fetchMessages();
    }).catch(error => {
      console.error(error);
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTimeout(()=>{sendMessageWithImage();}, 2000)
    }
  };

  const sendMessageWithImage = () => {
    // Obtener la hora actual
    // const currentTime = new Date();
    // const hours = currentTime.getHours();
    // const minutes = currentTime.getMinutes();
    // const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    // Crear el nuevo mensaje con la hora actual y la imagen
    // const newMessage = {
    //   user: "John",
    //   text: "",
    //   file: imageFile,
    //   time: formattedTime,
    //   timestamp: currentTime.getTime(), // Guardar el timestamp del mensaje
    // };
    const formData = new FormData();

    formData.append("user_id", user.user.id);
    formData.append("group_id", currentGroup.id);
    formData.append("text", " ");
    formData.append("imagen", selectedFile)

    console.log(formData)

    axios.post(`https://ivan.informaticamajada.es/api/createMessageWithImage`, {
      user_id: user.user.id,
      group_id: currentGroup.id,
      text: " ",
      imagen: selectedFile
    },{
      headers: {
        "Authorization": `Bearer ${
          JSON.parse(sessionStorage.getItem("currentUser")).token
        }`,
        "Content-Type": "application/json",
      },
    }).then(function(response) {
      fetchMessages();
    }).catch(error => {
      console.error(error);
    })

    // Agregar el mensaje al estado
    // setMessages([...messages, newMessage]);

    // Limpiar la selección de archivo
    setSelectedFile(null);
  };

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      // Obtener la hora actual
      // const currentTime = new Date();
      // const hours = currentTime.getHours();
      // const minutes = currentTime.getMinutes();
      // const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

      // // Crear el nuevo mensaje con la hora actual y el texto con emoji
      // const newMessage = {
      //   user: "John",
      //   text: currentMessage,
      //   time: formattedTime,
      // };

      axios.post(`https://ivan.informaticamajada.es/api/message`, {
      user_id: user.user.id,
      group_id: currentGroup.id,
      text: currentMessage
        },{
      headers: {
        "Authorization": `Bearer ${
          JSON.parse(sessionStorage.getItem("currentUser")).token
        }`,
        'Content-Type': 'application/json'
      },
      }).then(function(response) {
        fetchMessages();
      }).catch(error => {
        console.error(error);
      })

      // Limpiar el campo de mensaje actual y el emoji seleccionado
      setCurrentMessage("");
    }
  };

  // setInterval( async () => {
  //   await fetchMessages();
  // }, 5000)

  return (
    <div className="flex-1 flex flex-col bg-white ">
      <div className="w-full bg-[#4aa88f] p-4 mb-4 flex items-center h-16">
        {/* Perfil del usuario al que se habla */}
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={
              currentGroup.image
                ? "https://ivan.informaticamajada.es/" + currentGroup.image
                : "/public/default-user.png"
            }
            alt="Canal de Usuario"
            className="w-full h-full object-cover"
          />
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
          <button className="text-white me-4 text-xl" size={27} onClick={() => {fetchMessages()}}><IoReload /></button>
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
      <div className="overflow-y-auto max-h-[calc(100vh-64px)] pb-4 px-4">
        {
          mensajeData.map((value, index) => 
            <div className={`chat ${value.user_id == user.user.id ? "chat-end": "chat-start"}`} key={index}>
              <div className="chat-image avatar group">
                <div className="w-10 rounded-full">
                  <img
                    alt="user image"
                    src={
                      value.image
                        ? "https://ivan.informartica.es/" + value.image
                        : "/public/default-user.png"
                    }
                  />
                  
                </div>
                {value.user_id == user.user.id ? <button className="hidden group-hover:block text-black z-50 opacity-80" onClick={() => deleteMessage(value.id)}>X</button> : ""}
              </div>
              <div className="chat-header">
                {value.user_id == user.user.id ? user.user.name : "Chatero"}
              </div>
              <div className="chat-bubble">{value.text}</div>
            </div>
          )
        }
        
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
            className="text-gray-500 p-2 hover:text-gray-700"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <FaSmile size={27} />
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
            className="text-gray-500 p-2 hover:text-gray-700 cursor-pointer ml-2"
          >
            <FaPlus size={27} />
          </label>
      </div>
    </div>
  );
}

export default ChatMessages;