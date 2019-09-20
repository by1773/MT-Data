# Taro多端F2图表

[![](https://img.shields.io/npm/v/taro-f2.svg?style=flat-square)](https://www.npmjs.com/package/taro-f2)

目前支持: H5、微信小程序、支付宝小程序

微信部分实现方法完全照搬: https://github.com/antvis/wx-f2

F2图表具体使用方法请参考: https://github.com/antvis/f2

> 直接克隆代码 可查阅示例

##  更新日志
* 2.1.2: `onCanvasInit` 增加scope导出, 增加导出图片示例, 如果h5编译报错可以尝试将`@tarojs/webpack-runner`降级到 1.2.x。具体参见:[#18](https://github.com/xioxin/taro-f2/issues/18)
* 2.1.0: 支持了按需引用
  - `onInit` 修改为 `onCanvasInit`,回调不再返回F2
  - 增加 `F2Canvas.f2Fix()` 方法, 用于为F2增加小程序等兼容代码
  - 增加示例代码
* 1.2.0: 使用新的打包方式，注意升级Taro库到 1.2.0 或更高版本
* 1.1.2: 改用低版本@tarojs/cli编译，新版本貌似改了h5的编译方式了
* 1.1.0: 增加支付宝小程序支持, 修复h5模糊的问题


## 安装

```
$ yarn add taro-f2 @antv/f2
```
> 注意 @antv/f2 需要手动安装

#### 修改项目配置文件 config/index.js
在 `h5` 的 `esnextModules` 中增加 `taro-f2`
```
{
  h5: {
    esnextModules: ['taro-f2']
  }
}
```


## 使用指南

在 Taro 文件中引入组件
```jsx harmony
import { F2Canvas } from "taro-f2";
import F2 from "@antv/f2"
```


## 按需引用
假如一个业务场景下仅需要绘制饼图（不带动画）
```jsx harmony
import { F2Canvas } from "taro-f2";
const F2 = require('@antv/f2/lib/core'); // 必须引入
require('@antv/f2/lib/geom/interval'); // 引入 interval 几何标记
require('@antv/f2/lib/coord/polar'); // 引入 极坐标
require('@antv/f2/lib/geom/adjust/stack'); // 引入数据层叠调整类型
```


## 事件

| 事件名称 | 说明 | 返回参数 |
|:---|:---|:---|
| onCanvasInit | 画板初始化完毕事件 | (canvas: any, width: number, height: number, scope: any): void <br> canvas: 小程序下为伪Canvas元素 |


> F2Canvas宽高为100% 设置宽高需要在外面套个View


## 保存图片
```jsx harmony
if(process.env.TARO_ENV === 'h5'){
  const a = document.createElement("a");
  a.href = canvas.toDataURL('image/png');
  a.download = '图表.png';
  a.click();
}else {
  const saveTempFile = Taro.canvasToTempFilePath({
    canvasId: canvas.ctx.canvasId,
  }, scope);
  saveTempFile.then(image => {
    Taro.saveImageToPhotosAlbum({
      filePath: image.tempFilePath,
    }).then(() => {
      Taro.showToast({ title: '保存成功', icon: 'none' })
    }, () => {
      Taro.showToast({ title: '保存相册失败', icon: 'none' })
    })
  }, () => {
    Taro.showToast({ title: '无法读取canvas', icon: 'none' })
  })
}
```


## 示例

```jsx harmony
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { F2Canvas } from 'taro-f2'
import F2 from '@antv/f2'

export default class Index extends Component {

  drawRadar(canvas, width, height){
    
    // ⚠️ 别忘了这行
    // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
    F2Canvas.fixF2(F2);

    const data = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      value: {
        min: 0,
        max: 10
      }
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: {
        lineDash: null
      },
      label: null,
      line: null
    });
    chart.axis('name', {
      grid: {
        lineDash: null
      }
    });
    chart.area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2
      })
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.point().position('name*value').color('#FE5C5B').animate({
      appear: {
        delay: 300
      }
    });
    chart.guide().text({
      position: ['50%', '50%'],
      content: '73',
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FE5C5B'
      }
    });
    chart.render();
  }

  render () {
    return (
      <View className='index'>
        <View style='width:100%;height:500px'><F2Canvas onCanvasInit={this.drawRadar.bind(this)}></F2Canvas></View>
      </View>
    )
  }
}
```



