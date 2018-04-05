const config = {
    entry: ['./client/login/login.js'
    ],
    output: {path: __dirname + '/public/js', filename: 'login.js'},
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    }
};


module.exports = config;
