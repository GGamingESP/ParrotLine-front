// IMPORTS REACT
import { useState, useEffect } from "react";
// LOGOS
import { FaCog, FaUserCircle, FaPen, FaPaintBrush, FaSignOutAlt } from "react-icons/fa";
// IMPORTS NECESIDADES
import axios from "axios";
// FUNCION PRINCIPAL
function UserProfile() {
  // ESTADOS
  const [isHovered, setHovered] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleNameEdit = () => {
    setNameEditMode(!isNameEditMode);
  };

  const handleDescriptionEdit = () => {
    setDescriptionEditMode(!isDescriptionEditMode);
  };
  // HANDLERS CAMBIO DE NOMBRE
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };
  // HANDLERS CAMBIO DE DESCRIPCION
  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  // FUNCION QUITAR /PUBLIC PRINCIPIO STRINGS
  function quitarPublic(str) {
    // Longitud de "public/"
    const publicLength = 7;

    // Corta la cadena desde el índice publicLength
    return str.slice(publicLength);
  }

  // FUNCION CAMBIAR FOTO DEL USUARIO
  const handleImageChange = () => {
    // Verificar el tamaño del archivo y otras validaciones...
    // 2 megabytes
    let formData = new FormData();
    formData.append("imagen", selectedFile);
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const token = user.token;

    // Subir la imagen al servidor
    axios.post("https://ivan.informaticamajada.es/api/saveUserImage", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        // Manejar la respuesta del servidor
        if (response.status === 200) {
          console.log("Imagen subida correctamente.");
          // Actualizar la imagen en el estado local
          setImage(response.data.url);
        } else {
          console.error("Error al subir la imagen:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error al subir la imagen:", error);
      });
  };

  // FUNCION CAMBIAR NOMBRE DEL USUARIO
  const handleUpdateName = () => {
    // Realizar la solicitud al servidor para actualizar el nombre de usuario
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const token = user.token;

    axios
      .put(
        `https://ivan.informaticamajada.es/api/user/${user.user.id}`,
        { name: editedName, description: user.user.description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log("Nombre de usuario actualizado correctamente:", response.data);
        // Actualizar el nombre de usuario localmente
        setName(editedName);
        // Finalizar el modo de edición
        setNameEditMode(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el nombre de usuario:", error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      });
  };

  // FUNCION CAMBIAR DESCRIPCION DEL USUARIO
  const handleUpdateDescription = () => {
    // Realizar la solicitud al servidor para actualizar la descripción del usuario
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const token = user.token;

    axios
      .put(
        `https://ivan.informaticamajada.es/api/user/${user.user.id}`,
        { name: user.user.name, description: editedDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log("Descripción de usuario actualizada correctamente:", response.data);
        // Actualizar la descripción del usuario localmente
        setDescription(editedDescription);
        // Finalizar el modo de edición
        setDescriptionEditMode(false);
      })
      .catch((error) => {
        console.error("Error al actualizar la descripción de usuario:", error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      });
  };

  // HANDLER PARA HACER LOGOUT
  const handleLogout = () => {
    // Elimina el token y cualquier otra información de sesión
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentUser");

    // Redirige a la página de inicio de sesión
    window.location.href = "/Login";
  };

  // VALORES DEL USUARIO
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user) {
      setName(user.user.name);
      setDescription(user.user.description);
      setImage(user.user.image);
    }
  }, []);


  return (
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
        <img
          className="w-full h-full object-cover transition-transform transform hover:scale-105 filter hover:blur-sm cursor-pointer"
          onClick={() => document.getElementById('my_modal_2').showModal()}
          src={user.user.image
            ? "https://ivan.informaticamajada.es/storage/" + quitarPublic(user.user.image.url)
            : "/default-user.webp"}
          alt="User profile"
        />

        {/* Modal para subir imagen perfil usuario*/}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">SUBIR IMAGEN</h3>
            <p className="py-4">Suba la imagen que deseea tener en el perfil</p>

            <input type="file" name="subida" id="subida" className="text-white" onChange={(e) => { setSelectedFile(e.target.files[0]); }} />
            <button onClick={() => { handleImageChange() }} className="bg-blue-500 p-1 rounded-xl text-white m-1 hover:scale-105 transition-all">Subir la Imagen</button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="flex items-center">
        {name.length > 7 ? (
          <h3 className="text-2xl text-white font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{name.substring(0, 7)}...</h3>
        ) : (
          <h3 className="text-2xl text-white font-semibold">{name}</h3>
        )}
        {/* Botón de ajustes */}
        <div className="relative ml-4">
          <button
            className="text-white hover:bg-yellow-400 transition-colors duration-300 tooltip tooltip-bottom rounded-full flex items-center justify-center w-9 h-9"
            data-tip="Settings"
            onClick={() => document.getElementById("modal_1").showModal()}
          >
            <FaCog size={22} />
          </button>

          <dialog id="modal_1" className="modal">
            <div className="modal-box p-4 border-grey bg-[#4aa88f] rounded-lg shadow-lg">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("modal_1").close()}
                >
                  ✕
                </button>
              </form>

              {/* Nombre */}
              <div className="text-lg font-semibold mb-4 bg-blue-500 text-white rounded-lg p-2">
                <h4
                  className="text-lg font-semibold cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => setNameEditMode(!isNameEditMode)}
                >
                  <FaUserCircle className="inline-block mr-2" size={18} />
                  Name: {name}
                </h4>
              </div>
              {isNameEditMode ? (
                <>
                  <textarea
                    value={editedName}
                    onChange={handleNameChange}
                    className="w-full border p-2 rounded"
                    placeholder={name}
                  />
                  <button
                    className="mt-2 mb-3 px-2 py-1 bg-blue-500 text-white rounded focus:outline-none transition-transform transform hover:scale-105"
                    onClick={handleUpdateName}
                  >
                    Guardar
                  </button>
                </>
              ) : null}

              {/* Descripción */}
              <div className="mb-4 bg-blue-500 text-white rounded-lg p-2">
                <h4
                  className="text-lg font-semibold cursor-pointer focus:outline-none transition-transform transform hover:scale-105"
                  onClick={handleDescriptionEdit}
                >
                  <FaPen className="inline-block mr-2" size={18} />
                  Description
                </h4>
              </div>
              {isDescriptionEditMode && (
                <div>
                  <textarea
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                    className="w-full border p-2 rounded"
                    placeholder={description}
                  />
                  {/* Botón de Guardar */}
                  <button
                    className="mt-2 mb-3 px-2 py-1 bg-blue-500 text-white rounded  transition-transform transform hover:scale-105"
                    onClick={handleUpdateDescription}
                  >
                    Guardar
                  </button>
                </div>
              )}

              {/* Personalización */}
              <div className="mb-4 bg-blue-500 text-white rounded-lg p-2">
                <button
                  className="text-lg font-semibold cursor-pointer focus:outline-none transition-transform transform hover:scale-105"
                  onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                >
                  <FaPaintBrush className="inline-block mr-2" size={18} />
                  Personalization
                </button>
              </div>
              {isCustomizationOpen && (
                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-lg text-white font-semibold mb-3">
                    Selecciona un color:
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-8 h-8 mb-3 rounded-full cursor-pointer bg-gray-500  transition-transform transform hover:scale-105"
                      onClick={() => handleColorChange("#FF0000")}
                    ></div>
                    <div
                      className="w-8 h-8 mb-3 rounded-full cursor-pointer bg-green-500  transition-transform transform hover:scale-105"
                      onClick={() => handleColorChange("#00FF00")}
                    ></div>
                    <div
                      className="w-8 h-8 mb-3 rounded-full cursor-pointer bg-blue-500  transition-transform transform hover:scale-105"
                      onClick={() => handleColorChange("#0000FF")}
                    ></div>
                    {/* Agrega más colores aquí según sea necesario */}
                  </div>
                </div>
              )}

              {/* Logout */}
              <div className="bg-red-500 text-white rounded-lg p-2">
                <button
                  className="text-lg font-semibold cursor-pointer focus:outline-none transition-transform transform hover:scale-105"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="inline-block mr-2" size={18} />
                  Logout
                </button>
              </div>
            </div>

            <form
              method="dialog"
              className="modal-backdrop"
              onClick={() => document.getElementById("modal_1").close()}
            >
              {/* Fondo para cerrar el modal al hacer clic fuera */}
            </form>
          </dialog>
        </div>
      </div>

    </div>
  );
}


export default UserProfile;
