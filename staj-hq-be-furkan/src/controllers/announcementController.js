const announcementModel = require("../models/announcementModel.js");

const getAllAnnouncements = async (req, res) => {
    try { 
        const announcements = await announcementModel.find(); 
        res.json(announcements); 
    }
    catch (error) { 
        res.status(500).json({ error: "Duyurular alınırken hata oluştu." }); 
    }
};

const addAnnouncement = async (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({ error: "Başlık ve mesaj zorunludur." });
        }

        const newAnnouncement = new announcementModel({ title, message });
        await newAnnouncement.save();

        res.status(201).json({ success: true, message: "Duyuru oluşturuldu." });
    } catch (error) { res.status(500).json({ error: "Duyuru oluşturulurken hata oluştu." }); }
};


const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await announcementModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Duyuru bulunamadı." });
        }

        res.json({ success: true, message: "Duyuru başarıyla silindi." });
    } catch (error) { res.status(500).json({ error: "Duyuru silinirken hata oluştu." }); }
};


module.exports = {
    getAllAnnouncements,
    addAnnouncement,
    deleteAnnouncement,
}