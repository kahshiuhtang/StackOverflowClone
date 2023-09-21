import axios from "axios";
const bcrypt = require("bcryptjs");
export async function createAccount(
  email,
  username,
  password,
  setter,
  setUId,
  setUsername,
  setEErr,
  setPErr
) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log("Email");
    setEErr(true);
    return "email";
  }
  if (password.includes(email) || password.includes(username)) {
    console.log("Password");
    setPErr(true);
    return "password";
  }

  await axios.get("http://localhost:8000/users").then((res) => {
    let users = res.data;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        console.log("found");
        setEErr(true);
        return "found";
      }
    }
    const saltRounds = 3;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = {
          username: username,
          email: email,
          password: hash,
        };
        await axios
          .post("http://localhost:8000/adduser", user)
          .then((res) => {
            console.log(res);
            sessionStorage.setItem("id", res.data._id);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("username", res.data.username);
            setUId(res.data._id);
            setUsername(res.data.username);
            setter("main");
            return "yes";
          })
          .catch((err) => console.log(err));
      });
    });
  });
}
