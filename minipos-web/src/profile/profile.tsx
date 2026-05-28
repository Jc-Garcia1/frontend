export default function Profile({ name, semester, program }
  :
  {name: string, semester: string, program: string}
) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950 p-6">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white hover:scale-105 transition-all duration-300">
        
        {/* Foto/Icono */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold shadow-lg">
            {name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
          Perfil Estudiantil
        </h1>

        {/* Información */}
        <div className="space-y-5">
          
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <p className="text-sm text-gray-300">Nombre</p>
            <h2 className="text-xl font-semibold">{name}</h2>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <p className="text-sm text-gray-300">Semestre</p>
            <h2 className="text-xl font-semibold">{semester}</h2>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <p className="text-sm text-gray-300">
              Programa Académico
            </p>
            <h2 className="text-xl font-semibold">{program}</h2>
          </div>

        </div>

      </div>
    </div>
  );
}