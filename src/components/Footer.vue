<template>
  <div class="footer">
    <span id="words"> @2020 njau </span>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #f6f7f8;
  border-top: solid;
  border-width: 1px;
  border-color: #dee2e6;
  height: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
  text-align: center;
}
#words {
  display: block;
  margin: 15px auto;
  color: #6c757d;
}
</style>

