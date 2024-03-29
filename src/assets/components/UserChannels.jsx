// IMPORT REACT
import { useEffect, useState, useContext } from 'react';
// IMPORT NECESIDADES
import axios from 'axios';
// LOGO
import logoImage from '../images/loro.webp';
// CONTEXTO
import MyCurrentGroupContext from '../components/CurrentGroupContext';
// FUNCION PRINCIPAL
function UserChannels({ userGroup, currentGroup }) {
  // ESTADOS
  const [userGroups, setUserGroups] = useState([]);
  const [grouphtml, setgrouphtml] = useState([]);
  const misGrupos = useContext(MyCurrentGroupContext);
  const [searchTerm, setSearchTerm] = useState('');

  // HANDLER PARA CAMBIAR QUE GRUPO ACTUAL
  const handleGroupClick = (group) => {
    console.log(group);
    currentGroup(group);
  };
  // USEEFFECT PARA CONSEGUIR TODOS LOS GRUPOS
  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los grupos del usuario
    axios.get('https://ivan.informaticamajada.es/api/allGroups', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("currentUser")).token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Al recibir los datos, actualizar el estado con los grupos del usuario
        setUserGroups(response.data.data);

        let data = response.data.data.map(group => {
          if (group.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return (
              <li key={group.id} className="mb-4 group cursor-pointer" onClick={() => handleGroupClick(group)}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={
                        group.image
                          ? "https://ivan.informaticamajada.es/" + group.image
                          : "/default-user.webp"
                      }
                      alt="Grupo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-sm text-white font-semibold group-hover:scale-110 transition-all">{group.name}</h3>
                    <p className="text-xs text-white group-hover:scale-110 transition-all">{group.description}</p>
                  </div>
                </div>
              </li>
            );
          }
          return null; // Retorna null para los grupos que no coinciden con la búsqueda
        });
        setgrouphtml(data)
        console.log("datos grupos")
        console.log(response.data.data)
        userGroup(response.data.data)
      })
      .catch(error => {
        console.error('Error al obtener los grupos del usuario:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      });
  }, [searchTerm]); // La dependencia vacÃ­a asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <>
      <ul className="sm:max-h-[420px] md:max-h-[420px] lg:max-h-[420px] xl:max-h-[420px] 2xl:max-h-[640px] overflow-y-auto">
        {grouphtml}
      </ul>

      <div className="flex items-center justify-center">
        <img src={logoImage} alt="Logotipo" className="w-32 h-auto mx-auto" />
      </div>
    </>
  );
}

export default UserChannels;