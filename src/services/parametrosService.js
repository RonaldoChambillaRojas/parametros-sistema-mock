import axios from 'axios';

// Configuración del API - Vite usa import.meta.env en lugar de process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

// Datos mock para desarrollo
const mockData = [
  { id: 1, NombreParametroSistema: 'TIMEOUT_SESSION', ValorParametroSistema: '3600' },
  { id: 2, NombreParametroSistema: 'MAX_UPLOAD_SIZE', ValorParametroSistema: '10485760' },
  { id: 3, NombreParametroSistema: 'ENABLE_LOGS', ValorParametroSistema: 'true' },
  { id: 4, NombreParametroSistema: 'SMTP_HOST', ValorParametroSistema: 'smtp.example.com' },
];

let mockDatabase = [...mockData];
let nextId = 5;

// Flag para usar datos mock o API real
const USE_MOCK = true; // Cambiar a false cuando tengas el API real

const parametrosService = {
  // Obtener todos los parámetros
  getAll: async () => {
    if (USE_MOCK) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockDatabase };
    }
    
    return axios.get(`${API_BASE_URL}/parametros`);
  },

  // Obtener un parámetro por ID
  getById: async (id) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const parametro = mockDatabase.find(p => p.id === parseInt(id));
      if (!parametro) {
        throw new Error('Parámetro no encontrado');
      }
      return { data: parametro };
    }
    
    return axios.get(`${API_BASE_URL}/parametros/${id}`);
  },

  // Crear un nuevo parámetro
  create: async (parametro) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const nuevoParametro = {
        id: nextId++,
        ...parametro
      };
      mockDatabase.push(nuevoParametro);
      return { data: nuevoParametro };
    }
    
    return axios.post(`${API_BASE_URL}/parametros`, parametro);
  },

  // Actualizar un parámetro existente
  update: async (id, parametro) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockDatabase.findIndex(p => p.id === parseInt(id));
      if (index === -1) {
        throw new Error('Parámetro no encontrado');
      }
      mockDatabase[index] = { id: parseInt(id), ...parametro };
      return { data: mockDatabase[index] };
    }
    
    return axios.put(`${API_BASE_URL}/parametros/${id}`, parametro);
  },

  // Eliminar un parámetro
  delete: async (id) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockDatabase.findIndex(p => p.id === parseInt(id));
      if (index === -1) {
        throw new Error('Parámetro no encontrado');
      }
      mockDatabase.splice(index, 1);
      return { data: { success: true } };
    }
    
    return axios.delete(`${API_BASE_URL}/parametros/${id}`);
  }
};

export default parametrosService;
