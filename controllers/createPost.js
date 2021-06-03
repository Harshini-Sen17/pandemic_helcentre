module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("create",{
            userId:req.session.userId
        });
    }

    res.redirect('/auth/login')
};