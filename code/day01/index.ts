// function identity<Type>(arg: Type): Type {
//   return arg;
// }
// let res = identity(1);

// interface GenericIdentityFn<Type> {
//   (arg: Type): Type;
// }
// function identity<Type>(arg: Type): Type {
//   return arg;
// }
// let myIdentity: GenericIdentityFn<number> = identity;
// interface Lengthwise {
//   length: number;
// }

// function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
//   console.log(arg.length);
//   return arg;
// }
// //number类型不包含length属性
// loggingIdentity<number>(3);
// //ok
// loggingIdentity({ length: 10, value: 3 });

// interface Person1 {
//   name: string;
//   age: number;
//   location: string;
// }

// type K1 = keyof Person1; // "name" | "age" | "location"
// let value: Person1[K1];
// type K2 = keyof Person1[]; // number | "length" | "push" | "concat" | ...
// type K3 = keyof { [x: string]: Person1 }; // string | number

// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   return obj[key];
// }

// class Person2 {
//   name: string = "Semlinker";
// }

// let sName: keyof Person2;
// sName = "age";

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: "3", d: 4 };

let value = prop(x, "b");

getProperty(x, "a");
getProperty(x, "m");

const kakuqo = {
  name: "kakuqo",
  age: 30,
  address: {
    province: "福建",
    city: "厦门",
  },
};

type Kakuqo = typeof kakuqo;

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", height: "173cm" },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];

type age = typeof MyArray[number]["age"];

// 错误
// const key = "age";
// type Age = Person[key];

//js和ts的内容不能混用
//[]中得使用一个type变量
const key = "age";
type Age = Person[typeof key];

//条件类型
// 1
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

// number
type Example1 = Dog extends Animal ? number : string;
// string
type Example2 = RegExp extends Animal ? number : string;

//2、函数重载
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

//以此为例子
//我们传入一个值，它的类型为T，传给NameOrId<T>可以推断出该type的具体类型
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");

let b = createLabel(2.8);

let c = createLabel(Math.random() ? "hello" : 42);

//3
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;

// Leaves the type alone.
type Num = Flatten<number>;
