function Card({ title, image, vote, year }) {
  return (
    <div className="w-38">
      <img
        src={image}
        alt={title}
        className="w-full rounded-lg object-cover aspect-[2/3]"
      />

      <div className="text-xs text-white mt-1 line-clamp-2">
        {title}
      </div>

      <h3 className="text-xs text-white mt-1 line-clamp-2">
        ⭐ {vote} · 📅 {year}
      </h3>
    </div>
  );
}

export default Card;