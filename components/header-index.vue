<template>
  <div id="header-index">
    <div class="grid">
      <div class="col-9">

        <div class="heading">
          {{ heading }}
        </div>

        <div class="subheading">
          {{ subheading }}
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {

  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin: 0 auto;
  padding: 5rem 0;
}

</style>
