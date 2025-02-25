const internshipModel = require("../models/internshipModel.js")


const internshipAdd = async (req, res) => {
    try {
        const internshipAdd = new internshipModel(req.body)
        await internshipAdd.save()
        .then(() => {
            return res.status(201).json(internshipAdd)
        })
        .catch((err) => {
            return res.status(400).json({
                succes: false,
                message: "Staj Dönemi Eklenemedi : " + err
            })
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Staj Dönemi Eklenemedi"
        })
    }
}


const internshipGetAll = async (req, res) => {
    try {
        const internshipGetAll = await internshipModel.find(req.query)
        return res.status(200).json({
            succes: true,
            data: internshipGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Staj dönemleri getirilirken hata oluştu : " + error
        })
    }
}

const internshipUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const internshipUpdate = await internshipModel.findByIdAndUpdate(id , req.body)
        if(internshipUpdate) {
            return res.status(200).json({
                succes: true,
                message: "Güncelleme Başarılı"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Staj dönemi güncellenemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: "Staj dönemi güncellenemedi : " + error
        })
    }
}

const internshipDelete = async (req, res) => {
    try {
        const { id } = req.params

        const internshipDelete = await internshipModel.findByIdAndDelete(id)
        if(internshipDelete) {
            return res.status(200).json({
                succes: true,
                message: "Staj dönemi başarıyla silindi"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Staj dönemi silinemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Staj dönemi silinemedi : " + error
        })
    }
}


module.exports = {
    internshipAdd,
    internshipGetAll,
    internshipUpdate,
    internshipDelete,
}