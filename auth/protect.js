const protectedRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("You are not logged in");
    res.redirect("/login");
}

const allowIf = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect("/dashboard");
}

module.exports = {
    protectedRoute,
    allowIf
}