/*
 * @Descripttion: page 命令生成器
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-17 14:00:39
 */
/**
 * @name: by1773
 * @test: test font
 * @msg: npm run tem '文件名‘
 * @param {type} 
 * @return: 
 */

const fs = require('fs')
const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

if (!dirName) {
    console.log('文件名不能为空');
    console.log('用法：npm run tem test');
    process.exit(0);
}

/**
 * @name: by1773
 * @test: test font
 * @msg: 页面模板构建
 * @param {type} 
 * @return: 
 */

const indexTep = `
    import Taro, { Component, Config } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    // import { connect } from '@tarojs/redux'
    // import Api from '../../utils/request'
    // import Tips from '../../utils/tips'
    import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
    import './${dirName}.scss'
    // import {  } from '../../components'

    // @connect(({ ${dirName} }) => ({
    //     ...${dirName},
    // }))

    class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
    config:Config = {
        navigationBarTitleText: '页面标题'
    }
    constructor(props: ${capPirName}Props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        
    }

    render() {
        return (
        <View className='fx-${dirName}-wrap'>
            页面内容
        </View>
        )
    }
    }
    export default ${capPirName}
`

/**
 * @name: by1773
 * @test: test font
 * @msg: scss 文件模板
 * @param {type} 
 * @return: 
 */

const scssTep = `
    @import "../../assets/scss/variables";
    .#{$prefix} {
        &-${dirName}-wrap {
            width: 100%;
            min-height: 100Vh;
        }
    }
`

/**
 * @name: by1773
 * @test: test font
 * @msg: config 接口地址配置模板
 * @param {type} 
 * @return: 
 */

const configTep =`
    export default {
        test:'/wechat/perfect-info',  //XX接口
    }
`

/**
 * @name: by1773
 * @test: test font
 * @msg: // 接口请求模板
 * @param {type} 
 * @return: 
 */

const serviceTep =`
    import Api from '../../utils/request'
    export const testApi = data => Api.test(
        data
    )
`

// model 模板

const modelTep = `
    // import Taro from '@tarojs/taro';
    // import * as ${dirName}Api from './service';
    export default {
        namespace: '${dirName}',
        state: {
        },
        
        effects: {},
        
        reducers: {}
    
    }

`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.ts', configTep); // config
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);




