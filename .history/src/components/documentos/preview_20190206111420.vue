<template>
    <div>
        <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 25%"
        ></pdf>
    </div>
</template>

<script>

import pdf from 'vue-pdf'

var loadingTask = pdf.createLoadingTask('http://www.liceotr.cl/biblioteca_digital/J.K.%20Rowling%20-%2001%20-%20Harry%20Potter%20y%20la%20Piedra%20Filosofal.pdf');

export default {
    components: {
        pdf
    },
    data() {
        return {
            src: loadingTask,
            numPages: undefined,
        }
    },
    mounted() {

        this.src.then(pdf => {

            this.numPages = pdf.numPages;
        });
    }
}

</script>