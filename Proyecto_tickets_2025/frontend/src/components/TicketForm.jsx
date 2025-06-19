import { useForm } from "react-hook-form";
import { ticket_services } from "../services/ticket.service";

function TicketForm({onSave, apiError}) { 

  const {register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm()

const onsubmit = async (data) => {
  const result = await onSave(data); // Espera la respuesta del padre
  if (result && result.success) {
    reset();
  }
}

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onsubmit)}>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <div>
            <label htmlFor="nombreTarea" className="form-label">
              Nombre Tarea:
            </label>
            <input
            id="nombreTarea"
            name="nombreTarea"
            type="text"
            className= {`form-control ${errors.nombreTarea ? "is-invalid" : ""}`}
            {...register("nombreTarea", {
              required: {
                value:true,
                message: "El nombre de la tarea es requerido"
              },
              minLength: {
                value: 5,
                message: "El nombre de la tarea debe tener almenos 5 caracteres"
              }
            })}
            />
            {errors.nombreTarea && (
              <div className="invalid-feedback">{errors.nombreTarea.message}</div>
            )}
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">
                  Fecha
                </label>
                <input
                id="fecha"
                name="fecha"
                type="date"
                className= {`form-control ${errors.fecha ? "is-invalid" : ""}`}
                {...register("fecha", {
                  required: {
                    value: true,
                    message: "La fecha es obligatoria"
                  }
                })}
                />
                {errors.fecha && (
                  <div className="invalid-feedback">{errors.fecha.message}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="prioridad" className="form-label">
                  prioridad
                </label>
                <input
                id="prioridad"
                name="prioridad"
                type="number"
                className= {`form-control ${errors.prioridad ? "is-invalid" : ""}`}
                {...register("prioridad", {
                  required: {
                    value:true,
                    message: "La prioridad es requerida"
                  },
                  min: {
                    value: 1,
                    message: "La prioridad debe ser al menos 1"
                  },
                  max: {
                    value: 10,
                    message: "La prioridad no puede ser mayor a 10"
                  }
                })}
                />
                {errors.prioridad && (
                  <div className="invalid-feedback">{errors.prioridad.message}</div>
                )}
            </div>
            <button type="submit" className="btn btn-primary w-100"  disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Crear Ticket"}</button>
          </form>
        </div>
      </div>
    
    </>
  );
}

export default TicketForm;