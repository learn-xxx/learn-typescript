enum Items {
  Foo, // 0
  Bar, // 1
  Baz // 2
}

enum Items1 {
  Foo, // 0
  Bar = 500, // 500
  Baz // 501
}

enum Items2 {
  Foo,
  Bar = 'Bar',
  // Baz // 枚举成员必须具有初始化表达式
}
const returnNum = () => 100 + 499;

enum Items3 {
  Foo, // 0
  Baz, // 1
  Bar = returnNum(),
  // Baz // 枚举成员必须具有初始化表达式
}

// 如果你使用了延迟求值，
// 那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放在第一位。
enum Items4 {
  Foo = returnNum(),
  // Bar, // 枚举成员必须具有初始化表达式
  Baz = 599
}

enum Items5 {
  Foo = returnNum(),
  Bar = 599,
  Baz
}

// 同时使用字符串枚举值和数字枚举值
enum Mix {
  Num = 599,
  Str = "merlin"
}


const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"


const enum Items6 {
  Foo,
  Bar,
  Baz
}

const Foo = Items.Foo; // 0
const Bar = Items.Bar; // 1
