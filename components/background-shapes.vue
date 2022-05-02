<template>
  <div>
    <img :src="PolygonK" class="polygon k" />
    <img :src="EllipseA" class="ellipse a" />
    <img :src="PolygonA" class="polygon a" />
    <img :src="PolygonC" class="polygon c" />
    <img :src="PolygonB" class="polygon b" />
    <img :src="PolygonD" class="polygon d" />
    <img :src="PolygonE" class="polygon e" />
    <img :src="EllipseB" class="ellipse b" />
    <img :src="PolygonF" class="polygon f" />
    <img :src="EllipseC" class="ellipse c" />
    <img :src="PolygonG" class="polygon g" />
    <img :src="PolygonH" class="polygon h" />
    <img :src="EllipseD" class="ellipse d" />
    <img :src="PolygonI" class="polygon i" />
    <img :src="PolygonJ" class="polygon j" />
  </div>
</template>

<script>
// ===================================================================== Imports
import EllipseA from '@/static/media/ellipse-a-stroke.svg'
import EllipseB from '@/static/media/ellipse-b-stroke.svg'
import EllipseC from '@/static/media/ellipse-c-stroke.svg'
import EllipseD from '@/static/media/ellipse-d-stroke.svg'
import PolygonA from '@/static/media/polygon-10.svg'
import PolygonB from '@/static/media/polygon-11.svg'
import PolygonC from '@/static/media/polygon-12.svg'
import PolygonD from '@/static/media/polygon-13.svg'
import PolygonE from '@/static/media/polygon-14.svg'
import PolygonF from '@/static/media/polygon-15.svg'
import PolygonG from '@/static/media/polygon-16.svg'
import PolygonH from '@/static/media/polygon-17.svg'
import PolygonI from '@/static/media/polygon-18.svg'
import PolygonJ from '@/static/media/polygon-19.svg'
import PolygonK from '@/static/media/polygon-20.svg'

// ====================================================================== Export
export default {
  data () {
    return {
      EllipseA,
      EllipseB,
      EllipseC,
      EllipseD,
      PolygonA,
      PolygonB,
      PolygonC,
      PolygonD,
      PolygonE,
      PolygonF,
      PolygonG,
      PolygonH,
      PolygonI,
      PolygonJ,
      PolygonK
    }
  }
}
</script>

<style lang="scss" scoped>

.polygon {
  position: absolute;
  z-index: -10;
  &.a {
    top: 0;
    left: 50%;
    transform: translateX(-19rem);
  }
  &.b {
    top: 0;
    left: 50%;
    transform: translate(22rem, 25rem);
  }
  &.c {
    top: 0;
    left: 50%;
    transform: translate(18rem, 34rem);
  }
  &.d {
    top: 0;
    right: 50%;
    transform: translate(44rem, 64rem);
  }
  &.e {
    top: 0;
    left: 50%;
    transform: translate(-43rem, 70rem);
  }
  &.f {
    top: 0;
    right: 50%;
    transform: translate(43rem, 119rem);
  }
  &.g {
    top: 0;
    right: 50%;
    transform: translate(43rem, 95rem);
  }
  &.h {
    bottom: 0;
    left: 50%;
    transform: translate(3rem, 8rem);
  }
  &.i {
    bottom: 0;
    left: 50%;
    transform: translate(-43rem, 6rem);
  }
  &.j {
    bottom: 0;
    left: 50%;
    transform: translateX(-33rem);
  }
  &.k {
    top: 0;
    left: 50%;
    transform: translateX(-43rem);
  }
}

.ellipse {
  position: absolute;
  z-index: -10;
  &.a {
    top: 0;
    left: 50%;
    transform: translate(14rem, 9rem);
  }
  &.b {
    top: 0;
    left: 50%;
    transform: translate(-41rem, 39rem);
  }
  &.c {
    top: 0;
    right: 50%;
    transform: translate(44rem, 100rem);
  }
  &.d {
    bottom: 0;
    left: 50%;
    transform: translate(-43rem, -10rem);
  }
}

</style>
