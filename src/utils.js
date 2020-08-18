import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";
import "./env";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  try {const result = client.sendMail(email);}
  catch(e){
    console.log(e);
  }
  return result;
};

export var mailSender = {
	// 메일발송 함수
    sendGmail : function(param){
        var transporter = nodemailer.createTransport({
            service: 'gmail'
            ,prot : 587
            ,host :'smtp.gmail.com'
            ,secure : false
            ,requireTLS : true
            , auth: {
              user: process.env.GMAIL_ACCOUNT
              ,pass: process.env.GMAIL_PW
            }
        });
        // 메일 옵션
        var mailOptions = {
                from: param.from,
                to: param.to, // 수신할 이메일
                subject: param.subject, // 메일 제목
                html: param.html // 메일 내용
            };
        // 메일 발송    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        
    }
}
// 메일객체 exports
// module.exports = mailSender;

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "commentagram@gmail.com",
    to: address,
    subject: "코멘타그램 인증 코드 확인 요청",
    html: `안녕하세요! 인증 코드는 <strong>${secret}</strong>입니다. 로그인 화면에 붙여넣기 하세요.`,
  };
  // return sendMail(email);
  return mailSender.sendGmail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
