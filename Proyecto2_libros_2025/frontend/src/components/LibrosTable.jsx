function LibrosTable({ libros, onDelete, onEdit }) {

    const deleteLibro = (id) => {
        if (window.confirm("¿Estas seguro que desea eliminar el libro?"))
            onDelete(id);
    };

    return (
        <table className="table table-striped align-middle">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Año Publicación</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {libros.map((libro) => (
                    <tr key={libro.IdLibro}>
                        <td>{libro.IdLibro}</td>
                        <td>{libro.Titulo}</td>
                        <td>{libro.Autor}</td>
                        <td>{libro.AnioPublicacion}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-secondary btn-sm w-100"
                                    onClick={() => onEdit(libro.IdLibro)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm w-100"
                                    onClick={() => deleteLibro(libro.IdLibro)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LibrosTable;