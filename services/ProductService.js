const Product = require("../model/ProductModel")


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject)=>{
        const {name, price,color,sizeS,sizeM,sizeL,sizeXl} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status:"ERR",
                    message:"THE NAME OF PRODUCT IS ALREADY"
                })
            }
            const newProduct = await Product.create({
                name, 
                price, 
                color
            })
            if(newProduct){
                resolve({
                    status: "OK",
                    message: "CREATE PRODUCT SUCCESS!",
                    data: newProduct
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status:"OK",
                    message:"The product is not defined"
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id,data,{new:true})
            resolve({
                status: "OK",
                message: "SUCCESS!",
                data: updatedProduct
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status:"OK",
                    message:"The product is not defined"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS!"
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status:"OK",
                    message:"The product is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS!",
                data: product
            })
        }catch(e){
            reject(e)
        }
    })
}

const getAllProduct = (limit,page,sort,filter) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const totalProduct = await Product.count()
            console.log("filter",filter)
            if(filter){
                const label = filter[0];
                const allObjectFilter = await Product.find({[label]:{'$regex':filter[1]}}).limit(limit).skip( page * limit )
                resolve({
                    status: "OK",
                    message: "Get all product success!!!",
                    data:allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip( page * limit ).sort(objectSort)
                resolve({
                    status: "OK",
                    message: "Get all product success!!!",
                    data:allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip( page * limit )
            resolve({
                status: "OK",
                message: "Get all product success!!!",
                data:allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        }catch(e){
            reject(e)
        }
    })
}





module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct

}