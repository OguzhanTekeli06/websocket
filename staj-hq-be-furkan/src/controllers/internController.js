const internModel = require("../models/internModel.js")
const internService = require("../services/internService.js")
const bcrypt= require("bcryptjs");
const fileSystem = require("fs");

function generatePassword () {
    return Math.random().toString(36).slice(-6);
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const internAdd = async (req, res) => {
    try {
        const {applicationId,
               name, 
               identityNo, 
               school, 
               department, 
               grade,
               gpa_4,
               term,
               city,
               phoneNumber, 
               email,
               faculty,
               yoksisVerification,
               gpa_100,
               transcriptLink,
               hasInternshipExperience,
               gender,
               nationality,
               address,
               postCode,
               district, 
               mentorId, 
               internshipPeriod} = req.body;
               
        const password = generatePassword();
        console.log(req.body.name + " Şifre: " + password);
        const hashedPassword= await bcrypt.hash(password,10);

        const internAdd = new internModel({applicationId,
                                           name, 
                                           identityNo, 
                                           school, 
                                           department, 
                                           grade,
                                           gpa_4,
                                           term,
                                           city,
                                           phoneNumber, 
                                           email,
                                           password:hashedPassword,
                                           mustChangePassword:true,
                                           faculty,
                                           yoksisVerification,
                                           gpa_100,
                                           transcriptLink,
                                           hasInternshipExperience,
                                           gender,
                                           nationality,
                                           address,
                                           postCode,
                                           district, 
                                           mentorId, 
                                           internshipPeriod})
        await internAdd.save()
        .then(() => {
            return res.status(201).json(internAdd)
        })
        .catch((err) => {
            return res.status(400).json({
                succes: false,
                message: "Stajyer Eklenemedi : " + err
            })
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Stajyer Eklenemedi"
        })
    }
}

const internAddFromExcel = async (req, res) => {

    try {

        const filePath = req.file ? req.file.path : null

        if(!filePath){
            return res.status(400).json({error: "Excel dosyası bulunamadı!"})
        }

        const excelData = internService.importExcel(filePath);
        const allPages = Object.keys(excelData); 

        for (const page of allPages) {
            excelData[page] = await Promise.all(excelData[page].map(async item => {
                item.password = generatePassword();
                item.mustChangePassword = true;

                console.log(item.name + " Şifre: " + item.password);
                
                item.password = await hashPassword(item.password);
                
                return item;
            }));

            await internModel.insertMany(excelData[page]);
        }

        res.status(200).send("Stajyerler başarıyla eklendi."); 
    } catch (error) {
        res.status(500).send("Stajyerler eklenirken hata oluştu: " + error.message);
    }
}

 


const internGetAll = async (req, res) => {
    try {
        const internGetAll = await internModel.find(req.query)
        return res.status(200).json({
            succes: true,
            data: internGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Stajyerler getirilirken hata oluştu : " + error
        })
    }
}

const internGetOne = async (req , res) => {
    const {id} = req.params
    const internGet = await internModel.findById(id)

    if(internGet){
        return res.status(200).json(internGet)
    }
    else {
        return res.status(404).json({
            success : false,
            message : "Kayıt getirilemedi!"
        })
    }
}

const internUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const internUpdate = await internModel.findByIdAndUpdate(id , req.body)
        if(internUpdate) {
            return res.status(200).json({
                succes: true,
                message: "Güncelleme Başarılı"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Stajyer bilgileri güncellenemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Stajyer bilgileri güncellenemedi : " + error
        })
    }
}



const internDelete = async (req, res) => {
    try {
        const { id } = req.params

        const internDelete = await internModel.findByIdAndDelete(id)
        if(internDelete) {
            return res.status(200).json({
                succes: true,
                message: "Stajyer başarıyla silindi"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Stajyer silinemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Stajyer silinemedi : " + error
        })
    }
}


const internSetMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const { mentorId } = req.body; // Yalnızca mentorId'yi almak için req.body'den mentorId çıkarılır

        const internUpdate = await internModel.findByIdAndUpdate(
            id,
            { mentorId }, // Yalnızca mentorId'yi günceller
            { new: true }
        );

        if (internUpdate) {
            return res.status(200).json({
                success: true,
                message: "Mentör Atandı."
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Mentör atanamadı!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Mentör Atanamadı: " + error
        });
    }
};

module.exports = {
    internAdd,
    internAddFromExcel,
    internGetAll,
    internGetOne,
    internUpdate,
    internDelete,
    internSetMentor
}