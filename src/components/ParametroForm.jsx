import { useState, useEffect } from 'react';
import './ParametroForm.css';

const ParametroForm = ({ parametroEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    NombreParametroSistema: '',
    ValorParametroSistema: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (parametroEdit) {
      setFormData({
        NombreParametroSistema: parametroEdit.NombreParametroSistema,
        ValorParametroSistema: parametroEdit.ValorParametroSistema
      });
    } else {
      setFormData({
        NombreParametroSistema: '',
        ValorParametroSistema: ''
      });
    }
  }, [parametroEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.NombreParametroSistema.trim()) {
      newErrors.NombreParametroSistema = 'El nombre del parámetro es requerido';
    }
    
    if (!formData.ValorParametroSistema.trim()) {
      newErrors.ValorParametroSistema = 'El valor del parámetro es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <h2>{parametroEdit ? 'Editar Parámetro' : 'Nuevo Parámetro'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="NombreParametroSistema">
            Nombre del Parámetro <span className="required">*</span>
          </label>
          <input
            type="text"
            id="NombreParametroSistema"
            name="NombreParametroSistema"
            value={formData.NombreParametroSistema}
            onChange={handleChange}
            className={errors.NombreParametroSistema ? 'error' : ''}
            placeholder="Ej: TIMEOUT_SESSION"
          />
          {errors.NombreParametroSistema && (
            <span className="error-message">{errors.NombreParametroSistema}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ValorParametroSistema">
            Valor del Parámetro <span className="required">*</span>
          </label>
          <input
            type="text"
            id="ValorParametroSistema"
            name="ValorParametroSistema"
            value={formData.ValorParametroSistema}
            onChange={handleChange}
            className={errors.ValorParametroSistema ? 'error' : ''}
            placeholder="Ej: 3600"
          />
          {errors.ValorParametroSistema && (
            <span className="error-message">{errors.ValorParametroSistema}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {parametroEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParametroForm;
