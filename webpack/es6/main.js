// 引入默认变量及方法和模块导出的m1、m2变量或方法
import theDefault, { m1, m2 } from 'lib';
// 引入默认变量和方法
import theDefault from 'lib';
// 引入模块导出的m1,m2变量或方法
import { m1, m2 } from 'lib';
// 引入模块导出的m1并将m1重命名为myName，m2变量或方法
import { m1 as myName, m2 } from 'lib';
// 拿到模块中定义的所有的方法，并放到mylib中，然后通过mylib引用
import * as mylib from 'lib';
// 只将lib加载进来，没有用到lib中暴露的接口
import 'lib';

// 暴露变量
export var a = '123';
// 暴露函数
export function myFunc() { };
// 默认暴露变量函数等
export default a = '123';
export default function myFunc() { };