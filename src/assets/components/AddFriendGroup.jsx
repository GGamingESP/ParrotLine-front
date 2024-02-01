import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";

function AddFriendGroup() {
  const [friendRequests, setFriendRequests] = useState([]);

  return (
    <div className="flex items-center justify-center space-x-4 mb-4">
      <button className="text-white hover:text-gray-700" onClick={() => document.getElementById('modal_add_friend').showModal()}>
        <FaUserPlus size={24} />
      </button>
      <button className="text-white hover:text-gray-700" onClick={() => document.getElementById('modal_add_group').showModal()}>
        <MdGroupAdd size={24} />
      </button>

      {/* Modal Agregar Amigo */}
      <FriendModal id="modal_add_friend" buttonText="Enviar Solicitud" />

      {/* Modal Agregar Grupo */}
      <GroupModal id="modal_add_group" friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
    </div>
  );
}

function FriendModal({ id, buttonText }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box p-4">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h2>Tu id:</h2>
        <input
          type="text"
          placeholder="ID del amigo"
          className="w-full border p-2 rounded"
        />
        <button className="mt-2 px-2 py-1 bg-blue-500 text-white rounded">
          {buttonText}
        </button>
      </div>
      
      
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function GroupModal({ id, friendRequests, setFriendRequests }) {
  // Aquí puedes agregar lógica para aceptar y rechazar solicitudes de amigos

  return (
    <dialog id={id} className="modal">
      <div className="modal-box p-4">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById(id).close()}>✕</button>
        </form>

        <div>
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

        <div className="mt-4">
          <h2>Solicitudes Pendientes</h2>
          {friendRequests.length === 0 ? (
            <p>No tienes solicitudes pendientes.</p>
          ) : (
            <ul>
              {friendRequests.map((request, index) => (
                <li key={index}>
                  <span>ID: {request.id}</span>
                  {/* Agrega lógica para aceptar y rechazar solicitudes */}
                  <button>Aceptar</button>
                  <button>Rechazar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddFriendGroup;
