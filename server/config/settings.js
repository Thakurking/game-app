const os = require('os')

const hostName = os.hostname()
console.log("Server hostName:", hostName)
const appRoot = require("app-root-path").path

if (hostName === "ip-10-11-33-92") {
    module.exports = {
        HOST: "",
        PORT: 5000,
        defaultPageSize: "",
        Root_API: "Gamo",
        fileUploadAbsolutePath: `${appRoot}/`,
        fileUploadPath: {
            userImage: "public/images/userProfile",
            tournamentBanner: "public/images/banner",
        }
    }
} else {
    module.exports = {
        HOST: 'localhost:5000',
        PORT: 5000,
        defaultPageSize: "",
        Root_API: "gamo",
        fileUploadAbsolutePath: `${appRoot}/`,
        fileUploadPath: {
            userImage: "public/images/userProfile",
            tournamentBanner: "public/images/banner",
        }
    }
}