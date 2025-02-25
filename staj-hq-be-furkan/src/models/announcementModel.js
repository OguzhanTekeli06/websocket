const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({ 
    title: { type: String, required: true }, 
    message: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
});
const announcement = mongoose.model("announcements", AnnouncementSchema)
module.exports = announcement