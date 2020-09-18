<template>
  <div class="home">
    <h3 class="tc">还没想好做什么网站</h3>
    <h6 class="tr">---落落</h6>
    <router-link :to="{ path: '/gobang' }"
      >点击这里下五子棋,适合手机上玩</router-link
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  created() {}
  mounted() {}
  onmounted() {}
}
</script>
