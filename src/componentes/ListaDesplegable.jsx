export default function ListaDesplegable({ titulo, items, mostrar }) {
  return (
    <div className="my-4 w-64">
      <h3 className="font-bold mb-2">{titulo}</h3>
      <select className="border px-2 py-1 rounded w-full">
        {items.map((item) => (
          <option key={item.id} value={item[mostrar]}>
            {item[mostrar]}
          </option>
        ))}
      </select>
    </div>
  );
}