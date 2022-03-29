<template>
  <button
    :class="['copy-button', { 'is-copied': isCopied }]"
    @click="copy($event)">

    <IconFile class="icon file" />

    <IconFilePlus class="icon file-plus" />

    <IconFileCheckmark class="icon file-checkmark" />

  </button>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import IconFile from '@/components/icons/file'
import IconFilePlus from '@/components/icons/file-plus'
import IconFileCheckmark from '@/components/icons/file-checkmark'

// ====================================================================== Export
export default {
  name: 'CopyButton',

  components: {
    IconFile,
    IconFilePlus,
    IconFileCheckmark
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    ...mapGetters({
      copied: 'global/copied'
    }),
    isCopied () {
      return this.copied === this.value
    }
  },

  methods: {
    ...mapActions({
      setCopiedText: 'global/setCopiedText'
    }),
    copy (e) {
      e.stopPropagation()
      const value = this.value
      this.setCopiedText(value)
      this.$AddTextToClipboard(value)
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.copy-button {
  position: relative;
  width: 1rem;
  &:hover {
    .icon {
      &.file {
        opacity: 0;
      }
      &.file-plus {
        opacity: 1;
      }
    }
  }
  &.is-copied {
    .icon {
      &.file,
      &.file-plus {
        opacity: 0;
      }
      &.file-checkmark {
        opacity: 1;
      }
    }
  }
}

.icon {
  display: block;
  width: 100%;
  transition: 100ms ease-in-out;
  &.file-plus,
  &.file-checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }
  &.file-plus {
    width: calc(100% - 1px);
    left: 1px;
  }
}

::v-deep path {
  transition: 250ms ease-in-out;
}
</style>
