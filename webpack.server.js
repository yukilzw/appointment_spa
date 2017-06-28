const webpack = require('webpack')
const path = require('path');

const compiler = webpack({
    entry:'./entry-server.js',
    target: 'node',
    output:{
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, "./server-dist"),
        filename:"server.bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                include:[path.resolve(__dirname, "./css")],
                loader:"style-loader!css-loader?minimize=true!less-loader"
            },
            {
                test:/\.js$/,
                include:[path.resolve(__dirname, "./")],
                loader:"babel-loader",
                options: {
                    presets: ['es2015',"stage-0"]
                }
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                include:[path.resolve(__dirname, "./img")],
                loader:'file-loader?name=img/[name]-[hash].[ext]'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
});

compiler.run((err, stats) => {
    if (err || stats.hasErrors())console.log(stats.compilation.errors);
    else{console.log('set package success!')}
})

/*const watching = compiler.watch({
 aggregateTimeout: 300,
 poll: undefined
 }, (err, stats) => {
 if (err || stats.hasErrors())console.log(err);
 else{console.log('打包成功')}
 });*/