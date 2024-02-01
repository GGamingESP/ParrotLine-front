// UserProfile.js
import { useState } from "react";
import { FaCog } from "react-icons/fa";

function UserProfile() {
  // ... tu lógica para el perfil
  const [isHovered, setHovered] = useState(false);
  const [isEditMode, setEditMode] = useState(false);



  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = useState(false);
  const [name, setName] = useState('John'); // Cambia 'Tu Nombre' por el nombre actual
  const [description, setDescription] = useState('Tu Descripción'); // Cambia 'Tu Descripción' por la descripción actual // Cambia 'Tu Descripción' por la descripción actual

  const [ setSelectedFile] = useState(null);
  
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Enviar automáticamente la imagen como mensaje
    }
  };



  return (
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
  );
}

export default UserProfile;