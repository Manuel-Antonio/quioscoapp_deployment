import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Categoria = ({categoria}) => {
  const {categoriaActual, handleClickCategoria} = useQuiosco();
    const {id, nombre, icono} = categoria;
  return (
  <div className={` ${categoriaActual?.id == id ? "bg-amber-400":""} flex items-center transition-all hover:bg-amber-400 gap-4 w-full p-3 border border-gray-200`}>
        <Image
        width={60}
        height={100}
        src={`/assets/img/icono_${icono}.svg`}
        alt={`Imagen de icono ${nombre}`}
        />
        <button
        type="button"
        className="text-2xl font-bold "
        onClick={() => handleClickCategoria(categoria)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria