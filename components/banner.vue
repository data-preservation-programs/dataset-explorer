<template>
  <section id="banner">
    <div class="grid">
      <div class="col">
        <div class="banner-content">
          Lorem ipsum dolor
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'Banner'
}
</script>
  
<style lang="scss" scoped>
.banner-content {
  background-color: #ffcc00;
  padding: 1rem 1.75rem;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  @include small {
    padding: 1rem 1.5rem;
  }
}
</style>
