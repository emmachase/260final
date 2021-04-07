<template>
  <div>
    <div class="content-wrapper">
      <div class="twobreak" style="display: flex; justify-content: center">
        <div
          style="
            flex: 1;
            flex-direction: column;
            display: flex;
            align-items: center;
          "
        >
          <upload-box @upload="uploadFile"/>
        </div>
        <form @submit.prevent="submit"
          style="flex: 1; display: flex; justify-content: center"
          class="form-bar"
        >
          <div style="display: flex; flex-direction: column">
            <div class="form-entry">
              <div class="heading" style="display: flex">
                <span class="label">Title</span>
                <div style="flex: 1"></div>
              </div>
              <div class="textfield">
                <input v-model="title" type="text" placeholder="Epic Boxes" required />
              </div>
            </div>
            <div class="form-entry">
              <div class="heading" style="display: flex">
                <span class="label">Description</span>
                <div style="flex: 1"></div>
                <span class="optional">optional</span>
              </div>
              <div class="textfield">
                <textarea
                  v-model="description"
                  type="text"
                  placeholder="This image is epic and has cool elements."
                ></textarea>
              </div>
            </div>
            <div class="form-entry">
              <div class="heading" style="display: flex">
                <span class="label">Tags</span>
                <div style="flex: 1"></div>
                <span class="optional">optional</span>
              </div>
              <div class="textfield">
                <input v-model="tags" type="text" placeholder="tetris, pretty, epic" />
              </div>
            </div>
            <aside>
              The description and tags are purely used for searching / indexing
              purposes at the moment.
            </aside>
            <div class="submit" style="display: flex">
              <div style="flex: 1"></div>
              <button :disabled="!valid" :class="{ disabled: !valid }" class="button hide-load">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </div>
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

<script lang="ts">
import Vue from 'vue'
import UploadBox from '../components/UploadBox.vue'

export default Vue.extend({
  data: () => ({
    file: null,
    title: "",
    description: "",
    tags: "",
    error: false
  }),
  components: {
    UploadBox
  },
  computed: {
    valid() {
      return this.file && this.title;
    }
  },
  methods: {
    uploadFile(file) {
      this.file = file;
    },
    async submit() {
      const data = new FormData();
      data.append("file", this.file, this.file.name);
      data.append("title", this.title);
      data.append("desc", this.description);
      data.append("tags", this.tags);

      const result = await this.$axios.post("upload", data);

      if (result.status == 200) {
        this.$router.push('/list');
      }
    }
  }
})
</script>
