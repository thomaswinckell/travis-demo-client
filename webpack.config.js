const path = require( 'path' );
    webpack = require( 'webpack' ),
    autoprefixer = require( 'autoprefixer' ),
    htmlWebpack = require( 'html-webpack-plugin' ),
    webpackNotifier = require( 'webpack-notifier' ),
    copyWebpack = require( 'copy-webpack-plugin' ),
    pkg = require( './package.json' );



const target = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : 'start';

let plugins = [];
if ( target === 'start' ) {
    plugins.push(
        new webpackNotifier( { title: pkg.name } ),
        new webpack.HotModuleReplacementPlugin()
    );
}

const context = path.join(__dirname);

const es6Modules = [
    "scalts",
    "scalts-array",
    "ts-serialize"
];

const sassLoaders = [{
    loader : "style-loader"
}, {
    loader : "css-loader",
    options : {
        sourceMap : true
    }
}, {
    loader : "postcss-loader",
    options : {
        plugins: function () {
            return [
                require('autoprefixer')
            ];
        }
    }
}, {
    loader : "sass-loader",
    options : {
        sourceMap : true
    }
}];

module.exports = {
    entry:      {
        app : context
    },
    output:     {
        filename: '[name].js',
        publicPath: '/',
        path : __dirname + '/build'
    },
    devtool:    'source-map',
    devServer:  {
        host:               'localhost',
        port:               9999,
        historyApiFallback: true,
        hot:                true,
        inline:             true,
        // Display only errors to reduce the amount of output.
        stats:              'errors-only'
    },
    resolve:    {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
        modules: [
            context,
            "node_modules"
        ]
    },
    externals: {
    },
    module:     {
        rules:    [
            {
                test:    /\.tsx?$/,
                use: [{
                    loader : "babel-loader",
                    options : {
                        "presets" : ["es2015", "stage-0", "react"]
                    }
                }, {
                    loader : "ts-loader"
                }]
            },
            {
                test:    /\.jsx?$/,
                exclude : new RegExp("node_modules/" + es6Modules.map( m => '(?!' + m + ')' ).join("")),
                use: [{
                    loader : "babel-loader",
                    options : {
                        "presets" : ["es2015", "stage-0", "react"]
                    }
                }]
            },
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                enforce : "pre",
                loader:  "source-map-loader"
            },
            {
                test:   /\.(png|jpg|jpeg|gif|bmp)$/,
                use: [{
                    loader : "file-loader",
                    options : {
                        name : "images/[hash].[ext]"
                    }
                }]
            },
            {
                test:   /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9-\.=]+)?$/,
                use: [{
                    loader : "file-loader",
                    options : {
                        name : "fonts/[hash].[ext]"
                    }
                }]
            },
            {
                test:    /\.s?css$/,
                use: sassLoaders
            }
        ]
    },
    plugins:    [
        new htmlWebpack( {
            appMountId: 'app',
            mobile:     true,
            template:   './index.html',
            title:      pkg.name
        } )
    ].concat( plugins )
};