module.exports = (req, res) => {
    req.session.destroy(() => {
        console.log("logged out");
        res.redirect('/')
      
    })
}