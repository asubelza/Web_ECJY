const Specialist = require('../models/Specialist');

exports.getSpecialists = async (req, res) => {
  try {
    const specialists = await Specialist.find({ active: true })
      .sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      data: specialists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createSpecialist = async (req, res) => {
  try {
    const { area, name, description, order } = req.body;

    const specialist = await Specialist.create({
      area,
      name,
      description,
      order: order || 0
    });

    res.status(201).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateSpecialist = async (req, res) => {
  try {
    const { id } = req.params;
    const { area, name, description, order, active } = req.body;

    const specialist = await Specialist.findByIdAndUpdate(
      id,
      { area, name, description, order, active },
      { new: true, runValidators: true }
    );

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.json({
      success: true,
      data: specialist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteSpecialist = async (req, res) => {
  try {
    const { id } = req.params;

    const specialist = await Specialist.findByIdAndDelete(id);

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Especialista eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
