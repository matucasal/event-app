import axios from "axios"
import router from "./router.js"

export default {
    logout: function (e) {
        axios
          .get("/api/login/logout")
          .then(() => {
            router.push("/")
          })
    }
  }