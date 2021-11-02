const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth");
const saltRounds = 10;

module.exports.signup = (req, res, next) => {
  let { userName, password, email } = req.body;
  email = email.toLowerCase();

  var hashp;
  Auth.findOne({ email: email })
    .exec()
    .then(async (authObj) => {
      if (authObj) {
        res.status(403).json({
          message: "Email already registered",
        });
      } else {
        await bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            hashp = hash;
            const auth = new Auth({
              password: hash,
              userName,
              email,
            });

            auth
              .save()
              .then(async (result) => {
                const token = jwt.sign(
                  {
                    _id: result._id,
                    email,
                    userName,
                  },
                  "secret",
                  { expiresIn: "5d" }
                );
                res.status(201).json({
                  message: "sign up successful",
                  token: token,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

module.exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  Auth.findOne({ email: email })
    .exec()
    .then(async (auth) => {
      if (auth) {
        await bcrypt.compare(
          password,
          auth.password,
          async function (err, newResult) {
            if (err) {
              return res.status(501).json({
                error: err,
              });
            } else {
              if (newResult) {
                const { _id, userName, email } = auth;

                const token = jwt.sign(
                  {
                    _id,
                    userName,
                    email,
                  },
                  "secret",
                  { expiresIn: "5d" }
                );
                return res.status(200).json({
                  token: token,
                });
              } else {
                return res.status(401).json({
                  message: "Invalid Password",
                });
              }
            }
          }
        );
      } else {
        res.status(404).json({
          message: "Email Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientKey);

module.exports.googleLogin = (req, res) => {
  const { token } = req.body;
  client
    .verifyIdToken({
      idToken: token,
      audience: process.env.googleClientKey,
    })
    .then((response) => {
      let { email_verified, email, given_name, family_name, picture } =
        response.payload;
      email = email.toLowerCase();

      if (email_verified) {
        Auth.findOne({ email: email })
          .exec()
          .then(async (authObj) => {
            if (authObj) {
              console.log("Object Found", authObj);
              const token = jwt.sign(
                {
                  _id: authObj._id,
                  email: authObj.email,
                  userName: authObj.name,
                },
                "secret",
                { expiresIn: "60d" }
              );
              res.status(201).json({
                message: "sign up successful",
                token: token,
              });
            } else {
              const auth = new Auth({
                email: email,
                userName: given_name,
                password: "123456",
              });

              auth
                .save()
                .then(async (result) => {
                  const token = jwt.sign(
                    {
                      _id: result._id,
                      email,
                      userName: given_name,
                    },
                    "secret",
                    { expiresIn: "5d" }
                  );
                  res.status(201).json({
                    message: "sign up successful",
                    token: token,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          })
          .catch((err) => {
            console.log("Token Verificationj Failed", err);
          });
      }

      console.log(response.payload);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  Auth.find()
    .exec()
    .then((users) => {
      res.status(200).json({
        users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
