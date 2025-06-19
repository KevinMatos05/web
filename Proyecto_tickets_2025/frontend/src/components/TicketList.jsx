function TicketList({tickets, isLoading, error}) {
    if (isLoading) {
        return <div className="alert alert-info text-center mt-3">Cargando Tickets...</div>
    }
    if (error) {
        return <div clasName="alert alert-warning text-center mt-3">{error}</div>
    }

    if (tickets.length === 0) {
        return <div className="alert alert-warning text-center mt-3">No se encontraron tickets</div>
    }

    return (
        <>
        <table className="table table-striped table-hover align-middle">
            <thead className="table table-striped table-hover aling-middle">
                <tr>
                    <th>ID</th>
                    <th>Nombre Tarea</th>
                    <th>Fecha</th>
                    <th>Prioridad</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <tr key={ticket.idTicket}>
                        <td>{ticket.idTicket}</td>
                        <td>{ticket.nombreTarea}</td>
                        <td>{new Date(ticket.fecha).toLocaleDateString()}</td>
                        <td>{ticket.prioridad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        </>
    );
}

export default TicketList;