import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConsultaAjustes from './ConsultaAjustes'

export default function Principal() {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/ajustes')
            .then(res => res.json())
            .then(data => setRows(data))
            .catch(() => setRows([]))
    }, [])

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <h1 className="mb-4">Menú Principal</h1>
                            <button
                                onClick={() => navigate("/ajuste")}
                                className="btn btn-primary btn-lg"
                            >
                                Registrar Ajuste de Stock
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ConsultaAjustes rows={rows} onVolver={() => {}} />
        </div>
    )
}