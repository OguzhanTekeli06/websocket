const bcrypt= require("bcryptjs");
const Intern = require("../models/internModel");
const User = require("../models/userModel");

const login = async(req, res)=>{
    try {
        const {email,password}= req.body;

        const user = await Intern.findOne({email});

        if (!user) {
            return res.status(401).json({message:"Giriş Engellendi: Email veya şifre uyuşmuyor."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        
        
        if (!isPasswordValid) {
            return res.status(401).json({message:"Giriş Engellendi: şifre uyuşmuyor."});
        }

        if(user.mustChangePassword){
            return res.status(403).json({message:"Şifrenizi ilk girişte değiştirmeniz gerekiyor.", redirect:"/api/auth/change-password"});
        }

        res.status(200).json({message:"Giriş Başarılı!"});
    } catch (error) {
        res.status(500).json({message:"Server error", error});
    }
};

const userLogin= async (req,res)=>{
    try {
        const {email,password}= req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({message:"Giriş Engellendi: Email veya şifre uyuşmuyor."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        
        
        if (!isPasswordValid) {
            return res.status(401).json({message:"Giriş Engellendi: şifre uyuşmuyor."});
        }

        if(user.mustChangePassword){
            return res.status(403).json({message:"Şifrenizi ilk girişte değiştirmeniz gerekiyor.", mustChangePassword:user.mustChangePassword, redirect:"/api/auth/change-userpassword"});
        }

        res.status(200).json({message:"Giriş Başarılı!"});
    } catch (error) {
        res.status(500).json({message:"Server error", error});
    }
};

const mentorLogin= async (req,res)=>{
    try {
        const {email,password}= req.body;

        const user = await Mentor.findOne({email});

        if (!user) {
            return res.status(401).json({message:"Giriş Engellendi: Email veya şifre uyuşmuyor."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        
        
        if (!isPasswordValid) {
            return res.status(401).json({message:"Giriş Engellendi: şifre uyuşmuyor."});
        }

        if(user.mustChangePassword){
            return res.status(403).json({message:"Şifrenizi ilk girişte değiştirmeniz gerekiyor.", redirect:"/api/auth/change-mentorpassword"});
        }

        res.status(200).json({message:"Giriş Başarılı!"});
    } catch (error) {
        res.status(500).json({message:"Server error", error});
    }
};

const changePassword= async(req,res)=>{
    try {

        const {email,newPassword}= req.body;

        const user = await Intern.findOne({email});

        if(!user){
            return res.status(404).json({message:"Kullanıcı bulunamadı"});
        }

        const hashedPassword= await bcrypt.hash(newPassword,10);

        user.password= hashedPassword;
        user.mustChangePassword= false;
        await user.save();

        res.status(200).json({message:"Şifre değiştirildi Şimdi girebilirsiniz."});
        
    } catch (error) {
        res.status(500).json({message:"Server Hatası", error});
    }

};

const changeUserPassword= async(req,res)=>{
    try {

        const {email,newPassword}= req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Kullanıcı bulunamadı"});
        }

        const hashedPassword= await bcrypt.hash(newPassword,10);

        user.password= hashedPassword;
        user.mustChangePassword= false;
        await user.save();

        res.status(200).json({message:"Şifre değiştirildi Şimdi girebilirsiniz."});
        
    } catch (error) {
        res.status(500).json({message:"Server Hatası", error});
    }

};

const changeMentorPassword= async(req,res)=>{
    try {

        const {email,newPassword}= req.body;

        const user = await Mentor.findOne({email});

        if(!user){
            return res.status(404).json({message:"Kullanıcı bulunamadı"});
        }

        const hashedPassword= await bcrypt.hash(newPassword,10);

        user.password= hashedPassword;
        user.mustChangePassword= false;
        await user.save();

        res.status(200).json({message:"Şifre değiştirildi Şimdi girebilirsiniz."});
        
    } catch (error) {
        res.status(500).json({message:"Server Hatası", error});
    }

};

module.exports={login, changePassword, userLogin, changeUserPassword, mentorLogin, changeMentorPassword};