import { Link } from 'react-router-dom';

function Not_found() {
  return (
    <>
      <div className="bg-[#FAF0E2] min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#47af90] mb-4">404</h1>
          <p className="text-2xl text-gray-800 mb-8">Oops! Página no encontrada</p>
          <p className="text-lg text-gray-600 mb-8">La página que estás buscando podría haber sido eliminada, cambiado de nombre o está temporalmente fuera de servicio.</p>
          <Link to="/" className="text-[#47af90] hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </>
  )
}

export default Not_found;