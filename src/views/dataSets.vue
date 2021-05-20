<template>
  <div>
    <div>数据集名称<input type="text" /></div>
    <div>
      标注类型
      <select v-model="type">
        <option disabled value="">标签分类</option>
        <option :value="0">原图</option>
        <option :value="1">病斑图</option>
      </select>
      <span>{{ type }}</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>