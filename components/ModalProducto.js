import { useState, useEffect } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import Image from "next/image";
import { formatearDinero } from "@/helpers";


const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } =
    useQuiosco();
  const { nombre, precio, imagen } = producto;
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id == producto.id)) {
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState.id == producto.id
      );
      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen de producto ${nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button type="button" onClick={() => handleChangeModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-3xl mt-5 font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <div className="mt-5 flex gap4 items-center">
          <button
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span className="text-2xl">{cantidad}</span>
          <button
            onClick={() => {
              if (cantidad >= 5) return;
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="bg-indigo-600 transition-all px-5 py-2 mt-5 hover:bg-indigo-800 text-white uppercase font-bold"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
        >
          {edicion ? "Guardar cambios":"Agregar al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
