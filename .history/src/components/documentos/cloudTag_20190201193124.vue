<template>
    <div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuewordcloud"></script>
    <vue-word-cloud
  :words="[['romance', 19], ['horror', 3], ['fantasy', 7], ['adventure', 3]]"
  :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
  font-family="Roboto"
    />
    </div>
</template>

<script>
import VueWordCloud from 'vuewordcloud';

export default {
  components: {
    [VueWordCloud.name]: VueWordCloud,
  }
};
</script>

<style>

</style>
