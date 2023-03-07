import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const obtenerCategorias = async () => {
    const url = "/api/categorias";
    const { data } = await axios(url);
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce( (total, producto) => total += (producto.precio * producto.cantidad), 0);
    setTotal(nuevoTotal)
  }, [pedido]);

  const handleClickCategoria = (id) => {
    setCategoriaActual(id);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleChangeModal = () => {
    setModal(!modal);
  };
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id == producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id == producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.info("Actualizando pedido", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setModal(false);
  };

  const handleEditarCantidades = (producto) => {
    setProducto(producto);
    setModal(true);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter(
      (pedidoState) => pedidoState.id != id
    );
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post("api/ordenes", {pedido, nombre, total, fecha: Date.now().toString()});

      // Restear App
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Pedido realizado correctamente");
      setTimeout(() => {
        router.push("/"); 
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
