<template>
    <div>
        {{currentPage}} / {{pageCount}}
        <pdf
            src="http://www.liceotr.cl/biblioteca_digital/J.K.%20Rowling%20-%2001%20-%20Harry%20Potter%20y%20la%20Piedra%20Filosofal.pdf"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
        ></pdf>
    </div>
</template>

<script>

import pdf from 'vue-pdf'

export default {
    components: {
        pdf
    },
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
        }
    }
}

</script>