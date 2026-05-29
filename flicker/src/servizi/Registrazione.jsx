import { useEffect, useState } from "react"
import logo from "../importati/logo.png"

export function Registrazione() {

    const [users, setUsers] = useState(() => {
        return JSON.parse(localStorage.getItem("users")) || []
    })


    const [user, setUser] = useState({
        nome: '',
        cognome: '',
        dataNascita: '',
        email: '',
        password: '',
        confermaPassword: '',
    })

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)


    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))
    }, [users])

    function handleChange(event) {
        const { name, value } = event.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    function handleInviaForm(event) {
        event.preventDefault()
        setError(null)
        setMessage(null)


        if (user.password !== user.confermaPassword) {
            setError("Le password non corrispondono! ")
            return
        }


        const userExist = users.find((u) => u.email === user.email)
        if (userExist) {
            setError("Utente già registrato con questa email ")
            return
        }


        setUsers((prev) => [...prev, user])
        setMessage("Registrazione effettuata con successo! ")


        setUser({
            nome: '',
            cognome: '',
            dataNascita: '',
            email: '',
            password: '',
            confermaPassword: '',
        })
    }

    function handleSocialLogin(provider) {
        setError(null)
        const socialEmail = `${provider.toLowerCase()}.user@example.com`

        const userExist = users.find((u) => u.email === socialEmail)

        if (userExist) {
            setMessage(`Questo account ${provider} è già registrato! `)
            return
        }

        const socialUser = {
            nome: 'Utente',
            cognome: provider,
            dataNascita: '',
            email: socialEmail,
            password: 'social-auth-password',
            provider: provider
        }

        setUsers((prev) => [...prev, socialUser])
        setMessage(`Registrazione con ${provider} completata!`)
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#06000c] text-white p-6 font-sans select-none">

            <div className="flex flex-col items-center mt-12 mb-8">
                <img src={logo} alt="Logo Flicker" className="w-16 h-16 object-contain mb-4" />
                <h1 className="text-4xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                    FLICKER
                </h1>
                <p className="text-xs uppercase text-gray-500 tracking-[0.3em] mt-2">
                    Il tuo cinema condiviso
                </p>
            </div>


            <div className="w-full max-w-sm space-y-6">

                {/* Titolo della Schermata */}
                <div className="text-center space-y-2">
                    <h2 className="text-xs font-bold tracking-[0.3em] text-cyan-400/80 uppercase">
                        Crea un nuovo account
                    </h2>
                    <p className="text-xs text-gray-500">
                        Hai già un account?{' '}
                        <a href="#login" className="text-cyan-400 font-bold hover:underline transition-all">
                            Accedi
                        </a>
                    </p>
                </div>


                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium tracking-wide text-center animate-fadeIn">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium tracking-wide text-center animate-fadeIn">
                        {message}
                    </div>
                )}

                {/* Form di Registrazione  */}
                <form onSubmit={handleInviaForm} className="space-y-5">

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">NOME</label>
                        <input
                            type="text" name="nome" required value={user.nome} onChange={handleChange} placeholder="Es. Marco"
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">COGNOME</label>
                        <input
                            type="text" name="cognome" required value={user.cognome} onChange={handleChange} placeholder="Es. Rossi"
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">DATA DI NASCITA</label>
                        <input
                            type="date" name="dataNascita" required value={user.dataNascita} onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 uppercase focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">EMAIL</label>
                        <input
                            type="email" name="email" required value={user.email} onChange={handleChange} placeholder="la@tua.email"
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">PASSWORD</label>
                        <input
                            type="password" name="password" required value={user.password} onChange={handleChange} placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">CONFERMA PASSWORD</label>
                        <input
                            type="password" name="confermaPassword" required value={user.confermaPassword} onChange={handleChange} placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-[#0b0411]/60 border border-gray-800 rounded-xl text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                        />
                    </div>

                    {/* Bottone Crea Account */}
                    <button
                        type="submit"
                        className="w-full py-4 mt-2 bg-cyan-500 text-[#06000c] font-black rounded-xl text-xs tracking-widest uppercase flex items-center justify-center transition-all hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    >
                        Crea account
                    </button>
                </form>

                {/* Separatore */}
                <div className="flex items-center gap-4 py-1">
                    <div className="flex-1 h-px bg-gray-900"></div>
                    <span className="text-[9px] text-gray-600 font-bold tracking-widest">OPPURE</span>
                    <div className="flex-1 h-px bg-gray-900"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                    {/* Google */}
                    <button type="button" onClick={() => handleSocialLogin('Google')}
                        className="relative w-full flex items-center py-3 px-4 border border-gray-800 rounded-xl bg-[#0b0411]/40 transition hover:border-gray-700">

                        <span className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded-lg bg-[#0b0411] text-red-500 text-xs font-bold">G</span>

                        <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-bold tracking-wide pointer-events-none">
                            Continua con Google
                        </span>
                    </button>

                    {/* Apple */}
                    <button type="button" onClick={() => handleSocialLogin('Apple')} className="relative w-full flex items-center py-3 px-4 border border-gray-800 rounded-xl bg-[#0b0411]/40 transition hover:border-gray-700">

                        <span className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded-lg bg-[#0b0411]">
                            <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.666 9.875c.012 1.711 1.488 2.28 1.5 2.288-.01.037-.23 1.15-.996 2.263-.665.965-1.357 1.926-2.43 1.946-1.053.018-1.393-.615-2.593-.615-1.2 0-1.579.615-2.576.632-1.071.018-1.871-1.062-2.538-2.025-1.365-1.97-2.403-5.568-1-8 1.403-2.432 1.905-2.53 3.65-2.518.825 0 1.6.571 2.106.571.503 0 1.442-.681 2.453-.578.423.018 1.61.171 2.373 1.285-.06.037-.08.05-.125.07-.468.214-1.32.743-1.325 2.241zM10.166.5C10.166 1.701 9.088 2.768 7.828 2.768c0-.053-.002-.107-.002-.16 0-1.127 1.055-2.316 2.176-2.316h.163z" fill="white" />
                            </svg>
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-bold tracking-wide pointer-events-none">Continua con Apple</span>
                    </button>

                    {/* Facebook */}
                    <button type="button" onClick={() => handleSocialLogin('Facebook')} className="relative w-full flex items-center py-3 px-4 border border-gray-800 rounded-xl bg-[#0b0411]/40 transition hover:border-gray-700">
                        <span className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded-lg bg-[#0b0411] text-blue-500 text-xs font-bold">f</span>
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-bold tracking-wide pointer-events-none">Continua con Facebook</span>
                    </button>
                </div>



            </div>
        </div>
    )
}