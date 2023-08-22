# rabbit
  - ESlint默认不允许变量声明后重新声明。 也不允许自己赋值给自己， 所以引入阿里字体图标里iconfont.js 里边用的ES5的语法，和ESLint发生冲突，导致无法通过ESLint验证及husky提交，所以跳过了提交该文件（ 记录 ）
  - 对于第三方引入的各种文件， 语法不满足ESLint，可以使用如下ESLint语法无视当前文件检测  
  ` /* eslint-disable */ ` 
