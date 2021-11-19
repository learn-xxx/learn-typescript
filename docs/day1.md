# 「Typescript系列」类型操作

## 前言

阅读部分：[Typescript官方手册---Type Manipulation类型操作](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

欢迎加入[ts对赌学习](https://github.com/cuixiaorui/study-every-day/tree/main/bet/02)，本文为第一天学习总结。

TypeScript 的类型系统非常强大，因为它允许***根据其他类型*** 来表达***类型***。

## （一）泛型

我对泛型的理解：不需要用户指定特定的类型，可以通过编程的方式，让程序自己能推导出应该是什么类型 的**一种不确定的类型**。

我们需要的，是一种捕获参数类型的方法，以便我们也可以使用它来表示返回的内容。

举一个例子：

```typescript
//我们使用一个泛型Type
function identity<Type>(arg: Type): Type {
  return arg;
}
//当我们调用是传入Type的类型应该是number时
//程序会规定arg以及函数返回的类型为number
let res = identity<number>(1);

//如果不显式地指定类型，编译器也会进行推断
let res = identity(1);
```

在Typescript中，允许我们将泛型类型变量作为我们使用类型的一部分，而不是整一个类型，提供了更大的方便性，例如，我们可以把Type作为数组元素的类型，返回一个该类型的数组，而不是该类型。

```typescript
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array有.length,所以不会报错
  return arg;
}
```

### 通用类型

我们可以定义一个通用接口，把这个泛型抽离出来，形成通用类型

```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
 
//使Type可以看成是整个接口的参数
//使得类型参数对接口的所有其他成员可见
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn = identity;
```

### 通用类

泛型类和泛型接口很相似，泛型类`<>`在类名后面的 ( ) 中，包含了泛型类型的参数列表

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
```

你可以对NumType传出number或string或者任意类型，就像接口一样，将类型参数放在类本身上可以确保类的所有属性都使用相同的类型。

### 通用约束

当我们希望对用户传进来的Type有所约束时，我们可以通过extends来进行约束

```typescript
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); 
  return arg;
}

//类型“number”不满足约束“Lengthwise”。
loggingIdentity<number>(3);
//ok
loggingIdentity({ length: 10, value: 3 });
```

### 在通用约束中使用类型参数

举个例子，在这里我们想从一个给定名称的对象中获取一个属性。我们想确保我们不会意外地获取到不存在的属性，因此我们将在两种类型之间放置一个约束。

```typescript
//Key extends keyof Type 
//代表传入的key必须包含在Type说返回的所有key之中
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
//ok
getProperty(x, "a");
//error，类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数
getProperty(x, "m");
```

### 在泛型中使用类类型

```typescript
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

## （二）Keyof 类型运算符

TypeScript 允许我们遍历某种类型的属性，并通过 keyof 操作符提取其属性的名称。

```typescript
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number
```

除了接口外，keyof 也可以用于操作类，比如：

```typescript
class Person {
  name: string = "Semlinker";
}

let sname: keyof Person;
sname = "name";
```

若把 `sname = "name"` 改为 `sname = "age"` 的话，TypeScript 编译器会提示以下错误信息：`不能将类型“"age"”分配给类型“"name"”`

### 实战场景

我们希望定义一个函数，传入一个对象和key值，返回对应value

```typescript
function prop(obj, key) {
  return obj[key];
}
```

我们希望实现这样子的效果，该函数用于获取 **某个对象中指定属性的属性值** 。因此我们期望用户输入的属性是对象上已存在的属性，那么如何限制属性名的范围呢？这时我们可以利用本文的主角 `keyof` 操作符：

```typescript
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

**首先定义了 T 类型并使用 `extends` 关键字约束该类型必须是 object 类型的子类型，然后使用 `keyof` 操作符获取 T 类型的所有键，其返回类型是联合类型，最后利用 `extends` 关键字约束 K 类型必须为 `keyof T` 联合类型的子类型。**

> 来源：http://semlinker.com/ts-keyof/

## （三）Typeof 类型运算符

在 TypeScript 中，`typeof` 操作符可以用来获取一个变量或对象的类型。

```typescript
let s = "hello";
let n: typeof s;
//n:string

const kakuqo = {
    name: "kakuqo",
    age: 30,
    address: {
      province: '福建',
      city: '厦门'   
    }
}

type Kakuqo = typeof kakuqo;
/*
 type Kakuqo = {
    name: string;
    age: number;
    address: {
        province: string;
        city: string;
    };
}
*/
```

此外，`typeof` 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：

```typescript
function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

> 来源：http://www.semlinker.com/ts-typeof/

## （四）索引访问类型

我们可以使用*索引访问类型*来查找另一种类型的特定属性

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; //number
type Age = Person[keyof Person]; //string | number | boolean
```

我们可以通过 `number`获取数组（元组）元素的类型（联合类型）：

```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number]; 
/*
type Person = {
    name: string;
    age: number;
}
*/
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", height: "173cm" },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number]; 
/*
type Person = {
    name: string;
    age: number;
    height?: undefined;
} | {
    name: string;
    height: string;
    age?: undefined;
}
*/
```

只能用类型变量进行索引查找：

```typescript
// 错误
// const key = "age";
// type Age = Person[key];

//js和ts的内容不能混用
//[]中得使用一个type变量
const key = "age";
type Age = Person[typeof key];
```

## （五）条件类型

我们可以根据传进去的泛型T，通过逻辑判断，得到一个真实的类型:

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

// Example1 : number
type Example1 = Dog extends Animal ? number : string;
// Example2 : string
type Example2 = RegExp extends Animal ? number : string;
```

### 函数重载

同样的，在函数重载方面，条件类型也发挥了很大的作用：

```typescript
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

//不使用泛型，不够简洁，需要写出所有情况
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

//泛型条件判断，如果T是number那么NameOrId就是IdLabel类型
//反之是NameLabel类型
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

//以此为例子
//该函数接受number或string类型的参数，对应的返回值是IdLabel或者NameLabel
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");
let b = createLabel(2.8);
let c = createLabel(Math.random() ? "hello" : 42);

```

### 条件类型约束

```typescript
//我们约束：T必须包含一个名为message的属性,该类型返回message的类型
//其实完成了两件事：一件事是对传入T的约束，一件事是对自身类型的控制
type MessageOf<T extends { message: unknown }> = T["message"];
 
interface Email {
  message: string;
}

//EmailMessageContents : string
type EmailMessageContents = MessageOf<Email>;
```



未完待续...
