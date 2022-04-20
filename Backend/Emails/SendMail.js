const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (toemail,Firstname,Lastname) =>{
    sgMail.send({
        to: toemail,
        from:process.env.SENDER_EMAIL,
        subject:'Registration',
        html: "Dear "+Firstname+" " + Lastname+ "," +"<br><br>Registration in GEU is successful<br>Thank you!",
    })
}

const OtpEmail = (toemail,otp) =>{
    sgMail.send({
        to: toemail,
        from: process.env.SENDER_EMAIL,
        subject:'OTP login',
        html: "<h3>OTP for verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>",
      })
}

const confirmationMail = (toemail,Firstname,Lastname)=>{
    sgMail.send({
        to: toemail,
        from:process.env.SENDER_EMAIL,
        subject:'Successfully Submitted Admission Form',
        html: "Dear "+Firstname+" "+Lastname+",<br><br>"+"Congratulations! You’ve successfully secured Admission at Graphic Era (Deemed to be University) and have now joined a rich academic legacy of over 26 Years.<br><br>We’ve started your on-boarding process and our communications will take over from here. We urge you to complete your pending Fee Payment within 15 Days from your Partial Fee Payment Date, so as to ensure that your seat remains locked and your admission process is completed.<br><br>If you’ve already completed the entire fee payment, there’s nothing pending from your end, and you can just wait and enjoy our communications in the meanwhile. You can also call us, if you need any additional details or course prep material for better acclimatization of the candidate.<br><br>Do reach out to us for any clarifications, queries regarding your enrollment. Also, you can find below, a schedule specifying the commencement of classes for all courses.<br><br>Hope to have you on the campus soon, starting a bright future that awaits you.<br><br><br><br>Best,<br>Team Admissions"
    })
}

module.exports = {
    sendWelcomeEmail,
    OtpEmail,
    confirmationMail,
};