<template>
  <pdf src="./static/relativity.pdf" :page=1></pdf>
</template>

<script>
import pdf from 'pdfvuer'

export default {
  components: {
    pdf
  }
}
</script>

