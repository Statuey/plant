# 数据集管理系统

推荐使用`yarn`代替`npm`:

```
npm install yarn -g
```

## 风格指南

请严格遵守Vue3官方风格指南：[风格指南](https://v3.cn.vuejs.org/style-guide/)，包括组件命名风格，组件模板风格等。JS变量命名请严格遵守小帕斯卡命名：

```js
// bad
const the_apple = 1;
const TheApple = 1;
// good
const theApple = 1;
```

后端python API提供的数据为下划线命名方式，我已经使用humps在axios中自动做了转换，如果后端要求传递:

```json
{
  "the_apple": 1
}
```

只需要在axios中:


```js
this.$http.post("/url", {
  theApple: 1
})
```

humps会自动做出转换

## 启动服务器

```
yarn dev
```

## 构建生产版本

```
yarn build
```
