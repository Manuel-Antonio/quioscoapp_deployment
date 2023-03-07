import useSWR from "swr";
import axios from "axios";
import AdminLayout from "@/layout/AdminLayout";
import Orden from "@/components/Orden";

const Admin = () => {
  const fetcher = () => axios("/api/ordenes").then(datos => datos.data);
  const {data, error, isLoading} = useSWR("/api/ordenes", fetcher, {refreshInterval: 100});

  
  return (
    <AdminLayout pagina="Panel Administración">
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="my-5 text-2xl">Administra tus ordenes</p>
      {data && data.length ? data.map(orden => <Orden key={orden.id} orden={orden}/>) : <p>No hay ordenes pendientes</p>}
    </AdminLayout>
  );
};

export default Admin;
