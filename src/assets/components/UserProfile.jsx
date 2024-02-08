// UserProfile.js
import { useState, useEffect } from "react";
import { FaCog, FaUserCircle, FaPen, FaPaintBrush, FaSignOutAlt } from "react-icons/fa";
import axios
  from "axios";
function UserProfile() {
  const [isHovered, setHovered] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = useState(false);
  const [name, setName] = useState('John');
  const [description, setDescription] = useState('Tu Descripción');
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleImageChange(file); // Pasar el archivo a handleImageChange
      handleSaveChanges(); // Llamar a handleSaveChanges después de seleccionar el archivo
    }
  };

  const handleSaveChanges = () => {
    setEditMode(false);
  };

  const handleUpdateName = () => {

    // Actualizar el sessionStorage después de la respuesta exitosa del servidor
    const updatedUser = {
      ...JSON.parse(sessionStorage.getItem("currentUser")),
      user: {
        ...JSON.parse(sessionStorage.getItem("currentUser")).user,
        name,
      },
    };
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Finalizar el modo de edición
    setNameEditMode(false);
  };

  const handleImageChange = (file) => {
    // Verificar el tamaño del archivo
    if (file.size <= 2 * 1024 * 1024) { // 2 megabytes
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      // Actualizar imagen en la sesión
      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      const updatedUser = { ...user, user: { ...user.user, image: imageURL } };
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Subir la imagen al servidor
      const formData = new FormData();
      formData.append('imagen', file);
      let token = user.token
      axios.post('https://ivan.informaticamajada.es/api/saveUserImage', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          // Manejar la respuesta del servidor
          if (response.ok) {
            console.log('Imagen subida correctamente.');
          } else {
            console.error('Error al subir la imagen:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error al subir la imagen:', error);
        });
    } else {
      alert('La imagen excede el límite de tamaño de 2 megabytes.');
    }
  };

  const handleUpdateDescription = () => {
    // Lógica para enviar cambios al servidor
    // ...

    // Actualizar el sessionStorage después de la respuesta exitosa del servidor
    const updatedUser = {
      ...JSON.parse(sessionStorage.getItem("currentUser")),
      user: {
        ...JSON.parse(sessionStorage.getItem("currentUser")).user,
        description,
      },
    };
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Finalizar el modo de edición
    setDescriptionEditMode(false);
  };

  const handleLogout = () => {
    // Elimina el token y cualquier otra información de sesión
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');

    // Redirige a la página de inicio de sesión
    window.location.href = "/Login"
  };


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
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
        <img
          className="w-full h-full object-cover transition-transform transform hover:scale-105 filter hover:blur-sm"
          onClick={() => document.getElementById('modal_1').showModal()}
          src={image}
          alt="User profile"
        />
      </div>
      <div className="ml-1 flex items-center">
        <h3 className="text-2xl text-white font-semibold mr-2">{name}</h3>
        {/* Botón de ajustes */}
        <div className="relative ml-16 mt-3">
          <button className="text-white hover:text-gray-700" onClick={() => document.getElementById('modal_1').showModal()}>
            <FaCog size={22} />
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
                >
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      handleFileChange(e);
                      handleImageChange(); // Actualiza la imagen al seleccionar un archivo
                      handleSaveChanges(); // Envía automáticamente la imagen al seleccionar un archivo
                    }}
                  />
                  <img
                    src={image}
                    alt="Avatar Logo"
                    className={`w-20 h-20 rounded-full object-cover ${isHovered ? 'filter blur-sm' : ''}`}
                  />

                  {isHovered && (
                    <span
                      className="absolute top-0 right-0 m-2 cursor-pointer text-xl text-gray-500"
                      title="Personalizar"
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      🎨
                    </span>
                  )}
                  {isEditMode && (
                    <div className="absolute bg-white p-4 border rounded">
                      <label className="block mb-2 text-gray-600 cursor-pointer">
                        Seleccionar archivo
                        <input type="file" className="hidden" onChange={handleFileChange} />
                      </label>
                      <button
                        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded "
                        onClick={handleSaveChanges}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/*Nombre*/}
              <div className="text-lg font-semibold mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-blue-500 cursor-pointer  transition-transform transform hover:scale-105" onClick={() => setNameEditMode(!isNameEditMode)}>
                    <FaUserCircle className="inline-block mr-2" size={18} />
                    Name: {name}
                  </h4>
                </div>
                {isNameEditMode ? (
                  <>
                    <textarea
                      value={name}
                      onChange={handleNameChange}
                      className="w-full border p-2 rounded"
                      placeholder="Write your name..."
                    />
                    <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded focus:outline-none  transition-transform transform hover:scale-105" onClick={handleUpdateName}>
                      Guardar
                    </button>
                  </>
                ) : null}
              </div>



              {/* Descripción */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-blue-500 cursor-pointer focus:outline-none  transition-transform transform hover:scale-105" onClick={handleDescriptionEdit}>
                    <FaPen className="inline-block mr-2" size={18} />
                    Description
                  </h4>
                </div>
                {isDescriptionEditMode && (
                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border p-2 rounded"
                      placeholder="Write your Description..."
                    />
                    {/* Botón de Guardar */}
                    <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded  transition-transform transform hover:scale-105" onClick={handleUpdateDescription}>
                      Guardar
                    </button>
                  </div>
                )}
              </div>

              {/* Personalización */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <button
                    className="text-lg font-semibold text-blue-500 cursor-pointer focus:outline-none transition-transform transform hover:scale-105"
                    onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                  >
                    <FaPaintBrush className="inline-block mr-2" size={18} />
                    Personalization
                  </button>
                </div>
                {isCustomizationOpen && (
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="text-lg font-semibold">Selecciona un color:</div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-full cursor-pointer bg-gray-500  transition-transform transform hover:scale-105"
                        onClick={() => handleColorChange('#FF0000')}
                      ></div>
                      <div
                        className="w-8 h-8 rounded-full cursor-pointer bg-green-500  transition-transform transform hover:scale-105"
                        onClick={() => handleColorChange('#00FF00')}
                      ></div>
                      <div
                        className="w-8 h-8 rounded-full cursor-pointer bg-blue-500  transition-transform transform hover:scale-105"
                        onClick={() => handleColorChange('#0000FF')}
                      ></div>
                      {/* Agrega más colores aquí según sea necesario */}
                    </div>
                  </div>
                )}
              </div>


              {/* Logout */}
              <button
                className="text-red-500 text-lg font-semibold cursor-pointer focus:outline-none transition-transform transform hover:scale-105"
                onClick={() => handleLogout()}
              >
                <FaSignOutAlt className="inline-block mr-2" size={18} />
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
    </div >
  );
}

export default UserProfile;