import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const {categorias} = useQuiosco();

  return (
    <div className="flex flex-col items-center mt-10">
      <Image
      width={200}
      height={100}
      src="/assets/img/logo.svg"
      alt="Imagen logotipo"
      />
      <nav className="mt-10">
        {categorias.map(categoria => 
          <Categoria key={categoria.key} categoria ={categoria}/>
        )}
      </nav>
    </div>
  )
}

export default Sidebar