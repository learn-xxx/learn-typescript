"use strict";
/*
  18 - 获取元组长度
  -------
  by sinoon (@sinoon) #简单 #tuple
  
  ### 题目
  
  > 欢迎 PR 改进翻译质量。
  
  创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。
  
  例如：
  
  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
  
  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```
  
  > 在 Github 上查看：https://tsch.js.org/18/zh-CN
*/
Object.defineProperty(exports, "__esModule", { value: true });
const tesla = ["tesla", "model 3", "model X", "model Y"];
const spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT",
];
/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/18/answer/zh-CN
  > 查看解答：https://tsch.js.org/18/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
