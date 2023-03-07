import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import ResumenProducto from "@/components/ResumenProducto";

export default function Resumen () {
  const {pedido} = useQuiosco();

  return (
    <Layout
    pagina="Resumen"
    >
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="my-5 text-2xl">Revisa tu pedido</p>
      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        pedido.map(producto => (
          <ResumenProducto key={producto.id} producto={producto}/>
        ))
      )}
    </Layout>
  )
}
