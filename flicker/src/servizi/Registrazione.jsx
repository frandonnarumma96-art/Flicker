import { useState } from "react"
import logo from "../importati/logo.png"
export function Registrazione() {

    const [user, setUser] = useState({
        email: '',
        password: '',
        nome: '',
        cognome: '',
        dataNascita: '',
    })

    const [isLoginTab, setIsLoginTab] = useState(false); // Stato per i tab

    function handleChange(event) {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    function handleRegistrati(event) {
        event.preventDefault()
        localStorage.setItem("user", JSON.stringify(user))
        alert("Registrazione")
    }

   
    function handleSocialLogin(provider) {
        const socialUser = { email: `${provider.toLowerCase()}.user@example.com`, provider: provider }
        setUser(socialUser)
        localStorage.setItem("user", JSON.stringify(socialUser))
        alert(`Registrazione `)
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans">
            
            
          <div className="flex flex-col items-center mt-12 mb-10">
    
    
    <img 
        src={logo} 
        alt="Logo Flicker" 
        className="w-16 h-16 object-contain mb-4" 
    />

    <h1 className="text-4xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
        FLICKER
    </h1>
    <p className="text-xs uppercase text-gray-500 tracking-[0.3em] mt-2">
        Il tuo cinema condiviso
    </p>
</div>

           
            <div className="w-full max-w-sm space-y-6">
                
                
                <div className="flex bg-[#06000c] border border-gray-800 rounded-xl overflow-hidden">
                    <button 
                        onClick={() => setIsLoginTab(false)}
                        className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all ${!isLoginTab ? 'bg-[#0b0411] text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-gray-500'}`}
                    >
                        REGISTRATI
                    </button>
                    <button 
                        onClick={() => setIsLoginTab(true)}
                        className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all ${isLoginTab ? 'bg-[#0b0411] text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-gray-500'}`}
                    >
                        ACCEDI
                    </button>
                </div>

                
                <form onSubmit={handleRegistrati} className="space-y-6">
                
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400 tracking-wider">EMAIL</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                               
                            </span>
                            <input 
                                type="email" 
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="la@tua.email"
                                className="w-full pl-12 pr-4 py-3.5 bg-[#0b0411] border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                    </div>

                    
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400 tracking-wider">PASSWORD</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                                
                            </span>
                            <input 
                                type="password" 
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3.5 bg-[#0b0411] border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500"
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                                
                            </button>
                        </div>
                    </div>

                  
                    <button 
                        type="submit"
                        className="w-full py-3.5 bg-cyan-500 text-[#06000c] font-bold rounded-xl text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all hover:bg-cyan-400 shadow-cyan-neon"
                    >
                        Crea account 
                    </button>
                </form>

                <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <span className="text-xs text-gray-600 font-medium tracking-wider">OPPURE</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                </div>

                
                <div className="space-y-4">
                    {/* Google */}
                    <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center py-3.5 px-6 border border-gray-800 rounded-xl bg-[#0b0411] transition hover:border-gray-600">
                        <span className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-xl bg-[#0b0411] text-red-500 text-lg font-bold"><svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.28 1.845 15.548 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.564-4.445 10.564-10.74 0-.725-.08-1.28-.175-1.685H12.24z"/>
                        </svg></span>
                        <span className="flex-1 text-sm text-gray-400 font-medium ml-4">Continua con Google</span>
                    </button>
                    {/* Apple */}
                    <button onClick={() => handleSocialLogin('Apple')} className="w-full flex items-center py-3.5 px-6 border border-gray-800 rounded-xl bg-[#0b0411] transition hover:border-gray-600">
                        <span className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-xl bg-[#0b0411] text-white text-lg"> <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                        </svg></span>
                        <span className="flex-1 text-sm text-gray-400 font-medium ml-4">Continua con Apple</span>
                    </button>
                    {/* Facebook */}
                    <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center py-3.5 px-6 border border-gray-800 rounded-xl bg-[#0b0411] transition hover:border-gray-600">
                        <span className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-xl bg-[#0b0411] text-blue-600 text-lg font-bold">f</span>
                        <span className="flex-1 text-sm text-gray-400 font-medium ml-4">Continua con Facebook</span>
                    </button>
                </div>

            </div>

        </div>
    )
}