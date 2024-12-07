const Navbar = () => {
  return (
    <nav className="container mx-auto flex justify-between items-center bg-blue-100 shadow-md pl-5 pr-5 flex-wrap">
        <div className="flex justify-center items-center">
            <img src="./src/assets/logo.png" alt="DreamikAI LOGO" className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-md p-2" />
            <a href="https://www.dreamik.com/"><h2 className="p-2 text-3xl text-blue-900 font-bold">DreamikAI</h2></a>
            
        </div>
        <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-gray-600 to-gray-400 text-transparent bg-clip-text pt-5 md:pt-0">IMAGE BACKGROUND REMOVER</h2>
        </div>
    </nav>
  )
}

export default Navbar