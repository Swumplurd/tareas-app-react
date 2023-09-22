import { useEffect, useReducer, useState } from "react"
import { Footer } from "./components/Footer/Footer"
import { FormularioTareas } from "./components/FormularioTareas/FormularioTareas"
import { Header } from "./components/Header/Header"
import { tareaReducer } from "./reducers/tareaReducer"
import { CardTarea } from "./components/CardTarea/CardTarea"

export const App = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem("tareas")) || []
  }

  const [state, dispatch] = useReducer(tareaReducer, [], init);

  const [descripcion, setDescripcion] = useState("")

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(state))
  }, [state])  

  const handleInputChange = (evento) => {
    setDescripcion(evento.target.value)
    console.log(descripcion)
  }

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const tareaNueva = {
        id: new Date().getTime(),
        descripcion: descripcion,
        realizado: false
    }

    const action = {
      type: "agregar",
      payload: tareaNueva
    }

    dispatch(action)
    setDescripcion("")
  }

  const handleCambiar = (id) => {
    dispatch({
      type: "cambiar",
      payload: id
    })
  }

  const handleEliminar = (id) => {
    dispatch({
      type: "borrar",
      payload: id
    })
  }

  let terminadas = 0
  for (let i = 0; i < state.length; i++) {
    if (state[i].realizado === true) {
      terminadas++;
    }
  }

  let porcentaje = terminadas / state.length

  return (
    <>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <FormularioTareas descripcion={descripcion} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                </div>
                <div className="col-8">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                      state.map((tarea, index) => {
                        return <CardTarea key={index} handleCambiar={handleCambiar} handleEliminar={handleEliminar} tarea={tarea} id={tarea.id} index={index + 1}/>
                      })
                    }
                  </div>
                </div>
            </div>
        </div>
        <Footer porcentaje={porcentaje} />
    </>
  )
}
