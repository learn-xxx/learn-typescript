// 数组类型
const arr1: string[] = []
const arr2: Array<string> = []

// 元组
// 限定长度
const arr3: [string, string, string] = ['merlin', 'merlin', 'merlin']
// 长度为 "3" 的元组类型 "[string, string, string]" 在索引 "100" 处没有元素。
// console.log('arr3[100]:', arr3[100])

// 限定类型
const arr4: [string, number, boolean] = ['merlin', 20, true]
// 不能将类型“string”分配给类型“number”。
// arr4[1] = 'string'

// 设置可选符号
const arr5: [string, number?, boolean?] = ['merlin', , false]
// type Length = 3 | 1 | 2
type Length = typeof arr5.length

// 具名元组，增加可读性
const arr6: [name: string, age?: number, male?: boolean] = ['merlin', , false]

// 隐性越界访问
// 长度为 "3" 的元组类型 "[name: string, age?: number, male?: boolean]" 在索引 "3" 处没有元素。
// const [arg1, arg2, arg3, arg4] = arr6
const [arg1, arg2, arg3] = arr6
console.log(arg2) // undefined
