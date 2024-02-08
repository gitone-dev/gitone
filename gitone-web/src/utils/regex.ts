const user = {
  email: {
    helper: "可正常接收邮件的邮箱",
    rules: {
      pattern: /^\S+@\S+\.\S+$/,
      maxLength: 255,
      required: true,
    },
  },
  name: {
    helper: "长度 2~64",
    rules: {
      pattern: /^.{2,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  username: {
    helper: "长度 2~64，可包含字母、数字且以字母开头",
    rules: {
      pattern: /^[A-Za-z][A-Za-z0-9-]{1,63}$/,
      maxLength: 64,
      required: true,
    },
  },
  password: {
    helper: "长度 6~32",
    rules: {
      pattern: /^.{6,32}$/,
      maxLength: 32,
      required: true,
    },
  },
  bio: {
    helper: "介绍一下自己，长度 0~255",
    rules: {
      pattern: /^.{0,255}$/,
      maxLength: 255,
    },
  },
  location: {
    helper: "所在地区，长度 0~255",
    rules: {
      pattern: /^.{0,255}$/,
      maxLength: 255,
    },
  },
  websiteUrl: {
    helper: "个人主页，以 http(s) 开头",
    rules: {
      pattern: /^https?:\/\/\S+\.\S+$/,
      maxLength: 255,
    },
  },
};

const group = {
  name: {
    helper: "长度 2~64",
    rules: {
      pattern: /^.{2,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  path: {
    helper: "长度 2~64，可包含字母、数字且以字母开头",
    rules: {
      pattern: /^[A-Za-z][A-Za-z0-9-]{1,63}$/,
      maxLength: 64,
      required: true,
    },
  },
  description: {
    helper: "介绍一下组织",
    rules: {
      pattern: /^.{0,255}$/,
      maxLength: 255,
    },
  },
  visibility: {
    helper: "对外是否可见",
  },
};

const sshKey = {
  title: {
    helper: "长度 1~64",
    rules: {
      pattern: /^.{1,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  key: {
    helper: "支持的公钥类型：ecdsa、ed25519、rsa",
    rules: {
      maxLength: 1024,
      required: true,
    },
  },
};

const registeredClient = {
  clientName: {
    helper: "长度 1~64",
    rules: {
      pattern: /^.{1,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  description: {
    helper: "描述一下 OIDC 客户端用途",
    rules: {
      pattern: /^.{0,255}$/,
      maxLength: 255,
    },
  },
};

const branch = {
  name: {
    helper: "长度 1~64",
    rules: {
      pattern: /^.{1,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  revision: {
    helper: "Commit ID",
    rules: {
      required: true,
    },
  },
};

const tag = {
  name: {
    helper: "长度 1~64",
    rules: {
      pattern: /^.{1,64}$/,
      maxLength: 64,
      required: true,
    },
  },
  revision: {
    helper: "Commit ID",
    rules: {
      required: true,
    },
  },
  message: {
    helper: "标签描述",
    rules: {
      pattern: /^.{0,255}$/,
      maxLength: 255,
    },
  },
};

const project = group;

export { branch, group, project, sshKey, registeredClient, tag, user };
