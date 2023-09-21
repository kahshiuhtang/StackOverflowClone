import axios from "axios";
const bcrypt = require("bcryptjs");
export async function login(
  email,
  password,
  setter,
  setUId,
  setUsername,
  setErr
) {
  await axios
    .get("http://localhost:8000/getuser/" + email)
    .then(async (res) => {
      let user = res.data[0];
      console.log(user);
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          setUId(user._id);
          setUsername(user.username);
          setter("main");
        } else {
          setErr(true);
        }
        return result;
      });
    })
    .catch(() => {
      setErr(true);
    });
}
