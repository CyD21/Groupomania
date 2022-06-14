const db = require("../models"); //Récupération du modèle user
const bcrypt = require("bcrypt"); //Importation du module bcrypt
const jwtUtils = require("../utils/jwt"); //Importation du module jsonwebtoken

//============================================================================
// * MODELE DE BASE
//============================================================================

const User = db.users;

//============================================================================
// * ENREGISTREMENT D'UN UTILISATEUR (POST)                      /api/user/add
//============================================================================

const addUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((userFounded) => {
      if (userFounded) {
        res.status(400).json({ message: "Cette adresse email existe déjà !" });
      } else {
        let dataUser = {
          email: email,
          password: password,
        };
        const user = User.create(dataUser);
        const message = "Bonjour, Votre compte a été créer avec succés";
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
  const Id = req.params.id;
  User.findOne({ attributes: ["isAdmin"], where: { id: Id } }).then((user) => {
    if (user.isAdmin == "admin") {
      User.findAll({ attributes: ["id", "name", "email", "isAdmin"] })
        .then((user) => {
          const message = "La liste des utilisateurs a bien été récupérer";
          res.status(200).json({ message, data: user });
        })
        .catch((err) => {
          res.status(500).json({ message: "connot fetch user" });
        });
    } else {
      res
        .status(400)
        .json({ message: "Vous ne diposez pas des droits nécéssaires" });
    }
  });
};

//============================================================================
// * RECUPERATION PROFILE UTILISATEUR (GET)                    /api/profile/id
//============================================================================

const getUserProfile = async (req, res) => {
  const Id = req.params.id;
  User.findOne({
    attributes: ["id", "name", "email", "avatar", "isAdmin"],
    where: { id: Id },
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
// * MISE A JOUR PROFILE UTILISATEUR (PUT)                     /api/profile/id
//============================================================================
const editProfile = async (req, res) => {
  const Id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  User.findOne({
    attributes: ["id", "name", "email", "avatar"],
    where: { id: Id },
  })
    .then((user) => {
      if (user) {
        user
          .update({
            name: name,
            email: email,
            avatar: "",
          })
          .then((userUpdate) => {
            const message = `Le compte de ${user.email} à bien été mise à jour`;
            res.status(200).json({ message, data: userUpdate });
          })
          .catch((error) => {
            const message = `Echec de la mise à jour du compte ${user.email}`;
            res.status(400).json({ message, data: error });
          });
      } else {
        res.status(404).json({ message: "Cette utilisateur n'existe pas" });
      }
    })
    .catch((error) => {
      const message =
        "La mise à jour de ce compte est indisponible pour le moment";
      res.status(400).json({ message, data: error });
    });
};

//============================================================================
// * MISE A JOUR MOT DE PASSE UTILISATEUR (PUT)              /api/updatePwd/id
//============================================================================

const updatePwd = (req, res) => {
  const Id = req.params.id;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
    res.status(401).json({ message: "Tous les champs sont requis" });
  }
  if (newPassword !== confirmPassword) {
    res.status(401).json({ message: "Echec de confirmation du mot de passe"})
  }
  if (confirmPassword == newPassword && oldPassword !== confirmPassword) {
    User.findOne({ where: { id: Id } })
    .then((user) => {
      bcrypt.compare(oldPassword, user.password, (err, resEncryp) => {
        if (resEncryp) {
          user
            .update({ password: newPassword })
            .then((userPwdEdit) => {
              res.status(200).json({ message: "Mot de passe mise à jour" });
            })
            .catch((error) => {
              const message = "Echec de la mise à jour du mot de passe"
              res.status(500).json({ message, data:error }) });
            } else {
            const message = "Veuillez contrôler votre ancien mot de passe";
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
// * SUPPRESSION D'UN PROFILE (DELETE)                   /api/deleteProfile/id
//============================================================================

const deleteProfile = async (req, res) => {
  const Id = req.params.id;
  User.findByPk(Id)
    .then((user) => {
      if (user.isAdmin === "admin") {
        const Id = req.params.id;
        User.findByPk(Id)
          .then((user) => {
            if (user === null) {
              const message =
                "L'utilisateur demandé n'existe pas. Essayez avec un autre identifiant.";
              return res.status(404).json({ message });
            }
            const userDeleted = user;
            return User.destroy({ where: { id: user.id } }).then((_) => {
              const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
              res.json({ message, data: user.id });
            });
          })
          .catch((error) => {
            const message =
              "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      } else {
        res
          .status(400)
          .json({ message: "Vous n'avez pas les droits nécessaire." });
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
  getUserProfile,
  editProfile,
  updatePwd,
  deleteProfile,
};
