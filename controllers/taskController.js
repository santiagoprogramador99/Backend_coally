const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, completed } = req.body;
  if (!title || !description || completed === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtener todas las tareas con filtro opcional por estado
exports.getTasks = async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = completed ? { completed: completed === 'true' } : {};
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Actualizar una tarea
// Actualizar una tarea
exports.updateTask = async (req, res) => {
  const { id } = req.params; // ID de la tarea desde los parámetros de la ruta
  const updates = req.body; // Campos a actualizar desde el cuerpo de la solicitud

  try {
    // Validar si hay datos en el cuerpo
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    // Actualizar tarea y devolver la versión actualizada
    const task = await Task.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Retorna el documento actualizado y valida los datos
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task); // Enviar la tarea actualizada como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};


// Eliminar una tarea
// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la tarea desde los parámetros

  try {
    const task = await Task.findByIdAndDelete(id); // Buscar y eliminar la tarea por su ID

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Si no existe, retorna 404
    }

    res.status(200).json({ message: `Task ${id} deleted successfully` }); // Respuesta exitosa
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err }); // Error interno
  }
};

