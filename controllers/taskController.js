const Task = require('../models/task');
const { validationResult } = require('express-validator');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extraer datos del cuerpo de la solicitud
  const { title, description, completed } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!title || !description || completed === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Crear una nueva tarea con los datos proporcionados
    const task = new Task({ title, description, completed });

    // Guardar la tarea en la base de datos
    await task.save();

    // Enviar la respuesta con la tarea creada
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
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: `Task ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};

