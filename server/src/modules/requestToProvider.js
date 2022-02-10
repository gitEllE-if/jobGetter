const nodeFetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        let result = await nodeFetch(req.get('provider_url'),
                { headers: {[req.get('key')] : req.get('value')}}
            );
        res.json(await result.json());
    }
    catch(err){
        console.log('==> fail ' + err);
    }
}
