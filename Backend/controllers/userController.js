const db = require("../models");            //Récupération du modèle user
const bcrypt = require("bcrypt");       //Importation du module bcrypt
const jwtUtils = require("../utils/jwt");   //Importation du module jsonwebtoken
const { Op }  = require("sequelize");        //Récupération de l'opérateur sequelize pour les recherches
const { parseAuthorization } = require("../utils/jwt");

//============================================================================
// * MODELE DE BASE
//============================================================================

const User = db.users;

//============================================================================
// * ENREGISTREMENT D'UN UTILISATEUR (POST)                           /api/add
//============================================================================

const addUser = async (req, res) => {
  let dataUser = {
         userName: req.body.userName,
         email: req.body.email,
         password: req.body.password
     }
if (dataUser.userName == null || dataUser.email == null || dataUser.password == null) {
  const message = "Tout les champs sont requis"
  res.status(201).json({ message })
} else {
    User.findOne( { where:{ email : dataUser.email }} )
      .then((user) => {
        if (user) {
          res.status(201).json( { message : "L'adresse email existe déjà" } )
        } else {
          const user = User.create(dataUser)
          const message = `L'utilisateur ${dataUser.userName} est bien enregitré`
          res.json( { message })
        }
      })
      .catch((error) => {res.status(500).json({ error })})
      }
}

//============================================================================
// * CONNEXION UTILISATEUR (POST)                                   /api/login
//============================================================================

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (email === "" || password === "") {
    res
      .status(401)
      .json({ message: "L'adresse email est le mot de passe sont requis" });
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
        res.status(500).json({
          message:
            "Impossible de connecter cette utilisateur pour le moment, réessayez dans quelques minutes",
        });
      });
  }
};

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES UTILISATEUR (GET)             /api/profile
//============================================================================

const getAllProfile = async (req, res) => {
  let headersAuth = req.headers["authorization"]
  let userId = jwtUtils.getUserId(headersAuth)
  if (userId < 0) {
    res.status(404).json({"message": "Token invalid"})
  }
// Fonction de recherche des utilisateur par leur nom
// les 2 premières lettre sont requise au minimum
// Affichage de 5 utilisateurs maximum par résultat
    if (req.query.userName) {
      const name = req.query.userName;
      const limit = parseInt(req.query.limit) || 5;
      
      if (name.length < 2) {
        const message = "Votre recherche doit contenir au moins les deux premiers caractères."
        return res.status(404).json({message});
      }
      return User.findAndCountAll({
        where: {
          userName: {
            // "name" est la propriètè de userModel
            [Op.like]: `%${name}%`, //"name" est le critère de recherche
          },
        },
        order: ["userName"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} utilisateur(s) qui correspondent au terme de recherche ${name}.`;
        res.json({ message, data: rows });
      });
  } else {
  User.findAll( {order: ["userName"]})
    .then((user) => {
      if (user.length === 0) {
        const message = "Aucun utilisateur dans la base de données";
        res.json({ message });
      } else {
        const message = "La liste des utilisateur a bien été récupérée.";
        res.json({ message, data: user });
      }
    })
    .catch((error) => {
      const message =
        "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
}
};

//============================================================================
// * RECUPERATION PROFILE UTILISATEUR (GET)                    /api/profile/id
//============================================================================

const userProfile = async (req, res) => {
  let headersAuth = req.headers["authorization"]
  let userId = jwtUtils.getUserId(headersAuth)
  if (userId < 0) {
    res.status(404).json({"message": "Token invalid"})
  }
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message = "L'utilisateur que vous avez demandé n'existe pas";
        res.json({ message, data: user });
      } else {
        const message = `L'utilisateur ${user.userName} que vous avez demandé a bien été trouvé.`;
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
  let headersAuth = req.headers["authorization"]
  let userId = jwtUtils.getUserId(headersAuth)
  if (userId < 0) {
    res.status(404).json({"message": "Token invalid"})
  }  
  const Id = req.params.id;
  User.update(req.body, { where: { id: Id } })
    .then((_) => {
      User.findByPk(Id)
      .then((user) => {
        if (user === null) {
          const message =
            "L'utilisateur demandé n'existe pas. Essayez avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `L'utilisateur ${user.userName} a bien été modifié.`;
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
  let headersAuth = req.headers["authorization"]
  let userId = jwtUtils.getUserId(headersAuth)
  if (userId < 0) {
    res.status(404).json({"message": "Token invalid"})
  }
  User.findByPk(userId).then((user) => {
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
            const message = `L'utilistateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
            res.json({ message, data: user.id });
          });
        })
        .catch((error) => {
          const message =
            "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }else{
      res.status(400).json({ "message" : "Vous n'avez pas l'autorisation." });
    }
  })
  .catch((error) => {
    res.status(500).json({ message : error })
  })
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
