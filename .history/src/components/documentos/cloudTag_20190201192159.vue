<template>
    <div>estas en el cloud
        <vue-word-cloud
  :words="[['romance', 19], ['horror', 3], ['fantasy', 7], ['adventure', 3]]"
  :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
  font-family="Roboto"
/>
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
