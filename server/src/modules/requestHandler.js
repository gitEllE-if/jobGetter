const vacancy = require('./vacancyHandler');
const user = require('./userHandler');
const token = require('./tokenHandler');
const requestToProvider = require('./requestToProvider');
const crypto = require('../utils/crypto');

const ACTIONS = {
    get: vacancy.getFromDB,
    add: vacancy.addToDB,
    addAll: vacancy.addAllToDB,
    del: vacancy.delFromDB,
    delAll: vacancy.delAllFromDB,
    update: vacancy.updateDB,
    getUser: user.getFromDB,
    updateUser: user.updateDB,
    updateUserPhoto: user.updateFileDB,
}

module.exports = async (dataBase, req, res, action) => {
    if (action == 'login') {
        user.login(dataBase, req, res);
        return;
    }
    if (action == 'provider') {
        requestToProvider(req, res);
        return;
    }
    try {
        const authorization = req.get('Authorization');
        if (authorization) {
            const curToken = authorization.replace('bearer ', '');
            const curUser = await user.getFromDB(dataBase, { sessionid: curToken });
            if (curUser && token.checkToken(curUser)) {
                const payload = action === 'getUser' || action === 'updateUserPhoto'
                    ? { login: curUser.login } : { user_id: curUser.id};
                const result = await ACTIONS[action](dataBase, payload, req);
                if (result) {
                    action === 'getUser'
                    ? res.status(200).json({ status: 'ok', result: crypto.encrypt(JSON.stringify(result))})  
                    : res.status(200).json({ status: 'ok', result });
                    console.log(`==> successfully ${action}`);
                } else {
                    res.json({ status: 'fail', message: 'Server error' });
                }
            } else {
                res.json({ status: 'fail', message: 'User is not logged in' });
            }
        } else {
            res.json({ status: 'fail', message: 'User is not logged in' });
        }
    }
    catch (err) {
        console.warn(`==> fail ${action}` + err);
        res.status(500).json({ status: 'fail', message: 'Server error' });
    }
}
