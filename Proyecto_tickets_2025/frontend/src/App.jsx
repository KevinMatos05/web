import { useState, useEffect } from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ticket_services } from './services/ticket.service';
import {useForm} from "react-hook-form"

// URL base de la API. ¡Asegúrate de que el puerto sea 3000!
function App() {
  // Estado para almacenar la lista de tickets
  const [tickets, setTickets] = useState([]);
  // Estado para manejar el mensaje de "Cargando..."
  const [isLoading, setIsLoading] = useState(true);
  // Estado para manejar errores de carga
  const [error, setError] = useState(null);

  const [apiFormError, setApiFormError] = useState(null)

  // useEffect para cargar los tickets cuando el componente se monta por primera vez
  useEffect(() => {
    fetchTickets();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez



  // Función para obtener los tickets del backend
  const fetchTickets = async () => {
    try {
      setIsLoading(true); // Inicia la carga
      setError(null); // Limpia errores previos
      const response = await ticket_services.getAll();
      setTickets(response); // Actualiza el estado con los datos de la API
    } catch (err) {
      console.error("Error al obtener los tickets:", err);
      setError("No se pudieron cargar los tickets. Intente más tarde.");
    } finally {
      setIsLoading(false); // Finaliza la carga, sin importar si fue exitosa o no
    }
  };


const handleCreateTicket = async (ticketData) => {
  setApiFormError(null)
  try {
    const response = await ticket_services.createTicket(ticketData)
    setTickets([response, ...tickets]) // <-- Agrega el ticket a la lista
    return {success:true}
  } catch (error) {
    console.error("Error al crear el ticket: ", error)
    const errorMessage = error.response?.data?.message || "No se pudo crear el ticket. Intente de nuevo"
    setApiFormError(errorMessage)
    return {success: false, error: errorMessage}
  }
}
  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="display-4 text-center">Sistema de Gestión de Tickets</h1>
        <p className="text-center text-muted">Parcial DDS - React</p>
      </header>
      
      <main> 
        <div className="row">
          <div className="col-md-5">
            <h2 className="mb-3">Crear Nuevo Ticket</h2>
            {/* Pasamos la función como prop al formulario */}
            <TicketForm  onSave={handleCreateTicket} apiError={apiFormError} />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">Tickets Pendientes</h2>
            {/* Pasamos los datos y estados a la lista */}
            <TicketList tickets={tickets} isLoading={isLoading} error={error} ></TicketList>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;