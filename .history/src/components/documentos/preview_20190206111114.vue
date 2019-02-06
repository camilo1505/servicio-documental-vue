<template>
    <div>
        <button
            @click="logContent"
        >
            log content
        </button>
        <pdf
            ref="myPdfComponent"
            src="http://www.liceotr.cl/biblioteca_digital/J.K.%20Rowling%20-%2001%20-%20Harry%20Potter%20y%20la%20Piedra%20Filosofal.pdf"
        ></pdf>
    </div>
</template>

<script>

import pdf from 'vue-pdf'

export default {
    components: {
        pdf
    },
    methods: {
        logContent() {

            this.$refs.myPdfComponent.pdf.forEachPage(function(page) {

                return page.getTextContent()
                .then(function(content) {

                    var text = content.items.map(item => item.str);
                    console.log(text);
                })
            });
        }
    }
}

</script>