"use strict";
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
function prop(obj, key) {
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
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", height: "173cm" },
    { name: "Eve", age: 38 },
];
// 错误
// const key = "age";
// type Age = Person[key];
//js和ts的内容不能混用
//[]中得使用一个type变量
const key = "age";
function createLabel(nameOrId) {
    throw "unimplemented";
}
//以此为例子
//我们传入一个值，它的类型为T，传给NameOrId<T>可以推断出该type的具体类型
function createLabel(idOrName) {
    throw "unimplemented";
}
let a = createLabel("typescript");
let b = createLabel(2.8);
let c = createLabel(Math.random() ? "hello" : 42);
