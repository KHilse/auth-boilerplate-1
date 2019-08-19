const router = require("express").Router();




// ROUTES

router.get("/", (req, res) => {
	res.render("profile/index");
})

router.get("/admin", (req, res) => {
	res.render("profile/admin");
})

module.exports = router;