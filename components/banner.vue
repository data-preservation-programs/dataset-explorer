<template>
  <section id="banner">
    <div class="grid">
      <div class="col-12">
        <div class="banner-content">
          The datasets outlined on this site represent data stored between 2020 and 2022 on the Filecoin network. This subset of data is not currently being updated at the moment, and so the CIDs have been removed from the site. Updates will be shared <a target="_blank" href="https://filecoinproject.slack.com/archives/C01AK1J7TF1">in Slack</a>. In the meantime, please visit <a target="_blank" href="https://retrievalbot-dashboard.vercel.app">this dashboard</a> to find retrievable CIDs or <a target="_blank" href="https://filecoin-explorer.com">filecoin-explorer.com</a> to learn more about datasets stored on Filecoin.
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
//   background-color: rgba(205, 215, 205, 0.4);
  background-color: $supernovaDim;
  border: 0.0625rem solid $supernova;
  padding: 1rem 1.75rem;
  color: $gray900;
  border-radius: 1rem;
  text-align: center;
  font-weight: regular;
  line-height: 1.5;
  margin-top: -2rem;
  letter-spacing: 0;
  a {
    color: $gray800;
    border-bottom: 0.0625rem dashed $gray800;
    transition: all 0.25s ease;
    &:hover {
      border-bottom: 0.0625rem solid;
    }
  }
  @include small {
    padding: 1rem 1.5rem;
  }
}
</style>
