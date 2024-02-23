import UserProfile from "../components/UserProfile";
import SearchBar from "../components/SearchBar";
import AddFriendGroup from "../components/AddFriendGroup";
import UserChannels from "../components/UserChannels";
import ChatMessages from "../components/ChatMessages";
import MyGroupContext from "../components/GroupContext";
import MyCurrentGroupContext from "../components/CurrentGroupContext";
import { useEffect, useState } from 'react';



function Web() {
    const MyGroupProvider = MyGroupContext.Provider;
    const MyCurrentGroupProvider = MyCurrentGroupContext.Provider;
    const [MyGroups, setMyGroups] = useState([])
    const [CurrentGroup, setCurrentGroup] = useState({})
     const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (user) {
            // Logica
        } else {
            window.location.href = "/Login"
        }
    });

    const actualizarEstadoGrupo = (nuevoEstado) => {
        setMyGroups(nuevoEstado);
    }

    const actualizarEstadoCurrentGrupo = (nuevoEstado) => {
        setCurrentGroup(nuevoEstado);
    }

    return (
        <div className="flex h-screen">
            <MyGroupProvider value={MyGroups}>
                <MyCurrentGroupProvider value={CurrentGroup}>
                    <div className="w-64 bg-[#4aa88f] p-4 border-r-2 border-[#327462]">
                        {/* Perfil del usuario */}
                        <UserProfile />

                        {/* Botón de búsqueda */}
                        <SearchBar setSearchTerm={setSearchTerm} />

                        {/* Iconos de "Agregar amigo" y "Crear grupo" */}
                        <AddFriendGroup />

                        {/* Lista de canales de usuarios */}
                        <UserChannels userGroup={actualizarEstadoGrupo} currentGroup={actualizarEstadoCurrentGrupo}  />
                    </div >
                    {/* Apartado de mensajes e input */}
                    <ChatMessages />
                </MyCurrentGroupProvider>
            </MyGroupProvider>
        </div >
    );
}
export default Web;