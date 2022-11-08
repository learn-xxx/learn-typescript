"use strict";
/*
  4 - 实现 Pick
  -------
  by Anthony Fu (@antfu) #简单 #union #built-in
  
  ### 题目
  
  > 欢迎 PR 改进翻译质量。
  
  实现 TS 内置的 `Pick<T, K>`，但不可以使用它。
  
  **从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。
  
  例如：
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
  
  > 在 Github 上查看：https://tsch.js.org/4/zh-CN
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4/answer/zh-CN
  > 查看解答：https://tsch.js.org/4/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
