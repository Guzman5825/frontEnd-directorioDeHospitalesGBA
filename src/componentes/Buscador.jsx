import React, { useState } from "react";

function Buscador({ onBuscar }) {
    const [valor, setValor] = useState("");

    const handleClick = () => {
        console.log("Valor escrito:", valor);
        if (onBuscar) {
            onBuscar(valor); // manda el valor al componente padre
        }
    };

    return (
        <div className="pl-2 flex items-center justify-between">

            <input
                type="text"
                placeholder="Buscar hospital por nombre"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="border px-2 py-1 rounded w-64"
            />

            <button
                onClick={handleClick}
                className="border bg-green-700 hover:bg-green-900 text-white rounded-md px-2 py-1"
            >
                Buscar
            </button>
        </div>
    );
}

export default Buscador;
