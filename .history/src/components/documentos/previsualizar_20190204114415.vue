<template>
  <div id="app">
    <PDFDocument v-bind="{url, scale}" />
  </div>
</template>

<script>
export default {
  props: ['url', 'scale'],

  data() {
    return {
      pdf: undefined,
      pages: [],
    };
  },
  // ...
</script>