import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Lock, Trash2, Bell, Shield, LogOut, Check, Plus, X } from 'lucide-react';

// 🌟 Array PLATFORMS integrato direttamente per evitare errori di import esterni
const PLATFORMS = [
  { id: "netflix", name: "Netflix", logo: "N", color: "#E50914" },
  { id: "prime", name: "Prime Video", logo: "P", color: "#00A8E1" },
  { id: "disney", name: "Disney+", logo: "D", color: "#113CCF" },
  { id: "netflix_anime", name: "Netflix Anime", logo: "A", color: "#E50914" },
  { id: "crunchyroll", name: "Crunchyroll", logo: "C", color: "#F47521" }
];

function SectionHeader({ label }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.3em] text-purple-400/60 uppercase mb-3 mt-6 px-1">
      {label}
    </p>
  );
}

function SettingRow({ icon: Icon, label, sublabel, onClick, right, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 bg-[#12091c]/40 border ${
        danger ? 'border-red-500/10 hover:bg-red-500/5' : 'border-gray-800/60 hover:bg-[#12091c]/80'
      } transition-colors active:scale-[0.98]`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#06000c] border ${
        danger ? 'border-red-500/30 text-red-500' : 'border-gray-800 text-cyan-400'
      }`}>
        <Icon size={15} />
      </div>
      <div className="flex-1 text-left">
        <p className={`font-mono text-xs ${danger ? 'text-red-400' : 'text-gray-200'}`}>{label}</p>
        {sublabel && <p className="text-[11px] text-gray-500 mt-0.5 truncate">{sublabel}</p>}
      </div>
      {right ?? <span className="text-gray-700 text-xs">➔</span>}
    </button>
  );
}

function ToggleRow({ icon: Icon, label, sublabel }) {
  const [on, setOn] = useState(true);
  return (
    <div className="w-full flex items-center gap-4 rounded-xl px-4 py-3 bg-[#12091c]/40 border border-gray-800/60">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#06000c] border border-gray-800 text-purple-400">
        <Icon size={15} />
      </div>
      <div className="flex-1 text-left">
        <p className="font-mono text-xs text-gray-200">{label}</p>
        {sublabel && <p className="text-[11px] text-gray-500 mt-0.5">{sublabel}</p>}
      </div>
      <button
        onClick={() => setOn((s) => !s)}
        className="flex-shrink-0 rounded-full transition-all duration-200 relative w-10 h-6"
        style={{ backgroundColor: on ? '#00e5ff' : '#1a1a35', boxShadow: on ? '0 0 8px rgba(0,229,255,0.4)' : 'none' }}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full transition-transform duration-200 ${on ? 'bg-white translate-x-[18px]' : 'bg-gray-600 translate-x-[2px]'}`}
        />
      </button>
    </div>
  );
}

export function AccountTab() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Stati Modali (gestiti ora con puro JS nativo)
  const [showNickEdit, setShowNickEdit] = useState(false);
  const [showPlatformEdit, setShowPlatformEdit] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);

  // Stati dei dati modificabili
  const [username, setUsername] = useState('');
  const [userPlatforms, setUserPlatforms] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const loggedInUser = users.find(u => u.email === currentUserEmail);

    if (loggedInUser) {
      setUser(loggedInUser);
      setUsername(loggedInUser.username || 'User');
      setUserPlatforms(loggedInUser.platforms || []);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const aggiornaLocalStorage = (chiave, valore) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    
    const updatedUsers = users.map(u => {
      if (u.email === currentUserEmail) {
        return { ...u, [chiave]: valore };
      }
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSaveNickname = (nuovoNick) => {
    setUsername(nuovoNick);
    aggiornaLocalStorage("username", nuevoNick);
  };

  const togglePlatform = (id) => {
    const nuovePiattaforme = userPlatforms.includes(id)
      ? userPlatforms.filter((p) => p !== id)
      : [...userPlatforms, id];
    
    setUserPlatforms(nuovePiattaforme);
    aggiornaLocalStorage("platforms", nuovePiattaforme);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUserEmail");
    navigate("/");
  };

  if (!user) return null;

  const piattaformeAttive = PLATFORMS.filter((p) => userPlatforms.includes(p.id));

  return (
    <div className="w-full text-white font-sans max-w-md mx-auto px-4 mt-4 select-none">
      
      {/* ── SEZIONE PROFILO PRINCIPALE ── */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-[#12091c]/60 border border-gray-800/80 shadow-lg">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#06000c] border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <User size={28} className="text-cyan-400" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-cyan-400 text-[#06000c] shadow-md active:scale-95 transition-transform">
            <Camera size={11} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-mono text-base font-black tracking-wide text-gray-100 truncate">{username}</p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
          
          <div className="flex gap-1.5 mt-2">
            {piattaformeAttive.slice(0, 4).map((p) => (
              <span key={p.id} className="w-5 h-5 rounded flex items-center justify-center bg-gray-900 border border-gray-800 text-[9px] font-bold" style={{ color: p.color }}>
                {p.logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── IMPOSTAZIONI ACCOUNT ── */}
      <SectionHeader label="Impostazioni Profilo" />
      <div className="flex flex-col gap-2">
        <SettingRow icon={User} label="Modifica Username" sublabel={username} onClick={() => setShowNickEdit(true)} />
        <SettingRow icon={Lock} label="Modifica Password" sublabel="Aggiorna le tue credenziali" />
        <SettingRow icon={Shield} label="Privacy e Permessi" sublabel="Gestisci i dati sincronizzati" />
      </div>

      {/* ── PIATTAFORME STREAMING ── */}
      <SectionHeader label="Le tue piattaforme" />
      <div className="p-4 rounded-2xl bg-[#12091c]/40 border border-gray-800/60">
        <div className="flex flex-wrap gap-2 mb-3">
          {piattaformeAttive.length === 0 ? (
            <p className="text-xs text-gray-500 px-1 py-1">Nessuna piattaforma selezionata.</p>
          ) : (
            piattaformeAttive.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <span className="text-xs" style={{ color: p.color }}>{p.logo}</span>
                <span className="text-[11px] text-gray-300 font-medium">{p.name}</span>
              </div>
            ))
          )}
        </div>
        <button 
          onClick={() => setShowPlatformEdit(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 bg-[#06000c] border border-dashed border-purple-500/30 hover:border-purple-500/60 font-mono text-[10px] tracking-wider text-purple-400 transition-colors"
        >
          <Plus size={12} /> GESTISCI PIATTAFORME
        </button>
      </div>

      {/* ── NOTIFICHE ── */}
      <SectionHeader label="Preferenze Notifiche" />
      <div className="flex flex-col gap-2">
        <ToggleRow icon={Bell} label="Notifiche Match" sublabel="Quando trovi un partner di visione" />
        <ToggleRow icon={Bell} label="Suggerimenti Settimanali" sublabel="Nuove uscite scelte per te" />
      </div>

      {/* ── DISCONNESSIONE ── */}
      <SectionHeader label="Azioni" />
      <div className="flex flex-col gap-2 mb-12">
        <SettingRow icon={LogOut} label="Disconnetti" sublabel="Esci dal tuo account attuale" onClick={handleLogout} />
        <SettingRow icon={Trash2} label="Elimina Account" danger onClick={() => setShowDeactivate(true)} />
      </div>

      {/* ── MODALE MODIFICA USERNAME (NATIVA) ── */}
      {showNickEdit && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={() => setShowNickEdit(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#12091c] border-t border-gray-800 rounded-t-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs tracking-wider text-gray-400">MODIFICA USERNAME</p>
              <button onClick={() => setShowNickEdit(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <input
              type="text" 
              defaultValue={username}
              id="modalUsernameInput"
              autoFocus
              className="w-full h-12 rounded-xl px-4 mb-4 bg-[#06000c] border border-cyan-500/30 focus:border-cyan-400 text-gray-200 font-mono outline-none transition-colors"
            />
            <button 
              onClick={() => {
                const input = document.getElementById("modalUsernameInput");
                if(input.value.trim()) handleSaveNickname(input.value.trim());
                setShowNickEdit(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 bg-cyan-400 hover:bg-cyan-300 text-[#06000c] font-mono text-xs font-black tracking-widest transition-colors"
            >
              <Check size={14} /> SALVA MODIFICHE
            </button>
          </div>
        </div>
      )}

      {/* ── MODALE MODIFICA PIATTAFORME (NATIVA) ── */}
      {showPlatformEdit && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={() => setShowPlatformEdit(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#12091c] border-t border-gray-800 rounded-t-3xl p-6 max-h-[75vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs tracking-wider text-gray-400">SELEZIONA PIATTAFORME</p>
              <button onClick={() => setShowPlatformEdit(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => {
                const active = userPlatforms.includes(p.id);
                return (
                  <button 
                    key={p.id} 
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border text-left relative transition-all active:scale-95 ${
                      active ? 'bg-gray-900 border-purple-500/60' : 'bg-[#06000c] border-gray-800/80'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-900 border border-gray-800 text-xs font-bold" style={{ color: p.color }}>{p.logo}</span>
                    <span className={`text-xs font-mono ${active ? 'text-white' : 'text-gray-500'}`}>{p.name}</span>
                    {active && <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />}
                  </button>
                );
              })}
            </div>
            <button 
              onClick={() => setShowPlatformEdit(false)}
              className="w-full mt-4 rounded-xl py-3 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-black tracking-widest transition-colors"
            >
              CHIUDI E SALVA
            </button>
          </div>
        </div>
      )}

      {/* ── MODALE ELIMINA ACCOUNT (NATIVA) ── */}
      {showDeactivate && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xs rounded-2xl p-6 bg-[#12091c] border border-red-500/30 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/30 mx-auto mb-3 text-red-500">
              <Trash2 size={20} />
            </div>
            <h3 className="font-mono text-sm font-black tracking-wide text-red-400">ELIMINARE L'ACCOUNT?</h3>
            <p className="text-xs text-gray-400 leading-relaxed mt-2">
              Questa operazione è irreversibile. Tutti i tuoi film salvati e i match andranno persi.
            </p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowDeactivate(false)} className="flex-1 rounded-xl py-2.5 bg-gray-900 border border-gray-800 text-xs font-mono text-gray-400">
                ANNULLA
              </button>
              <button 
                onClick={() => {
                  const users = JSON.parse(localStorage.getItem("users")) || [];
                  const currentUserEmail = localStorage.getItem("currentUserEmail");
                  const filtrati = users.filter(u => u.email !== currentUserEmail);
                  localStorage.setItem("users", JSON.stringify(filtrati));
                  handleLogout();
                }}
                className="flex-1 rounded-xl py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/20"
              >
                ELIMINA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}