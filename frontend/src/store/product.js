import { create } from "zustand"
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduc) => {
        if (!newProduc.name || !newProduc.image || !newProduc.price) {
            return { success: false, message: "Please fill in all fields" }
        }
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduc)
        });
        const data = await response.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" }
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set ({products : data.data })
    },
    deleteProduct: async(pid)=>{
        const res = await fetch(`/api/products/${pid}`,{
            method:"DELETE"
        })
        const data = await res.json();
        if(!data.success){
            return {success : false , message: data.message};
        }
        set((state) => ({products: state.products.filter((p) => p._id !== pid)}));
        return{success : true , message:data.message}
    },
    updateProduct: async (pid,updatedProducts)=>{
        const res = await (fetch(`/api/products/${pid}`,{
            method:"PUT",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedProducts)
        }));
        const data = await res.json();
        if(!data.success) return {success: false , message:data.message};
        //update the ui immediatly without a refresh
        set(state => ({
            products:state.products.map((prod)=> (prod._id===pid ? data.data:prod ))
        }))
        return({success:true , message:data.message})
    }
}));
