const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'CHFRY Finance'; // 标题

module.exports = {
    lintOnSave: false,
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    publicPath: './' ,
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    runtimeCompiler: true,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。防止看到源码
    productionSourceMap: false,
    // devServer: {
    //     port: 9012,
    //     open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     },
    //     proxy: {
    //         ['/api']: {
    //             target: 'http://localhost:9012/',
    //             changeOrigin: false,
    //             secure: false,
    //             pathRewrite: {
    //                 ['^' + '/api']: ''
    //             }
    //         }
    //     },
    // },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = name
                return args
            })
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    },
    configureWebpack: {
        name: name,
        performance: {
            hints: false
        },
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
