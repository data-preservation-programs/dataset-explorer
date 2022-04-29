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
  &.a {
    top: 0;
    left: 50%;
    transform: translateX(-43rem);
  }
  &.b {

  }
  &.b {

  }
  &.c {

  }
  &.d {

  }
  &.e {

  }
  &.f {

  }
  &.g {

  }
  &.h {

  }
  &.i {

  }
  &.j {

  }
  &.k {
    top: 0;
    left: 50%;
    transform: translateX(-43rem);
  }
}

.ellipse {
  position: absolute;
  &.a {

  }
  &.b {

  }
  &.c {

  }
  &.d {

  }
}

// .polygon.k {
//   top: 2.5%;
//   left: 2.5%;
// }

// .polygon.a {
//   left: 35%;
//   top: 50%;
// }

// .polygon.b {
//   left: 80%;
//   top: 26rem;
// }

// .polygon.c {
//   left: 76%;
//   top: 34rem;
// }

// .polygon.d {
//   left: calc(100vw - 9.625rem);
//   top: 59rem;
// }

// .ellipse.a {
//   left: 70%;
//   top: 10.5rem;
// }

// .ellipse.b {
//   top: 26rem;
// }

// .polygon.e {
//   top: 56rem;
// }

// .ellipse.c {
//   left: calc(100vw - 14rem);
//   top: 100rem;
// }

// .polygon.g {
//   left: 80%;
//   top: 93rem;
// }

// .polygon.f {
//   left: 82%;
//   top: 119rem;
// }

// .polygon.h {
//   left: calc(100vw - 37rem);
//   top: calc(100vh + 289rem);
// }

// .ellipse.d {
//   top: 337rem;
// }

// .polygon.i {
//   right: calc(100vw - 17rem);
//   top: calc(100vh + 306rem);
// }

// .polygon.j {
//   top: 356rem;
//   left: 11rem;
// }

</style>
