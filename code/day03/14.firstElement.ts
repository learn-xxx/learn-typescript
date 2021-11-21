/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array
  
  ### 题目
  
  > 欢迎 PR 改进翻译质量。
  
  实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。
  
  例如：
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```
  
  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */

type First<T extends any[]> = T extends [] ? never : T[0];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14/answer/zh-CN
  > 查看解答：https://tsch.js.org/14/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
