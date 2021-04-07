<template>
  <div class="content-wrapper">
    <div class="infinite-scroll-component__outerdiv">
      <div class="infinite-scroll-component grid"
        style="height:auto;overflow:auto;-webkit-overflow-scrolling:touch">
        <div class="im-card" v-for="[img, idx] in images.map((x, i) => [x, i]).filter(x => x[0].isImage)" :key="idx">
          <div class="main-content">
            <img :src="img.path" draggable="false" @click="$router.push('/file/' + images[idx]._id)">
          </div>
        </div>
        <div class="t-center fancy" v-if="images.length === 0">
          <h3>
            Nobody's home...
          </h3>
        </div>
      </div>
    </div>
    <div class="force-scroll">.</div>
    <div class="page-accent">
      <svg
        width="1920"
        height="531"
        viewBox="0 0 1920 531"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M343.205 294.97L-3.13958 394.185C-55.1528 409.085 -91 456.643 -91 510.748C-91 577.714 -36.7138 632 30.2516 632H1760C1870.46 632 1960 542.457 1960 432V139.987C1960 69.0005 1906.87 9.25151 1836.36 0.96072C1808.86 -2.27362 1781.02 2.72233 1756.35 15.3165L1128.27 336.043C1093.2 353.949 1053.63 361.106 1014.52 356.619L421.076 288.54C394.949 285.543 368.487 287.728 343.205 294.97Z"
          fill="#C4C4C4"
          fill-opacity="0.2"
        ></path>
      </svg>
    </div>

  </div>
</template>

<style scoped>
h3 {
  position: absolute;
  font-size: 1.5em;
  width: 100%;
  left: 0;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      images: []
    }
  },
  async mounted() {
    const result = await this.$axios.get("uploads");
    if (result.status == 200) {
      this.images = result.data.map(image => ({
        ...image, 
        tags: image.tags.join(", "),
        isImage: image.mime.startsWith("image")
      }));
    }
  },
})
</script>
