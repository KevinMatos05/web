import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { libros_service } from "./services/libros.service";
import LibrosTable from "./components/LibrosTable";
import LibroForm from "./components/LibroForm";

function LibrosPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const [libros, setLibros] = useState([]);
    const [accion, setAccion] = useState("C");
    const [bookToEdit, setBookToEdit] = useState(null);

    const fetchLibros = async (search) => {
        try {
            if (search) {
                const response = await libros_service.getLibrosByTitulo(search);
                setLibros(response);
            } else {
                const response = await libros_service.getAllLibros();
                setLibros(response);
            }
        } catch (error) {
            console.error("Error al obtener todos los libros", error);
        }
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    const onSubmit = async (data) => {
        await fetchLibros(data.search);
    };

    const handleDeleteLibro = async (id) => {
        try {
            const response = await libros_service.deleteLibro(id)
            if (!response.error) {
                setLibros(libros.filter(libro => libro.IdLibro !== id))
            } else {
                console.error("No se pudo eliminar el libro")
            }
        } catch (error) {
            console.error("Error al eliminar el libro")
        }
    }


    const onEdit = (id) => {
        const libro = libros.find(l => l.IdLibro === id);
        setBookToEdit(libro);
        setAccion("M");
    };

    return (
        <>
            {accion === "C" && (
                <>
                    <h1 className="text-center mb-4">
                        Lista de Libros
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row justify-content-center mb-2">
                            <div className="col-6">
                                <div className="input-group">
                                    <input
                                        id="search"
                                        name="search"
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar por título..."
                                        {...register("search", { required: false })}
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        Buscar
                                    </button>
                                </div>
                                <span className="text-danger">{errors?.search && errors.search.message}</span>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => setAccion("A")}
                                >
                                    Agregar Nuevo Libro
                                </button>
                            </div>
                        </div>
                    </form>
                    {libros.length > 0 ? (
                        <LibrosTable libros={libros} onEdit={onEdit} onDelete={handleDeleteLibro}  />
                    ) : <p>No hay libros disponibles que cumplan lo solicitado</p>}
                </>
            )}

            {accion === "A" && (
                <>
                    <LibroForm  onSave={async () => {
                        setAccion("C");
                        await fetchLibros()
                    }} onCancel={()=> setAccion("C")} bookToEdit={null} ></LibroForm>
                </>
            )}

            {accion === "M" && (
                <>
                    <LibroForm   onSave={async()=> {
                        setAccion("C")
                        await fetchLibros()
                    }}  onCancel={()=> {setAccion("C")}}  bookToEdit={bookToEdit} ></LibroForm>
                </>
            )}
        </>
    );
}

export default LibrosPage;