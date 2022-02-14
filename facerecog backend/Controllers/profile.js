const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    let found = false; // let and not conts because reassiginning it below
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) { // this is to grab when an id is inputted but not listed
            res.json(user[0]) // because it gives an empty array which is true so to check an empty array this is done
        } else {
            res.status(400).json('NF')
        }
    }).catch(err => res.status(400).json('error getting user'))
    // if (!found) {
    //     res.status(400).json('not found')
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}