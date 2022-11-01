interface Person {
  readonly name: string, // 只读
  age: number,
  male: boolean,
  skill?: Function // 可选
}

const p1: Person = {
  name: 'merlin',
  age: 20,
  male: true
  // 可以不实现skill
}

// 无法分配到 "name" ，因为它是只读属性。
// p1.name = 'merlin'

const arr: readonly number[] = [1, 2, 3]
// 类型“readonly number[]”中的索引签名仅允许读取
// arr[0] = 0
