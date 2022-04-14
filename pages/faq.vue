<template>
  <div :class="`page page-${tag}`">
    <div class="grid">
      <div class="col">
        <h1 class="heading">
          FAQ
        </h1>
      </div>
      <div class="col">
        
        <section id="accordion">
          <div :class="['block accordion-block', `theme__${theme}`]">
            <Accordion v-slot="{ active }">
              <AccordionSection
                v-for="(section, index) in sections"
                :key="index"
                :active="active">

                <AccordionHeader>
                  <div class="label">
                    {{ section.label }}
                  </div>
                  <IconArrowDown class="icon" />
                </AccordionHeader>

                <AccordionContent>
                  <div
                    :class="['accordion-content-wrapper', 'basic-template-block-format', theme]"
                    v-html="section.content">
                  </div>
                </AccordionContent>

              </AccordionSection>
            </Accordion>
          </div>
        </section>
        
      </div>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import Accordion from '@/components/accordion/accordion'
import AccordionSection from '@/components/accordion/accordion-section'
import AccordionHeader from '@/components/accordion/accordion-header'
import AccordionContent from '@/components/accordion/accordion-content'

import Page from '@/content/pages/faq.json'

// ====================================================================== Export
export default {
  name: 'FaqPage',

  components: {
    Accordion,
    AccordionSection,
    AccordionHeader,
    AccordionContent
  },

  data () {
    return {
      tag: 'faq'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', { key: 'faq', data: Page })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    })
  },

  watch: {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.heading {
  @include header
}

</style>
