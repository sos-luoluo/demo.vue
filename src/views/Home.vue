<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    This is index page.
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  created() {
    console.log("created", midway);
  }
  mounted() {
    alert(0);
    console.log("mounted", midway);
  }
  onmounted() {
    console.log("onmounted", midway);
  }
}
</script>
