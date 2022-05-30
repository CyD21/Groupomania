const db = require("../models");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt");

//============================================================================
// * CREATION DU MODELE DE BASE
//============================================================================

const User = db.users;

//============================================================================
// * ENREGISTREMENT D'UN UTILISATEUR (POST)                           /api/add
//============================================================================

const addUser = async (req, res) => {
  let dataUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(dataUser);
  res.status(200).send(user);
  console.log(user);
};
//============================================================================
// * CONNEXION UTILISATEUR (POST)                                   /api/login
//============================================================================

const login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (email === "" || password === "") {
    res.status(401).json({ message: "L'adresse email est le mot de passe sont requis" });
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
              res.status(401).json({ message: "Le mot de passe est invalide" });
            }
          });
        } else {
          res.status(401).json({ message: "Cette utilisateur n'existe pas" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Impossible de connecter cette utilisateur pour le moment, réessayez dans quelques minutes" });
      });
  }
};

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES UTILISATEUR (GET)             /api/profile
//============================================================================

const getAllProfile = async (req, res) => {
  User.findAll()
    .then((user) => {
      const message = "La liste des utilisateur a bien été récupérée.";
      res.json({ message, data: user });
    })
    .catch((error) => {
      const message =
        "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * RECUPERATION PROFILE UTILISATEUR (GET)                    /api/profile/id
//============================================================================

const userProfile = async (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message = "L'utilisateur que vous avez demandé n'existe pas";
        res.json({ message, data: user });
      } else {
        const message = `L'utilisateur ${user.name} que vous avez demandé a bien été trouvé.`;
        res.json({ message, data: user });
      }
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pu être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * MISE A JOUR PROFILE UTILISATEUR (PUT)                     /api/profile/id
//============================================================================

const updateProfile = async (req, res) => {
  const Id = req.params.id;
  User.update(req.body, { where: { id: Id } })
    .then((_) => {
      User.findByPk(Id).then((user) => {
        if (user === null) {
          const message =
            "L'utilisateur demandé n'existe pas. Essayez avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `L'utilisateur ${user.name} a bien été modifié.`;
        res.json({ message, data: user });
      });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pu être modifié. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * SUPPRESSION PROFILE UTILISATEUR (DELETE)                  /api/profile/id
//============================================================================

const deleteProfile = async (req, res) => {
  const Id = req.params.id;
  User.findByPk(Id)
    .then((user) => {
      if (user === null) {
        const message = "L'utilisateur demandé n'existe pas. Essayez avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      const userDeleted = user;
      return User.destroy({ where: { id: user.id } })
    .then((_) => {
        const message = `L'utilistateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
        res.json({ message, data: user.id});
      });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * EXPORTATION DES MODULES
//============================================================================

module.exports = {
  addUser,
  login,
  getAllProfile,
  userProfile,
  updateProfile,
  deleteProfile,
};
