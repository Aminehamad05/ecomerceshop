import Product from "../models/product.model.js";
export const createProducts= async(req,res) => {
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success:true,data: newProduct })
    }catch(error){
        console.error("Error in create product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}
export const deleteProducts = async (req,res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true , message:"Product deleted"})
    }catch{
        res.status(404).json({success: false , message: "Product not found"})
    }
}
export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(err){
        console.log("Error in fetching products: ",err.message);
        res.status(500).json({success: false,message:"Server Error"})
    }
}
export const updateProducts = async (req,res) => {
    const {id}= req.params;
    console.log(id)
    const product=req.body;
    try{
       const updatedProd=await Product.findByIdAndUpdate(id,product,{new:true});
       res.status(200).json({success:true,data:updatedProd});
    }catch(error){
        res.status(500).json({success:false , message :"server Error"})
    }
}