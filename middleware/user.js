const { User, Role } = require("../models");
async function checkDuplicateUserNameAndEmail(req, res, next) {
  if (req.body.username) {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log("user_+++++=>>>", user);
    if (user) {
      res.status(400).send({ msg: "Username already exist" });
      return;
    }
  }
  if (req.body.email) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      res.status(400).send({ msg: "email already exist" });
      return;
    }
  }

  next();
}
async function checkRoles(req, res, next) {
  if (req.body.roles) {
    let roles = req.body.roles;
    let flag = true;
    const findRoleFromDB = await Role.findAll({
      attributes: ["id"],
    });

    if (findRoleFromDB.length > 0) {
      const storeRoles = [];

      for (let i = 0; i < findRoleFromDB.length; i++) {
        storeRoles.push(findRoleFromDB[i].dataValues.id);
      }
      for (let i = 0; i < roles.length; i++) {
        const result = storeRoles.includes(roles[i]);
        if (!result) {
          flag = false;
          break;
        }
      }
      if (flag) {
        next();
      } else {
        res.status(400).send({ msg: "Role id does not exist" });
        return;
      }
    } else {
      res
        .status(500)
        .send({ msg: "Internal server error, Role does not found" });
      return;
    }
  } else {
    next();
  }
}

async function signIn(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).send({ msg: "Username/password is not correct" });
      }

      const token = await jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      const authorities = [];
      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name);
      }

      const finalUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: token,
        authorities: authorities,
      };

      res.send(finalUser);
    } else {
      res.status(400).send({ msg: "Username/password is not correct" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", err });
  }
}

module.exports = {
  checkDuplicateUserNameAndEmail,
  checkRoles,
  signIn
};
