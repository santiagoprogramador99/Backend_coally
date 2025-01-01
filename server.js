const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
connectDB();

// Asegúrate de que el servidor escuche en todas las interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
