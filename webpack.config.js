const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const compiler = webpack({
    entry:{
        vue: ["vue", "vue-touch","vuex","vue-router"],
        main : ["./js/entry.js"]
    },
    output:{
        path: path.resolve(__dirname, "./app-dist"),
        filename:"min.js"
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                include:[path.resolve(__dirname, "./css")],
                //loader:"style-loader!css-loader?minimize=true!less-loader"
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ 'css-loader?minimize=true', 'less-loader' ]
                })
            },
            {
                test:/\.js$/,
                include:[path.resolve(__dirname, "./js")],
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
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: [ 'css-loader?minimize=true', 'less-loader' ]
                        })
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({   //取出公共模块库
            name: "vue",
            filename: "Family.js"
        }),
        new HtmlWebpackPlugin({             //生成HTML
            title:'医依帮-智慧医院',
            ico:'xy.ico',
            template:'./entry.html',
            filename:'./dist.html',
            inject:'body',
            minify:{
               /*minifyJS : true,
                minifyCSS : true,*/
                removeComments:true,        //去除注释
                collapseWhitespace:true     //去除空格
            }
        }),
         new webpack.DefinePlugin({         //去除Vue警告
             'process.env': {
                NODE_ENV: '"production"'
             }
         }),
        new UglifyJSPlugin({                //压缩JS
            comments:false
        }),
        new ExtractTextPlugin('min.css')  //压缩CSS
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