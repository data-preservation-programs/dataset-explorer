<template>
  <div
    class="accordion-header"
    @click="toggle"
    @keyup.enter="toggle">

    <slot />

  </div>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'AccordionHeader',

  mounted () {
    this.$nextTick(() => {
      const parent = this.$parent.$parent
      const count = parent.children.length
      const newCount = parent.$children.length
      if (parent.toggleOnLoad) {
        this.toggle()
      } else if (count !== newCount) {
        if (parent.toggleWhenAdded) { this.toggle() }
        if (parent.scrollToWhenAdded) {
          const timeout = setTimeout(() => {
            this.$scrollToElement(this.$el, 500, -96)
            clearTimeout(timeout)
          }, 150)
        }
      }
    })
  },

  methods: {
    toggle () {
      this.$parent.$parent.$emit('toggle', this.$parent._uid)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.accordion-header {
  @include mini {
    padding-bottom: 2rem;
  }
}

.label {
  font-size: 1.5rem;
  line-height: 2.375rem;
  padding-bottom: 1.875rem;
  letter-spacing: $letterSpacing_Large;
}

.text-snippet {
  font-family: $font_Secondary;
  font-size: 1.125rem;
  padding-top: 0.5rem;
}

.icon {
  width: 2rem;
}

</style>
