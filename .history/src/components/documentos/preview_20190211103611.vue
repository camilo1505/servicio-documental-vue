<template>
  <pdf src="http://localhost:8080/resources/misterySnow/japones/08_Compiladores_.pdf" :page=1></pdf>
</template>

<script>
import pdf from 'pdfvuer'

export default {
  components: {
    pdf
  }
}