const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;

  try {
    const result = await cloudinary.uploader.upload(file.path);
    const product = await Product.create({
      name,
      description,
      image: result.secure_url,
      price,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.image = result.secure_url;
    }

    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
