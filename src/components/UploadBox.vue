<template>
  <div>
    <svg
      class="uploadbox waiting"
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="upload"
      v-if="!file"
    >
      <path
        class="clickable"
        d="M32 50H429V447C429 463.569 415.569 477 399 477H32C15.4315 477 2 463.569 2 447V80C2 63.4315 15.4315 50 32 50Z"
        fill="#AAAAAA"
        fill-opacity="0"
        stroke="#AAAAAA"
        stroke-width="4"
      ></path>
      <rect x="427" width="53" height="97" fill="white"></rect>
      <rect x="383" width="97" height="52" fill="white"></rect>
      <line
        x1="429"
        y1="13"
        x2="429"
        y2="84"
        stroke="#AAAAAA"
        stroke-width="4"
      ></line>
      <line
        x1="392"
        y1="50"
        x2="464"
        y2="50"
        stroke="#AAAAAA"
        stroke-width="4"
      ></line>
      <path
        d="M169.101 232.5L215 153L260.899 232.5H169.101Z"
        stroke="#AAAAAA"
        stroke-width="4"
      ></path>
      <circle
        cx="286"
        cy="313"
        r="48"
        stroke="#AAAAAA"
        stroke-width="4"
      ></circle>
      <rect
        x="96"
        y="265"
        width="96"
        height="96"
        stroke="#AAAAAA"
        stroke-width="4"
      ></rect>
    </svg>
    <svg v-else class="uploadbox" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <svg y="50"><path d="M2 32C2 15.4315 15.4315 2 32 2H399C415.569 2 429 15.4315 429 32V399C429 415.569 415.569 429 399 429H32C15.4315 429 2 415.569 2 399V32Z" fill="#AAAAAA" fill-opacity="0.7" stroke="#AAAAAA" stroke-width="4"></path><rect x="90" y="112" width="252" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="211" width="252" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="310" width="252" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="244" width="190" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="277" width="64" height="8" fill="white" fill-opacity="0.8"></rect><rect x="164" y="277" width="178" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="145" width="129" height="8" fill="white" fill-opacity="0.8"></rect><rect x="229" y="145" width="113" height="8" fill="white" fill-opacity="0.8"></rect><rect x="90" y="178" width="92" height="8" fill="white" fill-opacity="0.8"></rect><rect x="192" y="178" width="103" height="8" fill="white" fill-opacity="0.8"></rect><rect x="305" y="178" width="37" height="8" fill="white" fill-opacity="0.8"></rect><rect x="290" y="244" width="52" height="8" fill="white" fill-opacity="0.8"></rect>
      <foreignObject x="4" y="350" width="423" height="45">
        <span :title="file.name" style="display: block; color: white; padding: 0px 24px; font-size: 36px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center;">{{file.name}}</span>
      </foreignObject>
    </svg>
    <svg class="close-btn" @click="file = null">
      <circle cx="411" cy="70" r="33" fill="#C4C4C4" stroke="#AAAAAA" stroke-width="4"></circle><rect x="396.5" y="81.73" width="37" height="4" transform="rotate(-45 396.5 81.73)" fill="white"></rect><rect x="399.329" y="55.5668" width="37" height="4" transform="rotate(45 399.329 55.5668)" fill="white"></rect></svg>
    </svg>
    <input ref="input" type="file" @input="check"/>
  </div>
</template>

<style scoped>
input {
  display: none;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    file: null
  }),
  methods: {
    upload() {
      this.$refs.input.click();
      this.hasFile;
    },
    check() {
      const files = this.$refs.input.files;
      if (files.length) {
        this.file = files[0];
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.$emit("upload", reader.result);
        });

        reader.readAsDataURL(this.file);
      } else {
        this.file = null;
      }
    }
  }
});
</script>