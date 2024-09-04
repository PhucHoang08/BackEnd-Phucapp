const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")


const createUser = (newUser) => {
    return new Promise(async (resolve, reject)=>{
        const {name, email, password, confirmPassword} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status:"ERR",
                    message:"THE EMAIL IS ALREADY"
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name, 
                email, 
                password: hash,  
                confirmPassword,
            })
            if(createdUser){
                resolve({
                    status: "OK",
                    message: "SUCCESS!",
                    data: createdUser
                })
            }
        }catch(e){
            reject(e)
        }
    })
}


const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject)=>{
        const {email, password} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status:"ERR",
                    message:"THE USER IS NOT DEFINED, TRY AGAIN"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
           
            if(!comparePassword){
                resolve({
                    status:"ERR",
                    message:"THE PASSWORD OR USER IS INCORRECT"
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: "OK",
                message: "SIGN IN SUCCESS!",
                access_token,
                refresh_token
            })
        }catch(e){
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                resolve({
                    status:"ERR",
                    message:"THE USER IS NOT DEFINED"
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id,data,{new:true})
            resolve({
                status: "OK",
                message: "SUCCESS!",
                data: updatedUser
            })
        }catch(e){
            reject(e)
        }
    })
}


const deleteUser = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                resolve({
                    status:"ERR",
                    message:"THE USER IS NOT DEFINED"
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS!"
            })
        }catch(e){
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject)=>{
        try{
            const allUser = await User.find()
            resolve({
                status: "OK",
                message: "Get all user success!!!",
                data:allUser
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const user = await User.findOne({
                _id: id
            })
            if(user === null){
                resolve({
                    status:"ERR",
                    message:"THE USER IS NOT DEFINED"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS!",
                data: user
            })
        }catch(e){
            reject(e)
        }
    })
}







module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}