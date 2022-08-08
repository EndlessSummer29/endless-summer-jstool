const webpack = require('webpack');
class DotenvSave{
    constructor(options) {
        this.options = Object.assign({}, options);
    }
    apply(compiler){
        const _THIS = this
        compiler.hooks.thisCompilation.tap('DotenvSave',(comilation)=>{
            const envlist = JSON.parse(JSON.stringify({..._THIS.options.envlist}))
            if(Object.prototype.toString.call(envlist) === '[object Object]'){
                let envdata = {}
                // console.log("envlist",envlist)
                for (const key in envlist) {
                    envdata[key] = JSON.stringify(envlist[key])
                    // if (Object.hasOwnProperty.call(object, key)) {
                    //     const element = object[key];
                        
                    // }
                }
                // Array.prototype.forEach.call(envlist,item=>{
                //     console.log(item)
                //     envdata[item] = JSON.stringify(item)
                // })
                console.log("options",envdata)
                return new webpack.DefinePlugin({
                    'PRODUCTION': JSON.stringify('asdasdasdsad'),
                });
            }
        })
    }
}
// // use
// new DotenvSave({
//     envlist:dotenvexp.parsed
// }),
module.exports = DotenvSave;