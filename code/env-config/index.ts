console.log('env-config')

interface Foo {
  name: string,
  age: number
}

interface Bar {
  name: string,
  job: string
}

declare let foo: Foo;
declare let bar: Bar;

// foo = bar

import { expectType } from 'tsd';

expectType<string>("merlin"); // √
// expectType<string>(599); // × 类型“number”的参数不能赋给类型“string”的参数。
