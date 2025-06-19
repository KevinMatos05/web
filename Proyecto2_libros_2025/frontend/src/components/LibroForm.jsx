import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { libros_service } from "../services/libros.service";

function LibroForm({ onCancel, onSave, bookToEdit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (bookToEdit) {
            setValue("Titulo", bookToEdit.Titulo);
            setValue("Autor", bookToEdit.Autor);
            setValue("AnioPublicacion", bookToEdit.AnioPublicacion);
        } else {
            reset();
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            let response;
            if (bookToEdit) {
                response = await libros_service.updateLibro(bookToEdit.IdLibro, data);
            } else {
                response = await libros_service.createLibro(data);
            }
            if (response.error) {
                setError(true);
                return;
            }
            setError(false);
            await onSave();
            reset();
        } catch (error) {
            console.error("Error al guardar el libro", error);
            setError(true);
        }
    };

    return (
        <>
            <h1 className="text-center mb-4">Formulario Libro</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="Titulo" className="form-label">
                        Título:
                    </label>
                    <input
                        id="Titulo"
                        name="Titulo"
                        type="text"
                        className={`form-control ${errors.Titulo ? "is-invalid" : ""}`}
                        {...register("Titulo", {
                            required: {
                                value: true,
                                message: "El Título del libro es obligatorio"
                            }
                        })}
                    />
                    {errors.Titulo && (
                        <div className="invalid-feedback">{errors.Titulo.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="Autor" className="form-label">
                        Autor:
                    </label>
                    <input
                        id="Autor"
                        name="Autor"
                        type="text"
                        className={`form-control ${errors.Autor ? "is-invalid" : ""}`}
                        {...register("Autor", {
                            required: {
                                value: true,
                                message: "El Autor del libro es obligatorio"
                            }
                        })}
                    />
                    {errors.Autor && (
                        <div className="invalid-feedback">{errors.Autor.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="AnioPublicacion" className="form-label">
                        Año Publicación:
                    </label>
                    <input
                        id="AnioPublicacion"
                        name="AnioPublicacion"
                        type="number"
                        className={`form-control ${errors.AnioPublicacion ? "is-invalid" : ""}`}
                        {...register("AnioPublicacion", {
                            required: {
                                value: true,
                                message: "El Año de publicación del libro es obligatorio"
                            },
                            min: {
                                value: 1600,
                                message: "El año debe ser mayor a 1600"
                            },
                            max: {
                                value: new Date().getFullYear(),
                                message: `El año no puede ser mayor al actual (${new Date().getFullYear()})`
                            }
                        })}
                    />
                    {errors.AnioPublicacion && (
                        <div className="invalid-feedback">{errors.AnioPublicacion.message}</div>
                    )}
                </div>
                {error && (
                    <div className="alert alert-danger">
                        Error al guardar el libro, por favor inténtelo de nuevo.
                    </div>
                )}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => { reset(); onCancel(); }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
}

export default LibroForm;