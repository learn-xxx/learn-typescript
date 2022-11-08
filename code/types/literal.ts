interface Res {
  str: 'A' | 'B' | 'C'
  num: 1 | 2 | 3
  bool: true | false
}

interface Mixed {
  mixed: string | 599 | true | {} | (() => {}) | (2 | 3)
}

interface Tmp {
  user:
  | {
    vip: true;
    expires: string;
  }
  | {
    vip: false;
    promotion: string;
  };
}

declare var tmp: Tmp;

if (tmp.user.vip === true) {
  console.log(tmp.user.expires);
} else {
  console.log(tmp.user.promotion);
}
