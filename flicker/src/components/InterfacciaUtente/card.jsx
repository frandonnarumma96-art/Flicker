function Card({ title, image }) {
  return (
    <div className="bg-gray-900/80 text-white rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:border-cyan-400 transition-all duration-300">
      <img src={image} alt={title} />
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  )
}

export default Card