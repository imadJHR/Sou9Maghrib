import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand,bestSeller , status, category } = req.body;
    const image = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      status,
      category,
      image,
      bestSeller: bestSeller || false,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId); // Ensure Product is your Mongoose model
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, brand, status, category } = req.body;
    const image = req.file ? req.file.path : null;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, brand, status, category, image },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ bestSeller: true }).limit(4); // Fetch 4 best sellers
    res.status(200).json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


