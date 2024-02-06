import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { Form } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
      <FriendModal id="modal_add_friend" buttonText="Enviar Solicitud" friendRequests={friendRequests} setFriendRequests={setFriendRequests} />

      {/* Modal Agregar Grupo */}
      <GroupModal id="modal_add_group" friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
    </div>
  );
}

function FriendModal() {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const [friendRequest, SetRequest] = useState([]);
  const [friendhtml, setfriendhtml] = useState([]);

  useEffect(() => {
    axios.get(`https://ivan.informaticamajada.es/api/friendsAndRequest`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      console.log(response);
      SetRequest(response.data);
      let predata = response.data.data.filter((value) => { return value.accepted == false })
      console.log(predata)
      const datos = predata.map((request, index) => (
        <li key={index}>
          <span>ID: {request.friend_id}</span>
          <button value={request.friend_id} onClick={AcceptFriend}>Aceptar</button>
          <button value={request.friend_id} onClick={RejectFriend}>Rechazar</button>
        </li>
      ));
      setfriendhtml(datos);
    }).catch(function (error) {
      console.error('Error al obtener solicitudes de amigos:', error);
      toast.error('Error al obtener solicitudes de amigos. Por favor, inténtalo de nuevo.');
    });
  }, []);

  function AcceptFriend(event) {
    axios.get(`https://ivan.informaticamajada.es/api/acceptRequest/${event.target.value}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then().catch(function (error) {
      console.error('Error al aceptar solicitud de amigo:', error);
      toast.error('Error al aceptar solicitud de amigo. Por favor, inténtalo de nuevo.');
    });
  }

  function RejectFriend(event) {
    // Lógica para rechazar la solicitud de amigo
  }

  function SendFriendRequest(event) {
    event.preventDefault();
    const id = event.target.FriendId.value;
    const token = user.token;
    axios.get(`https://ivan.informaticamajada.es/api/sendRequest/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then().catch(function (error) {
      console.error('Error al enviar solicitud de amigo:', error);
      toast.error('Error al enviar solicitud de amigo. Por favor, inténtalo de nuevo.');
    });
  }

  return (
    <dialog id="modal_add_friend" className="modal">
      <div className="modal-box p-4">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("modal_add_friend").close()}>✕</button>
        </form>

        <div>
          <h2>Tu id: {JSON.parse(sessionStorage.getItem("currentUser")).user.id}</h2>
          <form onSubmit={SendFriendRequest}>
            <input
              type="text"
              name="FriendId"
              placeholder="ID del amigo"
              className="w-full border p-2 rounded"
            />
            <button type="submit" className="mt-2 px-2 py-1 bg-blue-500 text-white rounded">
              Enviar Solicitud
            </button>
          </form>
        </div>

        <div className="mt-4">
          <h2>Solicitudes Pendientes</h2>
          {friendRequest.length === 0 ? (
            <p>No tienes solicitudes pendientes.</p>
          ) : (
            <ul>
              {friendhtml}
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

function GroupModal() {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  function createGroup(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    const groupName = event.target.groupName.value;
    const groupDescription = event.target.groupDescription.value;

    // Envía la solicitud al servidor con los datos del grupo
    axios.post(
      "https://ivan.informaticamajada.es/api/group",
      {
        name: groupName,
        description: groupDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        // Maneja la respuesta del servidor
        console.log(response);
        // Cierra el modal después de enviar la solicitud
        document.getElementById("modal_add_group").close();
      })
      .catch((error) => {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error("Error al crear el grupo:", error);
        toast.error("Error al crear el grupo. Por favor, inténtalo de nuevo.");
      });
  }

  return (
    <dialog id="modal_add_group" className="modal">
      <div className="modal-box p-4">
        <form onSubmit={createGroup}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("modal_add_group").close()}
          >
            ✕
          </button>

          <div>
            <h2>Crea el grupo:</h2>
            <input
              type="text"
              name="groupName" // Nombre del grupo
              placeholder="Nombre del grupo"
              className="w-full border p-2 rounded"
              required // Campo requerido
            />
            <textarea
              name="groupDescription" // Descripción del grupo
              placeholder="Descripción del grupo"
              className="w-full border p-2 rounded mt-2"
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Crear Grupo
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <ToastContainer />
    </dialog>
  );
}

export default AddFriendGroup;
