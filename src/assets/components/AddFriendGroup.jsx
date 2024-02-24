import { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import {
  FaTimes,
  FaPlusCircle,
  FaUsers,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";
import { Form } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function AddFriendGroup() {
  const [friendRequests, setFriendRequests] = useState([]);

  return (
    <div className="flex items-center justify-center space-x-4 mb-4">
      <button
        className="text-white  hover:bg-blue-600 transition-colors duration-300 tooltip rounded-full flex items-center justify-center w-9 h-9"
        data-tip="Add Friend"
        onClick={() => document.getElementById("modal_add_friend").showModal()}
      >
        <FaUserPlus size={24} />
      </button>

      <button
        className="text-white  hover:bg-purple-600 transition-colors duration-300 tooltip rounded-full flex items-center justify-center w-9 h-9"
        data-tip="Create a Group"
        onClick={() => document.getElementById("modal_add_group").showModal()}
      >
        <MdGroupAdd size={27} />
      </button>

      <button
        className="text-white  hover:bg-indigo-600 transition-colors duration-300 tooltip rounded-full flex items-center justify-center w-9 h-9"
        data-tip="Join a Group"
        onClick={() => document.getElementById("modal_invite_group").showModal()}
      >
        <FaUsers size={26} />
      </button>


      {/* Modal Agregar Amigo */}
      <FriendModal
        id="modal_add_friend"
        buttonText="Enviar Solicitud"
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
      />

      {/* Modal Agregar Grupo */}
      <GroupModal
        id="modal_add_group"
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
      />

      {/* Modal Ingresar a un Grupo */}
      <InviteGroupModal
        id="modal_invite_group"
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
      />
    </div>
  );
}
function InviteGroupModal() {
  const [groupId, setGroupId] = useState(""); // Estado para almacenar la ID del grupo

  const handleSubmit = () => {
    try {
      // Enviar una solicitud al backend para unirse al grupo con la ID proporcionada
      axios.post(
        `https://ivan.informaticamajada.es/api/joinGroup/${groupId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      // Manejar la respuesta del backend según sea necesario
      // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o actualizar el estado de tu aplicación
    } catch (error) {
      // Manejar errores, como mostrar un mensaje de error al usuario
      console.error("Error al unirse al grupo:", error);
    }
  };

  return (
    <dialog id="modal_invite_group" className="modal">
      <div className="modal-box border border-grey p-6 bg-[#4aa88f] rounded-lg shadow-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={() => document.getElementById("modal_invite_group").close()}
        >
          <FaTimes size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Join a Group
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="GroupID"
              onChange={(e) => setGroupId(e.target.value)}
              placeholder="Group ID"
              className="w-full border text-white border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white rounded-md px-6 py-3 transition duration-300 hover:bg-blue-600"
            >
              <FaUserPlus className="inline-block mr-2" size={18} />
              Enter the Group
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function FriendModal() {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const [friendRequest, SetRequest] = useState([]);
  const [friendhtml, setfriendhtml] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ivan.informaticamajada.es/api/friendsAndRequest`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        SetRequest(response.data);
        let predata = response.data.data.filter((value) => {
          return value.accepted == false;
        });
        console.log(predata);
        const datos = predata.map((request, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-3"
          >
            <span className="text-lg font-semibold">
              ID: {request.friend_id}
            </span>
            <button
              value={request.friend_id}
              onClick={AcceptFriend}
              className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
            >
              <FaCheck className="inline-block mr-1" /> Aceptar
            </button>
            <button
              value={request.friend_id}
              onClick={RejectFriend}
              className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
            >
              <FaTimes className="inline-block mr-1" /> Rechazar
            </button>
          </li>
        ));
        setfriendhtml(datos);
      })
      .catch(function (error) {
        console.error("Error al obtener solicitudes de amigos:", error);
        toast.error(
          "Error al obtener solicitudes de amigos. Por favor, inténtalo de nuevo."
        );
      });
  }, []);

  function AcceptFriend(event) {
    axios
      .get(
        `https://ivan.informaticamajada.es/api/acceptRequest/${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then()
      .catch(function (error) {
        console.error("Error al aceptar solicitud de amigo:", error);
        toast.error(
          "Error al aceptar solicitud de amigo. Por favor, inténtalo de nuevo."
        );
      });
  }

  function RejectFriend(event) {
    // Lógica para rechazar la solicitud de amigo
  }

  function SendFriendRequest(event) {
    event.preventDefault();
    const id = event.target.FriendId.value;
    const token = user.token;
    axios
      .get(`https://ivan.informaticamajada.es/api/sendRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then()
      .catch(function (error) {
        console.error("Error al enviar solicitud de amigo:", error);
        toast.error(
          "Error al enviar solicitud de amigo. Por favor, inténtalo de nuevo."
        );
      });
  }

  return (
    <dialog id="modal_add_friend" className="modal">
      <div className="modal-box border border-grey p-6 bg-[#4aa88f] rounded-lg shadow-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("modal_add_friend").close()}
        >
          <FaTimes size={20} />
        </button>

        <div>
          <h3 className="font-bold text-xl text-white mb-4">ADD A FRIEND</h3>

          <h2 className="text-xl font-semibold mb-4 text-white">
            Your ID: {JSON.parse(sessionStorage.getItem("currentUser")).user.id}
          </h2>
          <form onSubmit={SendFriendRequest}>
            <input
              type="text"
              name="FriendId"
              placeholder="Friend ID"
              className="w-full border p-2 rounded mb-2 text-white"
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white rounded px-2 transition duration-300 hover:bg-blue-600"
            >
              <FaUserPlus className="inline-block mr-2" size={18} />
              Send Request
            </button>
          </form>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Awaiting Request:
          </h2>
          {friendRequest.length == 0 ? (
            <p>You have no pending requests.</p>
          ) : (
            <ul className="space-y-2">{friendhtml}</ul>
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

    const groupName = event.target.groupName.value;
    const groupDescription = event.target.groupDescription.value;

    // Envía la solicitud al servidor con los datos del grupo
    axios
      .post(
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
      <div className="modal-box border border-grey p-6 bg-[#4aa88f] rounded-lg shadow-lg">
        <form method="dialog" onSubmit={createGroup}>
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

          <h3 className="font-bold text-xl text-white mb-4">CREATION GROUP</h3>
          {/* Campo para el nombre del grupo */}
          <div className="mb-4">
            <label htmlFor="group_name" className="block text-lg font-medium text-white">Group Name:</label>
            <input type="text" id="group_name" name="groupName" className="mt-1 p-2 block w-full rounded-md border-gray-300 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>

          {/* Campo para la descripción del grupo */}
          <div className="mb-4">
            <label htmlFor="group_description" className="block text-lg font-medium text-white">Group Description:</label>
            <textarea id="group_description" name="groupDescription" rows="3" className="mt-1 p-2 block w-full text-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required></textarea>
          </div>

          {/* Botón para agregar el grupo */}
          <button type="submit" className="btn bg-blue-500 text-white rounded-md px-6 py-3 transition duration-300 hover:bg-blue-600">Add Group</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddFriendGroup;
