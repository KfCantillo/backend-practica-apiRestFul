module.exports = {
    get : function(req, res){
        res.json({ status: 'ok', message: 'Server is runing!', detail:"Server online!" });
    }
}

