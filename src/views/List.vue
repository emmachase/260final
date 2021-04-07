<template>
  <div>
    <div class="content-wrapper">
      <div class="list-container">
        <div class="textfield">
          <input type="text" v-model="tagsearch" placeholder="Filter by tags (comma seperated)"/>
        </div>

        <div v-for="(img, idx) in filteredImages" :key="idx">
          <div class="list-item">
            <span class="name">
              <a
                :href="img.src"
                >{{img.title}}</a
              >
            </span>
            <span class="time">&ndash; by <strong>@{{img.uploader.name}}</strong></span>
            <span class="time">&ndash; {{new Date(img.created).toLocaleTimeString()}}</span>
            <span class="desc" v-if="img.desc">&ndash; {{img.desc}}</span>
            <div class="spacer"></div>
            <div class="actions">
              <button class="button inline" @click="edit(idx)">View</button>
              <button class="button inline" @click="remove(idx)">Delete</button>
            </div>
          </div>
          <hr v-if="idx !== images.length - 1"/>
        </div>
        <div class="t-center fancy" v-if="filteredImages.length === 0">
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
  font-size: 1.5em;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      images: [],
      tagsearch: ""
    }
  },
  mounted() {
    this.fetch();
  },
  computed: {
    filteredImages() {
      const tags = this.tagsearch.split(/\s*,\s*/).filter(x => x);
      if (tags.length === 0) return this.images;
      return this.images.filter(image => image.tags.split(/\s*,\s*/).some(t => tags.includes(t)));
    }
  },
  methods: {
    edit(idx) {
      this.$router.push('/file/' + this.images[idx]._id);
    },
    async remove(idx) {
      await this.$axios.delete("uploads/" + this.images[idx]._id);
      this.fetch();
    },
    async fetch() {
      const result = await this.$axios.get("uploads");
      if (result.status == 200) {
        this.images = result.data.map(image => ({
          ...image, 
          tags: image.tags.join(", ")
        }))
      }
    }
  }
})
</script>
