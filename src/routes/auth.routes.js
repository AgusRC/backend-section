const { Router } = require("express")

module.exports = function( { AuthController } ) {
     const router = Router();

     router.post("/signup", AuthController.signUp);
     router.post("/signIn", AuthController.signIn);

     return router;
}