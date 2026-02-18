const Tool = require('../models/Tool');

exports.getTools = async (req, res) => {
  try {
    const { category, active } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (active !== undefined) query.active = active === 'true';

    const tools = await Tool.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: tools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createTool = async (req, res) => {
  try {
    const { name, description, category, url, icon, color, isExternal, order, active } = req.body;

    const tool = await Tool.create({
      name,
      description,
      category,
      url,
      icon,
      color,
      isExternal,
      order: order || 0,
      active: active !== false
    });

    res.status(201).json({
      success: true,
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateTool = async (req, res) => {
  try {
    const { name, description, category, url, icon, color, isExternal, order, active } = req.body;

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { name, description, category, url, icon, color, isExternal, order, active },
      { new: true, runValidators: true }
    );

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Herramienta no encontrada'
      });
    }

    res.json({
      success: true,
      data: tool
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Herramienta no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Herramienta eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
