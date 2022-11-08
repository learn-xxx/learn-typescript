"use strict";
/*
  9 - 深度 Readonly
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys #deep
  
  ### 题目
  
  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。
  
  实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。
  
  您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。
  
  例如
  
  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
  
  > 在 Github 上查看：https://tsch.js.org/9/zh-CN
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9/answer/zh-CN
  > 查看解答：https://tsch.js.org/9/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
