const nodemailer = require("nodemailer");
const fs=require("fs");
const path=require('path');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.GMAIL_USER)
console.log(process.env.GMAIL_PASS)

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    }
});

const replaceContent = (content,creds)=>{
    let allkeysattr = Object.keys(creds);
    allkeysattr.forEach((key)=>{
        content = content.replace(`#{${key}}`,creds[key]);
    })
    return content;
}

async function emailHelper(templateName,receiverEmail,creds,emailSubject){
    try{
        const templatePath=path.join(__dirname,"emailTemplates",templateName);
        const content = await fs.promises.readFile(templatePath,"utf-8");
        const emailDetails = {
            to:receiverEmail,
            from:"soundharyamethusala@gmail.com",
            subject:emailSubject,
            text:`Hi ${creds.name} this is your otp for Bookmyshow clone ${creds.otp}`,
            html:replaceContent(content,creds),
        }
            await transporter.sendMail(emailDetails)
        }
        catch(err){
            console.log(err);
        }
}

module.exports=emailHelper;