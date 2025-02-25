const leaveModel = require("../models/leaveModel.js");

const leaveAdd = async (req, res) => {
    try {
        const leaveAdd = new leaveModel(req.body)

        await leaveAdd.save()
        .then(() => {
            return res.status(201).json(leaveAdd)
        })
        .catch((err) => {
            return res.status(400).json({
                succes: false,
                message: "İzin Talebi Eklenemedi : " + err
            })
        })

    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "İzin Talebi Eklenemedi"
        })
    }
}

const leaveGetAll = async (req, res) => {
    try {
        const leaveGetAll = await leaveModel.find({})
        return res.status(200).json({
            succes: true,
            data: leaveGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "İzin talepleri getirilirken hata oluştu : " + error
        })
    }
}

const leaveUpdate = async (req, res) => {
    try {
        const { id } = req.params

        const leaveUpdate = await leaveModel.findByIdAndUpdate(id , req.body)
        if(leaveUpdate) {
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


module.exports = {
    leaveAdd,
    leaveGetAll,
    leaveUpdate
}