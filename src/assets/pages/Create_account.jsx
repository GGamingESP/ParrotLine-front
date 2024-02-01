import parrot3 from '../images/parrot3.png'
import parrot4 from '../images/parrot4.png'

function Create_password() {
  return (
    <div className=" bg-[#1b8daf] min-h-screen flex items-center justify-end relative " style={{
      backdropFilter: 'blur(10px)',
      backgroundImage: 'linear-gradient(to bottom right, #8ACB88 10%, #5DB3E8 , #1F1F1F , #A05CBF 130%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="hero-content flex-col lg:flex-row-reverse  ">
        <div className="text-center lg:text-left ">
          <h1 className="text-7xl font-bold hidden md:block" style={{ background: 'linear-gradient(to right, black, green)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PARROTLINE</h1>
          <p className="py-6 hidden md:block" style={{ background: 'linear-gradient(to right, black, green)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your voice, your colors, your connection.</p>
        </div>
        <img src={parrot4} alt="Descripción de la imagen" className="w-40 hidden md:block" />
      </div>
      <div className="bg-gradient-to-b from-[#53dbaf] via-[#53dbaf] text-white p-6 rounded-md shadow-md mx-auto w-full max-w-md h-[38rem]">
        <div className="max-w-md mx-auto ">
          <form>
            <div className="mb-4">
              <div className="mb-5">
                <div className="text-center mb-4">
                  <h1 className="text-4xl font-mono mb-2">Create Account </h1>
                  <div className="w-72 mx-auto   border-b border-2 rounded-md  border-[#39B7AF]"></div>
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
                    className="w-full p-2 pl-8 border rounded"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                  User
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    👨‍💼
                  </span>
                  <input
                    type="username"
                    id="password"
                    className="w-full p-2 pl-8 border rounded"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                  Pasword
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
              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                  Confirm Pasword
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

              <div>
                <label htmlFor="Description" className="block mb-2 text-sm text-gray-600">
                  Description (Optional)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    📜
                  </span>
                  <input
                    type="text"
                    id="Description"
                    className="w-full p-2 pl-8 border rounded"
                    placeholder="Place your description"
                  />
                </div>
              </div>
            </div>

            <a href="/Web" type="submit" className="btn w-full  bg-[#60BB94] text-white font-mono text-2xl p-2 rounded hover:bg-[#52C0B2]  transition-transform transform hover:scale-105">
              Create Account
            </a>
          </form>

          <div className="flex justify-center mt-4 space-x-4">
            <a href="/Login" className="text-sm text-black  transition-transform transform hover:scale-105">
              Log in
            </a>
            <span className="text-sm text-gray-500">|</span>
            <a href="/" className="text-sm text-black  transition-transform transform hover:scale-105">
              Go back
            </a>
          </div>
          <div className="relative top-20 right-10 transform translate-x-1/2 -translate-y-1/2">
            <a href="/"><img src={parrot3} alt="Icono" className="h-16 w-16 object-cover  transition-transform transform hover:scale-105" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create_password;