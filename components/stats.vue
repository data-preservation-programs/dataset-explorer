<template>
  <section id="stats">
    <div class="grid-center">
      <div class="col-12_md-11_sm-10_mi-12">
        <div class="project-heading">
          <DatasetIcon :icon="$route.params.id" />
          <h2>{{ datasetName }}</h2>
        </div>
        <div class="content">
          <div class="about-stats">
            <div class="info-block">
              <h3>{{ infoblockHeading }}</h3>
              <p>{{ infoblockText }}</p>
            </div>
            <div class="grid-equalHeight stat-list">
              <div
                v-for="stat in stats"
                :key="stat.key"
                class="col-5">
                <div class="inner-content">
                  <span class="value">
                    {{ getStat(stat, 'value') }}
                  </span>
                  <span class="label">
                    {{ getStat(stat, 'label') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="resources-block">
            <template v-if="linkList">
              <h3>{{ resourcesHeading }}</h3>
              <ul>
                <li
                  v-for="(resource, index) in linkList"
                  :key="'link' + index">
                  <a
                    :href="resource.link">
                    {{ resource.label }}
                  </a>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// ====================================================================== Imports
import { mapGetters } from 'vuex'

import DatasetIcon from '@/components/icons/dataset-icon'

// ====================================================================== Export
export default {
  name: 'Stats',

  components: {
    DatasetIcon
  },

  props: {
    datasetName: {
      type: String,
      required: true
    },
    statData: {
      type: Object,
      required: true
    },
    stats: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      datasetList: 'explorer/datasetNames'
    }),
    slug () {
      return this.$route.params.id
    },
    blockContent () {
      return this.siteContent.explorer.stats_block
    },
    dataSet () {
      return this.datasetList.manifest[this.slug]
    },
    infoblockHeading () {
      return this.blockContent.infoblockHeading
    },
    infoblockText () {
      return this.dataSet.description
    },
    resourcesHeading () {
      return 'Resources'
      // return this.blockContent.resourcesHeading
    },
    linkList () {
      return this.blockContent.link_list
      // return this.dataSet.resources
    }

  },

  methods: {
    getStat (stat, property) {
      if (property === 'label') { return stat.label }
      const value = this.statData[stat.key]
      if (stat.type !== 'byte') { return value.toLocaleString() }
      const parsed = this.$FormatBytes(parseInt(value), 'array')
      return `${parsed.value} ${parsed.unit}`
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#stats {
  padding-bottom: 2rem;
}

#stats>div {
  padding: 0 0.5rem;
}

#stats>div>div {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 3.4375rem 4.125rem;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border-radius: 0.3125rem;
  background: $gradient_SilverGrey;
  z-index: 5;
  box-shadow: 0px 30px 70px rgba(169, 180, 203, 0.3), -2px -2px 0px $white, 0px 3px 5px $mischka, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  h3 {
    @include fontWeight_Semibold;
    font-size: 1.375rem;
    padding-bottom: 1.5rem;
  }
}

.project-heading{
  display: flex;
  flex-direction: row;
  padding-bottom: 2rem;
  .icon {
    width: 4rem;
  }
  h2 {
    @include fontWeight_Semibold;
    font-size: 1.875rem;
    padding-left: 3rem;
    padding-top: 0.75rem;
  }
}

::v-deep svg {
  fill: $classicBlue;
}

.content {
  display: flex;
  flex-direction: row;
}

.info-block {
  padding-right: 3rem;
  padding-bottom: 5.625rem;
  p {
    line-height: 1.75;
  }
}

.resources-block {
  @include fontWeight_Semibold;
  padding-left: 4.25rem;
  line-height: 1.75;
  ul {
    list-style-type: none;
  }
  li {
    border-bottom: 2px dashed;
    transition: all 2s ease-in-out;
    &:not(:first-of-type) {
      padding-top: 1rem;
    }
    &:hover {
      border-bottom-style: solid;
    }
  }
}

.stat-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @include small {
    justify-content: center;
  }
}

.inner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $white;
  border-radius: 0.3125rem; // 10px
  padding-top: calc(25% - 0.5rem);
  padding-bottom: calc(25% - 1rem);
}

.value,
.label {
  text-align: center;
}

.value {
  @include fontSize_Large;
  @include leading_Regular;
  @include fontWeight_Semibold;
  margin-bottom: 1rem;
}

.label {
  @include fontSize_Regular;
  line-height: 1.5;
}
</style>
