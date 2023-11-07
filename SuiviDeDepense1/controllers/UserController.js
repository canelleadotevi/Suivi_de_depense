const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/secret')
const User = require('../models/UserModel');

const Mail = require('../Facades/Mail')

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

const randomCode = generateRandomCode(6);
console.log(randomCode);

exports.register = async (req, res) => {


  try {
    const dataEmail = req.body.email
    const dataPassword = req.body.password
    console.log(req.body)

    if (!dataEmail || !dataPassword) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    const alreadyExist = await User.findOne({ email: dataEmail });

    if (alreadyExist) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const hashFrequence = 10;
    const hashPassword = await bcrypt.hash(dataPassword, hashFrequence);
    const randomCode = await  generateRandomCode(6);

    const newUser = new User({
      email: dataEmail,
      password: hashPassword,
      opt:randomCode,
      verify_at:null
    });

    await newUser.save();
    await Mail.from("canelleadotevi31@gmail.com").to(dataEmail).send(`Hello world .Utilisez ce code pour vous connecter: ${randomCode}`)
    return res.status(200).json({
      message: "Inscription réussie",
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription"});
  }
};


exports.verification = async (req, res) => {
  const { email, opt } = req.body
  if (!opt || !email) {
    res.status(400).json({ message: "Veuillez renseigner le champ" })
  }
  else {
    try {
      const findUser = await User.findOne({ email: email });
      if (findUser) {
        const userOpt = findUser.opt;
        if (opt === userOpt) {
          const updateUser = await User.findOneAndUpdate(
            { _id: findUser._id },
            {
              $set: {
                verify_at: new Date(),
              }
            },
            { new: true }
          );
          res.status(200).json({ message: 'Verification effectuée avec succès' })
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur" })
    }
  }
}


exports.login = async (req, res) => {


  try {
    const dataEmail = req.body.email
    const dataPassword = req.body.password
    console.log(req.body)

    if (!dataEmail || !dataPassword) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }
    const userExist = await User.findOne({ email: dataEmail });

    if (!userExist) {
      return res.status(400).json({ message: "Vérifiez vos informations de connexion" });
    }
    const verifyEmail = userExist.verify_at
    if(verifyEmail === null){
      return res.status(400).json({message: "Veuillez vérifier votre compte avec le code opt envoyé"})
    }

    const realPass = userExist.password;
    const passwordIsVerified = await bcrypt.compare(dataPassword, realPass);

    if (!passwordIsVerified) {
      return res.status(400).json({ message: "Vérifiez vos informations de connexion " });
    }

    const token = jwt.sign(
      {
        email: userExist.email,
        id: userExist._id
      },
      secretKey,
      {
        expiresIn: expiresIn,
      }
    );

    res.status(201).json({
      message: "Vous êtes maintenant connecté",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Oups, quelque chose ne va pas lors de la connexion"});
  }
};
exports.logOut = async (req,res) =>{
  try{
    const {token}= req.body;
    if(token){
      return res.status(200).json({message:"Déconnexion réussie"})
    }else{
      res.status(400).json({ message: "Erreur"})
    }
  }catch(error){
    console.log(error)
  }
}
exports.sendMail = async (req,res) =>{
try{
  const { fullName , email ,subject, message } = req.body
  if(!fullName || !email || !subject || !message ){
    return res.status(400).json({message: "Tous les champs sont requis"})
  }else{
  console.log('req.body',req.body)
    const userMail = await Mail.from(email).to("canelleadotevi31@gmail.com").send(`Hello! C'est ${fullName}. Objet: ${subject} .Message: ${message}`);
    console.log('sendMail')
    return res.status(200).json({message: "Mail envoyé avec succès"})
  }
}
catch(error){
  return res.status(500).json({message: "Erreur serveur"})
}
}