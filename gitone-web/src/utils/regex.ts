const user = {
  email: {
    helper: "可正常接收邮件的邮箱",
    pattern: /^\S+@\S+\.\S+$/,
  },
  name: {
    helper: "长度 2~64",
    pattern: /^.{2,64}$/,
  },
  username: {
    helper: "长度 2~64，可包含字母、数字且以字母开头",
    pattern: /^[A-Za-z][A-Za-z0-9]{1,63}$/,
  },
  password: {
    helper: "长度 6~32",
    pattern: /^.{6,32}$/,
  },
};

export { user };
