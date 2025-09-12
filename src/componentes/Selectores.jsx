import React, { useState } from "react";
import ciudades from "../datosPrueba/ciudades.json";
import especialidades from "../datosPrueba/especialidades.json";
import Selector from "./Selector";

export default function Selectores({ onFiltrar }) {
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("todas");
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState("todas");
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("todas");

    const opcionesEspecialidades = [
        { value: "todas", label: "Todas las especialidades" },
        ...especialidades.map((e) => ({ value: String(e.nombre), label: e.nombre })),
    ];

    const opcionesCiudades = [
        { value: "todas", label: "Todas las ciudades" },
        ...ciudades.map((c) => ({ value: String(c.id), label: c.nombre })),
    ];

    const localidades =
        ciudadSeleccionada === "todas"
            ? ciudades.flatMap((c) => c.localidades)
            : ciudades.find((c) => c.id === parseInt(ciudadSeleccionada))
                ?.localidades || [];

    const opcionesLocalidades = [
        { value: "todas", label: "Todas las localidades" },
        ...localidades.map((loc) => ({ value: loc, label: loc })),
    ];

    const handleFiltrar = () => {
        if (onFiltrar) {
            const ciudadObj =
                ciudadSeleccionada === "todas"
                    ? null
                    : ciudades.find((c) => c.id === parseInt(ciudadSeleccionada));

            onFiltrar({
                especialidad:
                    especialidadSeleccionada === "todas"
                        ? "Todas las especialidades"
                        : especialidadSeleccionada,
                ciudad:
                    ciudadSeleccionada === "todas"
                        ? "Todas las ciudades"
                        : ciudadObj?.nombre,
                localidad:
                    localidadSeleccionada === "todas"
                        ? "Todas las localidades"
                        : localidadSeleccionada,
            });
        }
    };

    return (
        <div className="pl-2 flex items-center justify-between">
            <div>
                <Selector  
                    label="Ingrese una especialidad"
                    value={especialidadSeleccionada}
                    onChange={setEspecialidadSeleccionada}
                    options={opcionesEspecialidades}
                />
                <Selector
                    label="Seleccione una ciudad"
                    value={ciudadSeleccionada}
                    onChange={(val) => {
                        setCiudadSeleccionada(val);
                        setLocalidadSeleccionada("todas");
                    }}
                    options={opcionesCiudades}
                />
                <Selector
                    label="Seleccione una localidad"
                    value={localidadSeleccionada}
                    onChange={setLocalidadSeleccionada}
                    options={opcionesLocalidades}
                />
            </div>
            <button
                onClick={handleFiltrar}
                className="border bg-green-700 hover:bg-green-900 text-white rounded-md px-2 py-1"
            >
                Filtrar
            </button>
        </div>
    );
}
