
// COMPONENETES
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login_url } from '../../data/data';
import { useEffect } from 'react';

// IMAGENES
import parrot3 from '../images/parrot3.webp';
import parrot4 from '../images/parrot4.webp'

function Login() {

    // si se a logeado previamente lo manda a /web
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (user) {
            window.location.href = "/web";
        }
    });

    // Validador y confirmacion inicio sesion
    const handleSignIn = (event) => {

        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        // si los datos existen, entras a la pagina y sale un aviso, 
        // si es erroneo no entras y sale aviso de error.
        axios.post(Login_url, {
            email: email,
            password: password
        }).then(function (response) {
            toast.success('Inicio de sesión exitoso', { autoClose: 900 },); // Mensaje de éxito durante 900 ms
            setTimeout(() => {
                window.location.href = '/Web'; // Redirige a la página deseada después de los 900ms
            }, 1550);
            console.log(response.data.data)
            let currentUser = {
                token: response.data.data.token,
                user: {
                    name: response.data.data.user.name,
                    email: response.data.data.user.email,
                    image: response.data.data.user.image,
                    description: response.data.data.user.description,
                    id: response.data.data.user.id
                }
            }

            sessionStorage.setItem("currentUser", JSON.stringify(currentUser))

        }).catch(function (error) {
            console.error('Error al iniciar sesión:', error);
            toast.error('Error al intentar iniciar sesión. Por favor, intenta de nuevo.', {
                style: { height: '110px', fontSize: '1.2rem', autoClose: 1000 }, // Ajusta el tamaño del contenedor del mensaje
            });
        });


    };


    return (

        <div className=" bg-[#1b8daf] min-h-screen flex items-center justify-end relative " style={{

            //  ESTILO FONDO DE LA PAGINA
            backdropFilter: 'blur(10px)',
            backgroundImage: 'linear-gradient(to bottom right, #8ACB88 10%, #5DB3E8 , #1F1F1F , #A05CBF 130%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}>

            {/* SECCION LOGOTIPO/NOMBRE/DESCRIPCION PARROTLINE */}
            <div className="hero-content flex-col lg:flex-row-reverse animate__animated animate__bounceInRight">
                <div className="text-center lg:text-left">

                    <h1 className="text-7xl font-bold hidden md:block" style={{ background: 'linear-gradient(to right, black, green)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PARROTLINE</h1>
                    <p className="py-6 hidden md:block" style={{ background: 'linear-gradient(to right, black, green)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your voice, your colors, your connection.</p>
                </div>
                <img src={parrot4} alt="Descripción de la imagen" className="w-40 hidden md:block" />
            </div>

            {/* SECCION FORMULARIO */}
            <div className="bg-gradient-to-b from-[#53dbaf] via-[#53dbaf] text-white p-6 rounded-md shadow-md mx-auto w-full max-w-md h-[35rem]">
                <div className="max-w-md mx-auto ">
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <div className="mb-5">
                                <div className="text-center mb-4">
                                    <h1 className="text-4xl font-mono mb-2">Sign In</h1>
                                    <div className="w-40 mx-auto   border-b border-2 rounded-md  border-[#39B7AF]"></div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                                    Email
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        📧
                                    </span>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-2 pl-8 border rounded "
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        🔐
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full p-2 pl-8 border rounded"
                                        placeholder="******"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center ">
                                <label className="text-sm text-black">
                                    <input type="checkbox" className="mr-2  bg-white border-none checkbox checkbox-info" />
                                    Remember me!!!
                                </label>

                            </div>

                            <a href="/Forgot_password" className="text-sm text-black transition-transform transform hover:scale-105">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="btn w-full  bg-[#61c99c] text-white font-mono text-2xl p-2 rounded hover:bg-[#52C0B2]  transition-transform transform hover:scale-105">
                            Sign in
                        </button>

                    </form>
                    <ToastContainer />
                    

                    <div className="flex justify-center mt-4 space-x-4">
                        <a href="/Create_account" className="text-sm text-black transition-transform transform hover:scale-105">
                            Create Account
                        </a>
                        <span className="text-sm text-gray-500">|</span>
                        <a href="/" className="text-sm text-black transition-transform transform hover:scale-105">
                            Go back
                        </a>
                    </div>
                    <div className="relative top-20 right-7 transform translate-x-1/2 -translate-y-1/2">
                        <a href="/"><img src={parrot3} alt="Icono" className="h-16 w-16 object-cover transition-transform transform hover:scale-105" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
