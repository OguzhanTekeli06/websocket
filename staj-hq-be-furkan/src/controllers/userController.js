const bcrypt= require("bcryptjs");
const userModel = require("../models/userModel");

const userAdd = async (req, res) => {
    try {
        const {employeeId,name,email,password,phoneNumber,department,title,role} = req.body;
        
        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email Kullanılıyor."});
        }
        
        const hashedPassword= await bcrypt.hash(password,10);

        const newUser= new userModel({employeeId,name,email,password:hashedPassword,phoneNumber,department,title,role});
        await newUser.save();
        console.log(password);
        

        res.status(201).json({message:"Kullanıcı Oluşturuldu."});

    } catch (error) {
        return res.status(500).json({message:"Server error", error});
    }
};

const userGetAll = async (req, res) => {
    try {
        const userGetAll = await userModel.find({})
        return res.status(200).json({
            succes: true,
            data: userGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Kullanıcılar getirilirken hata oluştu : " + error
        })
    }
}


const userGetOne = async (req , res) => {
    const {id} = req.params
    const userGet = await userModel.findById(id)

    if(userGet){
        return res.status(200).json(userGet)
    }
    else {
        return res.status(404).json({
            success : false,
            message : "Kayıt getirilemedi!"
        })
    }
}


const userUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const userUpdate = await userModel.findByIdAndUpdate(id , req.body)
        if(userUpdate) {
            return res.status(200).json({
                succes: true,
                message: "Güncelleme Başarılı"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Güncelleneme başarısız oldu!"
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Güncelleneme başarısız oldu : " + error
        })
    }
}


const userDelete = async (req, res) => {
    try {
        const { id } = req.params

        const userDelete = await userModel.findByIdAndDelete(id)
        if(userDelete) {
            return res.status(200).json({
                succes: true,
                message: "Kullanıcı başarıyla silindi"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Kullanıcı silinemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Kullanıcı silinemedi : " + error
        })
    }
}




module.exports={
    userAdd,
    userGetAll,
    userGetOne,
    userUpdate,
    userDelete
};