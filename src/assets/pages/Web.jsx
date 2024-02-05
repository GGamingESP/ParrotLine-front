import logoImage from '../images/loro.png'

import UserProfile from "../components/UserProfile";
import SearchBar from "../components/SearchBar";
import AddFriendGroup from "../components/AddFriendGroup";
import UserChannels from "../components/UserChannels";
import ChatMessages from "../components/ChatMessages";
import { useEffect } from 'react';




function Web() {

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (user) {
            // Logica
        }else{
            window.location.href = "/Login"
        }
    });

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-[#4aa88f] p-4 border-r-2 border-[#327462]">
                {/* Perfil del usuario */}
                <UserProfile />

                {/* Botón de búsqueda */}
                <SearchBar />

                {/* Iconos de "Agregar amigo" y "Crear grupo" */}
                <AddFriendGroup />

                {/* Lista de canales de usuarios */}
                <UserChannels />


                <div className="  border-t pt-4 items-center justify-center">
                    <img src={logoImage} alt="Logotipo" className="flex-1 w-32 " />
                </div>
            </div >

            {/* Apartado de mensajes e input */}
            <ChatMessages />

        </div >
    );
}

export default Web;
