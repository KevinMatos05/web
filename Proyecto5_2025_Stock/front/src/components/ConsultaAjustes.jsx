import React from 'react'

export default function ConsultaAjustes({ rows, onVolver }) {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="mb-4 text-center">Listado de Ajustes de Stock</h4>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">Producto ID</th>
                                            <th className="text-center">Fecha</th>
                                            <th className="text-center">Motivo</th>
                                            <th className="text-center">Cantidad Ajuste</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(!rows || rows.length === 0) ? (
                                            <tr>
                                                <td colSpan={5} className="text-center">
                                                    No hay ajustes registrados.
                                                </td>
                                            </tr>
                                        ) : (
                                            rows.map((ajuste, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{ajuste.Id}</td>
                                                    <td className="text-center">{ajuste.Producto_id}</td>
                                                    <td className="text-center">{ajuste.Fecha}</td>
                                                    <td className="text-center">{ajuste.Motivo}</td>
                                                    <td className="text-center">{ajuste.CantidadAjuste}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-secondary m-2" onClick={onVolver}>
                                    VOLVER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}