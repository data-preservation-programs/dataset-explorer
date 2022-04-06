<template>
  <section id="stats">
    <div class="grid-center">
      <div class="col-12_md-11_sm-10_mi-12 stat-box">
        <div class="project-heading">
          <DatasetIcon :icon="''" />
          <h2>{{ projectHeading }}</h2>
        </div>
        <div class="grid-center">
          <div class="col-7">
            <div class="info-block">
              <h3>{{ infoblockHeading }}</h3>
              <p>{{ infoblockText }}</p>
            </div>
            <div class="grid stat-list">
              <div
                v-for="stat in stats"
                :key="stat.key"
                class="stat col-4">

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
          <div class="col-5 resources-block">
            <h3>{{ resourcesHeading }}</h3>
            <ul>
              <li
                v-for="(link, index) in linkList"
                :key="'link' + index">
                <a
                  :href="link.url">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// ====================================================================== Imports
import DatasetIcon from '@/components/icons/dataset-icon'
 
// ====================================================================== Export
export default {
  name: 'Stats',

  components: {
    DatasetIcon
  },

  props: {
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
    projectHeading () {
      return 'COVID-19 Open Research Dataset'
    },
    infoblockHeading () {
      return 'About'
    },
    infoblockText () {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    resourcesHeading () {
      return 'Resources'
    },
    linkList () {
      return [
        {
          text: 'Useful Link or external resource one',
          url: '/'
        },
        {
          text: 'Useful Link or external resource one',
          url: '/'
        },
        {
          text: 'Useful Link or external resource one',
          url: '/'
        },
        {
          text: 'Useful Link or external resource one',
          url: '/'
        }
      ]
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
#stats>div {
  padding: 0 0.5rem;
}
.stat-box {
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

.info-block {
  padding-right: 3rem;
  padding-bottom: 5.625rem;
  p {
    line-height: 1.75;
  }
}

.resources-block {
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

.stat {
  position: relative;
  padding-top: calc(25% - 0.75rem);
  padding-bottom: calc(25% - 5rem);
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.3125rem; // 10px
  background-color: $white;
  @include small {
    width: calc(33.333% - 1rem * 2 / 3);
    padding-top: calc(33.333% - 1rem * 2 / 3);
  }
  @include tiny {
    width: calc(50% - 0.25rem);
    padding-top: calc(50% - 0.25rem);
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.inner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem 1rem;
  z-index: 10;
  @include tiny {
    justify-content: center;
  }
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
