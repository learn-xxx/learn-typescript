我们知道，node 中最早使用的是 CommonJs 与 require 来进行模块的导入，除了 `.js` 文件的导入以外，node 中还支持以扩展的形式来提供自定义扩展名的模块加载机制，这也是 ts-node、[require-ts](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40adonisjs%2Frequire-ts "https://www.npmjs.com/package/@adonisjs/require-ts") （允许你去 require 一个 TS 文件）这些工具库的工作原理，它们的核心逻辑其实都是通过 `require.extension`，注册了 `.ts` 文件的处理逻辑：

```typescript
require.extenstions['.ts'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  module._compile(content, filename)
}
```

在 require-ts 中，使用了 [pirates](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpirates "https://www.npmjs.com/package/pirates") 这个库来简化注册逻辑：

```typescript
const compiler = new Compiler();

addHook(
  (code, filename) => {
    return compiler.compile(filename, code)
  },
  { exts: ['.ts', '.tsx'], matcher: () => true }
)
```

NodeJs 中的 require 逻辑执行大概是这样的：

-   Resolution，基于入参拼接出 require 文件的绝对路径，当路径中不包含后缀名时，会按照 node 的模块解析策略来进行处理，如 `require('./utils')` 会解析到 `PATH/TO/project/utils.js`，而 `require('project-utils')` 会解析到 `PATH/TO/project/node_modules/project-utils/src/index.js`，以及内置模块等。需要注意的是在浏览器中，require **需要带上完整的后缀名**（浏览器并不能查找服务器的文件），但一般 bundler 会帮你处理好。
-   基于绝对路径，去 `require.cache` 这个全局变量中，查找此文件是否已经已缓存，并在存在时直接使用缓存的文件内容（即这个文件的导出信息等）。
-   Loading，基于绝对路径实例化一个 Module 类实例，基于路径后缀名调用内置的处理函数。比如 js、json 文件都是通过 `fs.readFileSync` 读取文件内容。
-   Wrapping，对于 js 文件，将文件内容字符串外层包裹一个函数，执行这个函数。对于 Json 文件，将内容包裹挂载到 `module.exports` 下。
-   Evaluating，执行这个文件内容。
-   Caching，对于未曾缓存的文件，将其执行结果缓存起来。

在上述过程中进行操作拦截，就可以实现很多有用的功能。比如对 `.ts` 文件去注册自定义的处理函数，将其编译为可以直接执行的 js 代码（`ts-node/register`），对 `.js` 代码进行预处理（babel-register），在代码执行时进行覆盖率统计（istanbul）。以及，对 `require.cache` 进行缓存清除来实现 node 服务的热更新（decache），但这里涉及到 require cache 的缓存策略，与本小册的主题没有太大关联，就不做展开啦。