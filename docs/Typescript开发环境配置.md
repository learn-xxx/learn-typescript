## VSCode插件

[TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)：提供类型自动导入。

[Move TS](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)：修改项目结构，自动更新类型文件导入。

## VSCode配置

在配置搜索处，搜索 'typescript Inlay Hints'，展示的配置就都是提示相关的了，推荐开启的有这么几个：

-   Function Like Return Types，显示推导得到的函数返回值类型；
-   Parameter Names，显示函数入参的名称；
-   Parameter Types，显示函数入参的类型；
-   Variable Types，显示变量的类型。

## 在线编程

官方提供的 [Playground](https://www.typescriptlang.org/zh/play)

Playground 最强大的能力其实在于，支持非常简单的配置切换，如 TS 版本（左上角 ），以及通过可视化的方式配置 tsconfig （左上角的配置）等，**非常适合在这里研究 tsconfig 各项配置的作用**。

## ## TS 文件的快速执行

推荐安装到全局然后配置 alias 快速启动。

```bash
# 全局安装
npm i ts-node typescript -g

# 设置别名（zsh，其他终端同理）
echo "alias tsn='ts-node'" >> ~/.zshrc

# 应用设置
source ~/.zshrc
```

对于`ts-node`，通过两种方式进行配置，在 tsconfig 中新增 `'ts-node'` 字段，或在执行 ts-node 时作为命令行的参数。

> [ts-node官方文档](https://typestrong.org/ts-node/docs/)

-   `-P,--project`：指定你的 tsconfig 文件位置。默认情况下 ts-node 会查找项目下的 tsconfig.json 文件，如果你的配置文件是 `tsconfig.script.json`、`tsconfig.base.json` 这种，就需要使用这一参数来进行配置了。
-   `-T, --transpileOnly`：禁用掉执行过程中的类型检查过程，这能让你的文件执行速度更快，且不会被类型报错卡住。这一选项的实质是使用了 TypeScript Compiler API 中的 transpileModule 方法。
-   `--swc`：在 transpileOnly 的基础上，还会使用 swc 来进行文件的编译，进一步提升执行速度。
-   `--emit`：如果你不仅是想要执行，还想顺便查看下产物，可以使用这一选项来把编译产物输出到 `.ts-node` 文件夹下（需要同时与 `--compilerHost` 选项一同使用）。

除了直接使用 ts-node 以外，你也可以通过 node + require hook 的形式来执行 TS 文件：

> require hook，能够达到透明的修改代码的目的，在 babel-register、ts-node 还有单测的覆盖率测试中都有应用。

```bash
node -r ts-node/register index.ts
```

> 出现：`Error: Cannot find module 'ts-node/register'`，尝试将全局的模块链接到当前项目下：`npm link ts-node`

但此时，如果想要传递参数给 ts-node ，你就需要使用环境变量了，比如要传递之前的 transpileOnly 选项：

```bash
TS_NODE_TRANSPILE_ONLY=true node -r ts-node/register index.ts
```

ts-node 本身并不支持自动地监听文件变更然后重新执行，而这一能力又是某些项目场景下的刚需，如 NodeJs API 的开发。因此，我们需要 [ts-node-dev](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwclr%2Fts-node-dev "https://github.com/wclr/ts-node-dev") 库来实现这一能力。ts-node-dev 基于 [node-dev](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffgnass%2Fnode-dev "https://github.com/fgnass/node-dev")（你可以理解一个类似 nodemon 的库，提供监听文件重新执行的能力） 与 [ts-node](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTypeStrong%2Fts-node "https://github.com/TypeStrong/ts-node") 实现，并在重启文件进程时共享同一个 TS 编译进程，避免了每次重启时需要重新实例化编译进程等操作。

首先，还是在全局安装：

```bash
npm i ts-node-dev -g
```

ts-node-dev 在全局提供了 `tsnd` 这一简写，你可以运行 `tsnd` 来检查安装情况。最常见的使用命令是这样的：

```bash
ts-node-dev --respawn --transpile-only app.ts
```

respawn 选项启用了监听重启的能力，而 transpileOnly 提供了更快的编译速度。你可以查看官方仓库来了解更多选项，但在大部分场景中以上这个命令已经足够了。

## 更方便的类型兼容性检查

对于只是想要进行类型比较，没有必要真的去声明两个变量并赋值再进行比较，即涉及了值空间的操作。可以使用`declare`关键字，只在类型空间中比较这些类型。

```typescript
interface Foo {
  name: string,
  age: number
}

interface Bar {
  name: string,
  job: string
}

// 并没有赋值
declare let foo: Foo;
declare let bar: Bar;

// 类型 "Bar" 中缺少属性 "age"，但类型 "Foo" 中需要该属性。
foo = bar
```

第二种方式则是使用第三方库`tsd`等，帮助你进行声明式的类型检查。

```typescript
import { expectType } from 'tsd';

expectType<string>("merlin"); // √
expectType<string>(599); // 类型“number”的参数不能赋给类型“string”的参数。
```

