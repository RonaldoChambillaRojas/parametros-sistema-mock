import { useState, useEffect } from 'react';
import ParametroTable from './components/ParametroTable';
import ParametroForm from './components/ParametroForm';
import ConfirmModal from './components/ConfirmModal';
import parametrosService from './services/parametrosService';
import './App.css';

function App() {
  const [parametros, setParametros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [parametroEdit, setParametroEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parametroToDelete, setParametroToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  // Cargar parámetros al montar el componente
  useEffect(() => {
    loadParametros();
  }, []);

  const loadParametros = async () => {
    try {
      setLoading(true);
      const response = await parametrosService.getAll();
      setParametros(response.data);
    } catch (error) {
      showNotification('Error al cargar los parámetros', 'error');
      console.error('Error cargando parámetros:', error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleNewParametro = () => {
    setParametroEdit(null);
    setShowForm(true);
  };

  const handleEditParametro = (parametro) => {
    setParametroEdit(parametro);
    setShowForm(true);
  };

  const handleDeleteClick = (parametro) => {
    setParametroToDelete(parametro);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await parametrosService.delete(parametroToDelete.id);
      await loadParametros();
      showNotification('Parámetro eliminado exitosamente');
    } catch (error) {
      showNotification('Error al eliminar el parámetro', 'error');
      console.error('Error eliminando parámetro:', error);
    } finally {
      setShowDeleteModal(false);
      setParametroToDelete(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (parametroEdit) {
        // Actualizar parámetro existente
        await parametrosService.update(parametroEdit.id, formData);
        showNotification('Parámetro actualizado exitosamente');
      } else {
        // Crear nuevo parámetro
        await parametrosService.create(formData);
        showNotification('Parámetro creado exitosamente');
      }
      
      await loadParametros();
      setShowForm(false);
      setParametroEdit(null);
    } catch (error) {
      showNotification(
        parametroEdit ? 'Error al actualizar el parámetro' : 'Error al crear el parámetro',
        'error'
      );
      console.error('Error en formulario:', error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setParametroEdit(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Gestión de Parámetros del Sistema</h1>
          <p className="subtitle">Administra los parámetros de configuración de tu sistema</p>
        </header>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="content">
          {!showForm ? (
            <>
              <div className="actions-bar">
                <button onClick={handleNewParametro} className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Nuevo Parámetro
                </button>
                <button onClick={loadParametros} className="btn btn-secondary" disabled={loading}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  Actualizar
                </button>
              </div>

              <ParametroTable
                parametros={parametros}
                onEdit={handleEditParametro}
                onDelete={handleDeleteClick}
                loading={loading}
              />
            </>
          ) : (
            <ParametroForm
              parametroEdit={parametroEdit}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}
        </div>

        <ConfirmModal
          isOpen={showDeleteModal}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar el parámetro "${parametroToDelete?.NombreParametroSistema}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}

export default App;
