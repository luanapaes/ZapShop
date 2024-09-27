const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:3000/',  // Corrigido, faltava ":" no target
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
    }
];

// Export usando CommonJS
module.exports = PROXY_CONFIG;
