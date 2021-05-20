<template>
  <div>
    <div>
      <button id="btn">
        <router-link to="/database/dataSets">创建数据集</router-link>
      </button>
    </div>
    <div><h3>已创建的数据集：</h3></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
    };
  },
};
</script>

<style scoped>
#btn {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;  
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>