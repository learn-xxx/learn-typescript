"use strict";
//never  什么都不是，占位，空类型
// type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
// type User = {
//   name: string;
//   age: number;
// };
// type Str = Flatten<string>;
// type Users = Flatten<User>;
// type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
//   ? Return
//   : never;
// type callback = () => number;
// type res = GetReturnType<callback>;
// declare function stringOrNum(x: string): number;
// declare function stringOrNum(x: number): string;
// declare function stringOrNum(x: string | number): string | number;
// type T1 = ReturnType<typeof stringOrNum>;
// type RemoveKindField<Type> = {
//   [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
// };
// interface Circle {
//   kind: "circle";
//   radius: number;
// }
// type KindlessCircle = RemoveKindField<Circle>;
// //存在一个on方法，名称为每一个属性名+Changed
// type PropEventSource<Type> = {
//   on(
//     eventName: `${string & keyof Type}Changed`,
//     callback: (newValue: any) => void
//   ): void;
// };
// //我们声明一个方法，将原类型和上面的类型合并(&)起来
// declare function makeWatchedObject<Type>(
//   obj: Type
// ): Type & PropEventSource<Type>;
// //创建一个实例
// const person = makeWatchedObject({
//   firstName: "Saoirse",
//   lastName: "Ronan",
//   age: 26
// });
// person.on("firstNameChanged", () => {});
