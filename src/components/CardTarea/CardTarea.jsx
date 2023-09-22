export const CardTarea = ({tarea, id, handleCambiar, handleEliminar, index}) => {
  return (
    <div className="col">
      <div className={tarea.realizado ? "card bg-success" : "card bg-light"} style={{width: "18rem"}}>
          <div className="card-body">
              <h5 className="card-title">Tarea {index}</h5>
              <p className="card-text">{tarea.descripcion}</p>
              <hr />
              <div className="d-grid gap-2">
                <button onClick={() => handleEliminar(id)} className="btn btn-danger">Borrar</button>
                <button onClick={() => handleCambiar(id)} className="btn btn-info">{tarea.realizado ? "Marcar como inconclusa" : "Marcar como terminada"}</button>
              </div>
          </div>
      </div>
    </div>
  )
}
