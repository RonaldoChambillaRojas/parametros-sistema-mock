import './ParametroTable.css';

const ParametroTable = ({ parametros, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando parámetros...</p>
      </div>
    );
  }

  if (parametros.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay parámetros registrados</p>
        <p className="empty-state-subtitle">Haz clic en "Nuevo Parámetro" para agregar uno</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="parametros-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Parámetro</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parametros.map((parametro) => (
            <tr key={parametro.id}>
              <td>{parametro.id}</td>
              <td className="nombre-parametro">{parametro.NombreParametroSistema}</td>
              <td className="valor-parametro">{parametro.ValorParametroSistema}</td>
              <td className="acciones">
                <button
                  onClick={() => onEdit(parametro)}
                  className="btn-action btn-edit"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Editar
                </button>
                <button
                  onClick={() => onDelete(parametro)}
                  className="btn-action btn-delete"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParametroTable;
