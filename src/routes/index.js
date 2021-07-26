const express = require("express");
const cors = require("cors")
// seguridad
const helmet = require("helmet")
// comprimir peticiones http
const compression = require("compression")
// captura exepciones asincronas
require("express-async-errors")
const {NotFoundMiddleware, ErrorMiddleware} = require("../middlewares")


module.exports = function({HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes}){
    const router = express.Router();
    const apiRoutes = express.Router();

    //implementar middlewares en apiRoutes
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", CommentRoutes);

    router.use("/v1/api", apiRoutes);

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;

}