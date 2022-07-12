const db = require("../models"); //Récupération du modèle user
const bcrypt = require("bcrypt"); //Importation du module bcrypt
const jwtUtils = require("../utils/jwt"); //Importation du module jsonwebtoken
const fs = require("fs"); //

//============================================================================
// * MODELE DE BASE
//============================================================================

const User = db.users;

//============================================================================
// * ENREGISTREMENT D'UN UTILISATEUR (POST)                      /api/user/add
//============================================================================

const addUser = (req, res) => {
  const name = req.body.name
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((userFounded) => {
      if (userFounded) {
        res.status(400).json({ message: "Cette adresse email existe déjà !" });
      } else {
        let dataUser = {
          name,
          email,
          password,
        };
        const user = User.create(dataUser);
        const message = `Bonjour ${name}, Votre compte a été créer avec succés`;
        res.status(200).json({ message });
      }
    })
    .catch((error) => {
      const message = "Impossible de créer cette utilisateur";
      res.status(500).json({ message });
    });
};

//============================================================================
// * CONNEXION UTILISATEUR (POST)                              /api/user/login
//============================================================================

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, resEncryp) => {
          if (resEncryp) {
            return res.status(200).json({
              UserId: user.id,
              TOKEN: jwtUtils.generateTokenForUser(user),
            });
          } else {
            res
              .status(401)
              .json({ message: "Votre mot de passe est incorrect" });
          }
        });
      } else {
        res.status(401).json({ message: "Cette adresse email n'existe pas" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES UTILISATEUR (GET)       /api/admin/profile
//============================================================================

const getAllUsers = async (req, res) => {
  const userToken = req.userToken;
  const Admin = req.params.isAdmin;
  User.findOne({ attributes: ["isAdmin"], where: { id: userToken } })
  .then((user) => {
    if (Admin == "admin") {
      User.findAll({ attributes: ["id", "name", "email","occupation","pictureProfile", "isAdmin"] })
        .then((user) => {
          const message = "La liste des utilisateurs a bien été récupérer";
          res.status(200).json({ message, data: user });
        })
        .catch((err) => {
          res.status(500).json({ message: "La liste des utilisateurs n'a pas été récupérer" });
        });
    } else {
      res
        .status(400)
        .json({ message: "Vous ne diposez pas des droits nécéssaires" });
    }
  });
};

//============================================================================
// * RECUPERATION PROFILE UTILISATEUR (GET)                       /api/profile
//============================================================================

const getUser = async (req, res) => {
  const userToken = req.userToken;
  User.findOne({
    attributes: ["id", "name", "email", "occupation", "profilePicture", "isAdmin"],
    where: { id: userToken },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Cette utilisateur n'existe pas" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

//============================================================================
// * MISE A JOUR PROFILE UTILISATEUR (PUT)               /api/user/editProfile
//============================================================================
const editProfile = async (req, res) => {
  const userToken = req.userToken;
  const name = req.body.name;
  const email = req.body.email;
  const occupation = req.body.occupation;
  const profilePicture = req.file.filename;
  User.findOne({
    attributes: ["id", "name", "email", "occupation", "profilePicture"],
    where: { id: userToken },
  })
  .then((user) => {
    if (user) {
      user.update({
        name: name,
        email: email,
        occupation: occupation,
        profilePicture: profilePicture
      })
          .then((userUpdate) => {
            const message = `Le compte de ${user.email} à bien été mise à jour`;
            res.status(200).json({ message, data:userUpdate });
          })
          .catch((error) => {
            const message = `Echec de la mise à jour du compte ${user.email}`;
            res.status(200).send({ message, data:error });
          })
      } else {
        res.status(404).json({ message: "Cette utilisateur n'existe pas" });
      }
    })
    .catch((error) => {
      const message = "La mise à jour de ce compte est indisponible pour le moment";
      res.status(400).json({ message, data:error });
    });
};

//============================================================================
// * MISE A JOUR MOT DE PASSE UTILISATEUR (PUT)              /api/updatePwd/id
//============================================================================

const updatePwd = (req, res) => {
  const userToken = req.userToken;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
    res.status(401).json({ message: "Tous les champs sont requis" });
  }
  if (newPassword !== confirmPassword) {
    res.status(401).json({ message: "Echec de confirmation du mot de passe"})
  }
  if (confirmPassword == newPassword && oldPassword !== newPassword) {
    User.findOne({ where: { id: userToken } })
    .then((user) => {
      bcrypt.compare(oldPassword, user.password, (err, resEncryp) => {
        if (resEncryp) {
          user
            .update({ password: newPassword })
            .then((userPwdEdit) => {
              res.status(200).json({ message: "Mot de passe mise à jour" });
            })
            // .catch((error) => {
            //   const message = "Echec de la mise à jour du mot de passe"
            //   res.status(400).json({ message, data:error }) });
            } else {
            const message = "Echec de la mise à jour du mot de passe";
            res.status(401).json({ message });
            }
      });
      })
      .catch((error) => { 
        const message = "Impossible de mettre à jour le mot de passe pour le moment"
        res.status(500).json({ message, data:error })})
    } else {
    const message = "Le nouveau mot de passe et l'ancien ne peuvent être identiques";
    res.status(401).json({ message });
  }
};

//============================================================================
// * SUPPRESSION D'UN PROFILE (DELETE)                      /api/deleteProfile
//============================================================================

const deleteProfile = async (req, res) => {
  const userToken = req.userToken;
  User.findByPk(userToken)
    .then((user) => {
      if (user.isAdmin === "admin") {
        User.findByPk(userToken)
          .then((user) => {
            if (user === null) {
              const message = "L'utilisateur demandé n'existe pas. Essayez avec un autre identifiant.";
              return res.status(404).json({ message });
            }
            fs.unlink("./public/profile/" + user.profilePicture, (err) => {
              if (err) res.status(500).send({ message: err });
              const userDeleted = user;
              return User.destroy({ where: { id: user.id } }).then((_) => {
              const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
              res.status(200).json({ message, data: user.id });
            })})
          })
          .catch((error) => {
            const message = "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      } else {
        res
          .status(400)
          .json({ message: "Vous ne disposez pas des droits nécessaire." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//============================================================================
// * EXPORTATION DES MODULES
//============================================================================

module.exports = {
  addUser,
  login,
  getAllUsers,
  getUser,
  editProfile,
  updatePwd,
  deleteProfile,
};
