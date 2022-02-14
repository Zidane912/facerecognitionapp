const handleSignIn = (db, bcrypt) => (req, res) => { // this is to signin
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
     }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash); // to check if password user typed is correct
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('wrong password'))
        } else {
        res.status(400).json('wromg credentials')
        }
    }) // above is for password and below is for email
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn 
}