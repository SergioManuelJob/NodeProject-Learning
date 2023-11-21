function getHello(req, res) {
    res.status(200).send({ msg: "Hola mundillo"})
}

module.exports = {
    getHello,
}