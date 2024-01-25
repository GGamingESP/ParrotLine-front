

function Login() {
    return (
        <>
            <div className="bg-[#1b8daf] min-h-screen flex items-center justify-center">
                <div className="bg-[#53dbaf] text-white p-6 rounded-md shadow-md">
                    <form>
                        <label className="block mb-2 text-sm text-gray-600"></label>
                        <input type="email" className="w-full mb-4 p-2 border rounded" />

                        <label className="block mb-2 text-sm text-gray-600">C</label>
                        <input type="password" className="w-full mb-2 p-2 border rounded" />

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <label className="text-sm text-black">Recordarme</label>
                            </div>

                            <a href="#" className="text-sm  text-black">
                                ¿Contraseña olvidada?
                                
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-200 "
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="flex justify-between mt-4">
                        <a href="#" className="text-sm text-black">
                            Create Account
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
