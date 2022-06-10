const db = require("../models"); //Récupération du modèle user
const bcrypt = require("bcrypt"); //Importation du module bcrypt
const jwtUtils = require("../utils/jwt"); //Importation du module jsonwebtoken

//============================================================================
// * MODELE DE BASE
//============================================================================

const User = db.users;

//============================================================================
// * GESTION DES REGEX
//============================================================================

const nameRegex = /^\s*[a-zA-Z,\s]+\s*$/;
const emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdRegex = /^(?=.*\d).{4,8}$/;

//============================================================================
// * ENREGISTREMENT D'UN UTILISATEUR (POST)                      /api/user/add
//============================================================================

const addUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Tout les champs sont requis" });
  } else if (name.length < 4) {
    res
      .status(400)
      .json({
        message:
          "Nom d'utilisateur invalide (il doit être de 5 caractères minimum)",
      });
  } else if (!nameRegex.test(name)) {
    res
      .status(400)
      .json({
        message:
          "Nom d'utilisateur incorrect (ne peut contenir que des majuscules, minuscules et des espaces)",
      });
  } else if (!emailRegex.test(email)) {
    res
      .status(400)
      .json({ message: "Cette adresse email n'est pas une adresse valide" });
  } else if (!pwdRegex.test(password)) {
    res
      .status(400)
      .json({
        message:
          "Ce mot de passe n'est pas valide (must lenght 4 - 8 and include 1 number at least)",
      });
  } else {
    User.findOne({ where: { email: email } })
      .then((userFounded) => {
        if (userFounded) {
          res
            .status(400)
            .json({ message: "Cette adresse email existe déjà !" });
        } else {
          let dataUser = {
            name: name,
            email: email,
            password: password,
          };
          const user = User.create(dataUser);
          const message = `Bonjour ${name}, Votre compte a été créer avec succés`;
          res.status(200).json({ message });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

//============================================================================
// * CONNEXION UTILISATEUR (POST)                              /api/user/login
//============================================================================

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (email === "" || password === "") {
    res
      .status(401)
      .json({
        message: "Votre adresse email et votre mot de passe sont requis !",
      });
  } else {
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
  }
};

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES UTILISATEUR (GET)             /api/profile
//============================================================================

const getAllUsers = async (req, res) => {
  const Id = req.params.id;
  User.findOne({ attributes:["isAdmin"], where: { id : Id } })
  .then((user) => {
    if (user.isAdmin == "admin") {
      User.findAll({ attributes: ['id', 'name', 'email', 'isAdmin']})
        .then((user) => {
          const message = "La liste des utilisateurs a bien été récupérer";
          res.status(200).json({ message, data: user });
        })
        .catch((err) => {
          res.status(500).json({ message: "connot fetch user" });
        });
      } else {
        res.status(400).json({ message: "Vous ne diposez pas des droits nécéssaires"})
      }})      
}

//============================================================================
// * RECUPERATION PROFILE UTILISATEUR (GET)                    /api/profile/id
//============================================================================

const getUserProfile = async (req, res) => {
  const Id = req.params.id;
  User.findOne({
    attributes: ["id", "name", "email", "isAdmin"],
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
  const Id = req.params.id
  const name = req.params.name
  const email = req.params.email
  const avatar = req.params.avatar
  User.findOne({
    attributes: ["id", "name", "email", "avatar"],
    where: { id: Id },
  })
  .then((user) => {
    if (user) {
      user.update({
        name: name,
        email: email,
        avatar: avatar
    }).then((userUpdate) => {
        const message = `L'utilisateur ${user.name} à bien été mise à jour`
        res.status(200).json({ message, data:userUpdate})
    }).catch((error) => {
        const message = `La mise à jour du compte de ${user.name} a échouée`
        res.status(400).json({ message , data:error })
    })
    } else {
      res.status(404).json({ message: "Cette utilisateur n'existe pas" });
    }
  })
  .catch((error) => {
    const message = "Impossible de modifier cette utilisateur pour le moment"
    res.status(500).json({ message, data:error})
})
}

//============================================================================
// * MISE A JOUR MOT DE PASSE UTILISATEUR (PUT)                /api/profile/id
//============================================================================

const updatePwd = (req, res) => {
  const Id = req.params.id;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
    res.status(401).json({ message: "all fields required" });
  }

  if (!pwdRegex.test(newPassword)) {
    res.status(401).json({
      message:
        "New password invalid (must lenght 4 - 8 and include 1 number at least",
    });
  }

  if (newPassword !== confirmPassword) {
    res.status(200).json({ message: "new and old password is not matched" });
  }
  User.findOne({ where: { id: Id } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "Password not found" });
      } else {
        bcrypt.compare(oldPassword, user.password, (err, resEncryp) => {
          if (resEncryp) {
            user
              .update({ password: newPassword })
              .then((userPwdEdit) => {
                res.status(200).json({ message: "Password updated" });
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          } else {
            res.status(401).json({ message: "OldPassword not found" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

//============================================================================
// * MODIFICATION (DELETE)                                     /api/profile/id
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
        res.status(400).json({ message: "Vous n'avez pas l'autorisation." });
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
