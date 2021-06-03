module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
        console.log("logged out")
    })
}