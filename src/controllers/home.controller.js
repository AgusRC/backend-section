let _homeService = null;

class HomeController {
    constructor({ HomeService }){
        //HomeService es inyectado por awilix de manera automatica
        //por ende debe tener el mismo nombre que el declarado en services
        _homeService = HomeService
        //hacemos que nuestro _homeService sea igual a HomeService que se declaro
        //en services y agregamos por injeccion de dependencia con awilix
    }

    index(req, res){
        return res.send(_homeService.index());
    }

}

module.exports = HomeController;