"use strict";
/*
  2 - 获取函数返回类型
  -------
  by Anthony Fu (@antfu) #中等 #infer #built-in
  
  ### 题目
  
  不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 范型。
  
  例如：
  
  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }
  
  type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
  ```
  
  > 在 Github 上查看：https://tsch.js.org/2/zh-CN
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fn = (v) => (v ? 1 : 2);
const fn1 = (v, w) => (v ? 1 : 2);
/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2/answer/zh-CN
  > 查看解答：https://tsch.js.org/2/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
