<template>
    <div>estas en el cloud
    <vue-word-cloud :words="words">
    <template slot-scope="{text, weight, word}">
        <div :title="weight" style="cursor: pointer;" @click="onWordClick(word)">
        {{ text }}
        </div>
    </template>
    </vue-word-cloud>
    </div>
</template>

<script>
import VueWordCloud from 'vuewordcloud';

export default {
  components: {
    [VueWordCloud.name]: VueWordCloud,
  },
  // ...
};
</script>

<style>

</style>
