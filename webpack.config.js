const webpack= require('webpack')
const path= require('path')

module.exports={
    mode: 'production',
    entry:{
        app:'./src/App.jsx'
    },
    output:{
        path:path.resolve(__dirname,'static'),
        publicPath:'/assets/',
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    module:{
        rules:[
            {
            test:/\.jsx$/,
            include: path.resolve(__dirname,'src'),
            exclude: /node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-react', '@babel/preset-env']
                }
            }
        }
    ]
},
    optimization:{
        splitChunks:{
            cacheGroups: {
                default:false,
                vendors:false,
                vendor:{
                    name: 'vendor',
                    chunks:'all',
                    test:/node_modules/
                }
            }
        }
    },
    devServer:{
        port:8000,
        static: path.resolve(__dirname, 'static'),
        historyApiFallback:true,
        hot:true,
        allowedHost:'all',
        proxy:{
            '/api/*': {
                target:'http://localhost:3000',
                secure: false,
                changeOrigin: true
            }
        }
        },
    devtool:'source-map'

};