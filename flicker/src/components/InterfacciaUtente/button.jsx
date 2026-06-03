function Button({ text }) {
  return (
    <a className="px-4 py-2 rounded-full font-semibold bg-cyan-500 text-white hover:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition-all duration-300">
      {text}
    </a>
  )
}

export default Button