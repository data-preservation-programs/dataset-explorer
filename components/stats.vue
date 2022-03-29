<template>
  <section id="stats">
    <div class="grid-center">
      <div class="col-9_md-11_sm-10_mi-12">
        <div class="stat-list">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="stat">

            <div class="inner-content">
              <span class="value">
                {{ getStat(stat, 'value') }}
              </span>
              <span class="label">
                {{ getStat(stat, 'label') }}
              </span>
            </div>

            <div class="overlay-gradient">
              <div class="gradient top" />
              <div class="fill" />
              <div class="gradient bottom" />
            </div>

            <div class="drop-gradient" />

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'Stats',

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
.stat-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -1rem;
  @include small {
    justify-content: center;
  }
}

.stat {
  position: relative;
  width: calc(25% - 1rem * 3 / 4);
  padding-top: calc(25% - 1rem * 3 / 4);
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.625rem; // 10px
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
  &:nth-child(4n) {
    margin-right: 0;
    @include small {
      margin-right: 1rem;
    }
    @include tiny {
      margin-right: 0.5rem;
    }
  }
  &:nth-child(3n) {
    @include small {
      margin-right: 0;
    }
    @include tiny {
      margin-right: 0.5rem;
    }
  }
  &:nth-child(even) {
    @include tiny {
      margin-right: 0;
    }
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
  @include leading_MediumLarge;
  margin-bottom: 1rem;
}

.label {
  @include fontSize_Tiny;
  @include leading_Large;
  @include tiny {
    @include fontSize_Regular;
  }
}

// /////////////////////////////////////////////////////////////////// Gradients
.overlay-gradient {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  z-index: 5;
}

.stat {
  // green
  &:first-child {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #07C182 97%); }
      &.top { background: linear-gradient(320deg, #73FCD3 10%, rgba(9, 154, 82, 0.6) 20%, rgba(0, 87, 15, 0.5) 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #16FFB9 6%, #00570F 31%, #000000 61%); }
  }
  // turquoise
  &:nth-child(5n + 2) {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #07C6D2 97%); }
      &.top { background: linear-gradient(320deg, #35DBFF 10%, rgba(9, 119, 154, 0.6) 20%, rgba(0, 71, 87, 0.5) 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #35DBFF 6%, #005257 31%, #000000 61%); }
  }
  // yellow
  &:nth-child(5n + 3) {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #E1B000 97%); }
      &.top { background: linear-gradient(320deg, #FFBE16 10%, rgba(136, 104, 22, 0.6) 20%, rgba(103, 87, 55, 0.5) 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #FFB016 6%, #573400 31%, #000000 61%); }
  }
  // blue
  &:nth-child(5n + 4) {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #2596FF 97%); }
      &.top { background: linear-gradient(320deg, #2E5CFF 10%, rgba(9, 32, 154, 0.6) 26%, rgba(1, 13, 124, 0.5) 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #0032E3 6%, #001272 31%, #000000 61%); }
  }
  // pink
  &:nth-child(5n + 5) {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #981DD2 97%); }
      &.top { background: linear-gradient(320deg, #B63EFF 10%, rgba(151, 9, 154, 0.6) 20%, rgba(87, 0, 78, 0.5) 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #FF16DA 6%, #57002F 31%, #000000 61%); }
  }
  // purple
  &:nth-child(5n + 6) {
    .gradient {
      &.bottom { background: linear-gradient(135deg, #131914 56%, #7D7FED 97%); }
      &.top { background: linear-gradient(320deg, #827DFF 10%, #394074 20%, #1A2E42 40%, transparent 105%); }
    }
    .drop-gradient { background: linear-gradient(306deg, #827DFF 6%, #192F49 31%, #000000 61%); }
  }
}

.gradient {
  position: absolute;
  border-radius: 10px;
  // Border gradient
  &.bottom {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  // Top gradient
  &.top {
    bottom: -0.5rem;
    right: -0.5rem;
    width: 80%;
    height: 80%;
    filter: blur(15px);
    z-index: 10;
  }
}

.fill {
  position: absolute;
  border-radius: 10px;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: $logCabin;
  z-index: 5;
}

.drop-gradient {
  position: absolute;
  top: 1rem;
  left: 0;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  mix-blend-mode: normal;
  opacity: 0.7;
  filter: blur(15px);
  z-index: -1;
}
</style>
