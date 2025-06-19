import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ConsultaAjustes from "./ConsultaAjustes"
import { ajustes_services } from "../services/ajustes.service"

export default function AjusteStock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const [action, setAction] = useState("R")
  const [rows, setRows] = useState([])
  const [postError, setPostError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    // Cambiado: nombres de campos para coincidir con el backend
    const payload = {
      Producto_id: data.productoId,
      Fecha: data.fecha,
      Motivo: data.motivo,
      CantidadAjuste: data.cantidadAjuste
    }
    try {
      await ajustes_services.createReserva(payload)
      setPostError("")
      setAction("C")
      reset()
    } catch (error) {
      setPostError("Error al registrar el ajuste")
      console.error(error) // Para ver el error real en consola
    }
  }

  const loadData = async () => {
    const response = await ajustes_services.getReservas()
    setRows(response)
  }

  const onVolver = () => {
    navigate("/")
  }

  useEffect(() => {
    if (action === "C") {
      loadData()
    }
  }, [action])

  return (
    <div className="container mt-5">
      {action === "R" && (
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div
              className="card shadow"
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                borderRadius: "12px"
              }}
            >
              <div className="card-body">
                <h3 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
                  Registro de Ajuste de Stock
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="productoId" className="form-label">Producto</label>
                    <input
                      type="number"
                      className={`form-control ${errors.productoId ? "is-invalid" : ""}`}
                      id="productoId"
                      {...register("productoId", {
                        required: "Producto es requerido"
                      })}
                    />
                    {errors.productoId && (
                      <div className="invalid-feedback">{errors.productoId.message}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input
                      id="fecha"
                      type="date"
                      className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                      {...register("fecha", {
                        required: "La fecha es requerida"
                      })}
                    />
                    {errors.fecha && (
                      <div className="invalid-feedback">{errors.fecha.message}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">Motivo</label>
                    <input
                      id="motivo"
                      type="text"
                      className={`form-control ${errors.motivo ? "is-invalid" : ""}`}
                      {...register("motivo", {
                        required: "El motivo es requerido"
                      })}
                    />
                    {errors.motivo && (
                      <div className="invalid-feedback">{errors.motivo.message}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cantidadAjuste" className="form-label">Cantidad</label>
                    <input
                      id="cantidadAjuste"
                      type="number"
                      className={`form-control ${errors.cantidadAjuste ? "is-invalid" : ""}`}
                      {...register("cantidadAjuste", {
                        required: "La cantidad es requerida"
                      })}
                    />
                    {errors.cantidadAjuste && (
                      <div className="invalid-feedback">{errors.cantidadAjuste.message}</div>
                    )}
                  </div>
                  {postError && <div className="alert alert-danger">{postError}</div>}
                  <div className="d-flex gap-2 justify-content-start">
                    <button type="submit" className="btn btn-primary btn-lg">ENVIAR</button>
                    <button type="button" className="btn btn-secondary btn-lg" onClick={onVolver}>VOLVER</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {action === "C" && (
        <ConsultaAjustes rows={rows} onVolver={onVolver} />
      )}
    </div>
  )
}