import logoImage from '../images/loro.png'

// UserChannels.js
function UserChannels() {
  return (
    <>
      <ul className="sm:max-h-[420px] md:max-h-[420px] lg:max-h-[420px] xl:max-h-[420px] 2xl:max-h-[640px] overflow-y-auto">
        <li className="mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Canal de Usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2">
              <h3 className="text-sm text-white font-semibold">Jane</h3>
              <p className="text-xs text-white">!Hola¡ Estoy bien, ¿y tú?</p>
            </div>
          </div>
        </li>
        <li className="mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Canal de Usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2">
              <h3 className="text-sm text-white font-semibold">Nombre del Canal</h3>
              <p className="text-xs text-white">Último mensaje...</p>
            </div>
          </div>
        </li>

        <li className="mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Canal de Usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2">
              <h3 className="text-sm text-white font-semibold">Nombre del Canal</h3>
              <p className="text-xs text-white">Último mensaje...</p>
            </div>
          </div>
        </li>

        
      </ul>

      <div className="flex items-center justify-center">
        <img src={logoImage} alt="Logotipo" className="w-32 h-auto mx-auto" />
      </div>
    </>
  );
}

export default UserChannels;
