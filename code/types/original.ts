const age: number = 20;
// 出现"无法重新声明块范围变量“name”"，修改tsconfig中compilerOptions的lib
// 默认情况下，lib包含DOM typings，存在一些默认类型声明
// 如 window.name导致出现错误
const username: string = 'merlin'
const currentStatus: boolean = true
const obj: object = { username, age }
// tsconfig中compilerOptions的target包含大于ES2020
const big1: bigint = 9007199254740991n;
// tsconfig中compilerOptions的lib包含大于ES2020
const big2: bigint = BigInt(9007199254740991);
const NULL: null = null
const UNDEFINED: undefined = undefined
const SYMBOL: symbol = Symbol('symbol')

// strictNullChecks为false下
const stringNUll: string = null
const stringUndefined: string = undefined
const voidNull: void = null
const voidUndefined: void = undefined
