<template>
  <div class="background-shapes">
    <div class="polygon a">
      <img :src="PolygonA" />
    </div>

    <div class="polygon b">
      <img :src="PolygonB" />
    </div>

    <div class="polygon c">
      <img :src="PolygonC" />
    </div>

    <div class="polygon d">
      <img :src="PolygonD" />
    </div>

    <div class="polygon e">
      <img :src="PolygonE" />
    </div>

    <div class="polygon k">
      <img :src="PolygonK" />
    </div>

    <div class="ellipse a">
      <img :src="EllipseA" />
    </div>

    <div class="ellipse b">
      <img :src="EllipseB" />
    </div>

    <!-- THIS IS WHERE THE TOP ENDS AND BOTTOM BEGINS -->

    <div class="polygon f">
      <img :src="PolygonF" />
    </div>

    <div class="polygon g">
      <img :src="PolygonG" />
    </div>

    <div class="polygon h">
      <img :src="PolygonH" />
    </div>

    <div class="polygon i">
      <img :src="PolygonI" />
    </div>

    <div class="polygon j">
      <img :src="PolygonJ" />
    </div>

    <div class="ellipse c">
      <img :src="EllipseC" />
    </div>

    <div class="ellipse d">
      <img :src="EllipseD" />
    </div>
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

.background-shapes {
  position: relative;
}

.polygon, .ellipse {
  position: absolute;
}

.polygon.k {
  top: 2.5%;
  left: 2.5%;
}

.polygon.a {
  left: 35%; 
  top: 50%;
}

.polygon.b {
  left: 80%;
  top: 26rem;
}

.polygon.c {
  left: 76%;
  top: 34rem;
}

.polygon.d {
  left: 90%;
  top: 59rem;
}

.ellipse.a {
  left: 70%;
  top: 10.5rem;
}

.ellipse.b {
  top: 26rem;
}

.polygon.e {
  top: 56rem;
}

.ellipse.c {
  left: 81%;
  top: 100rem;
}

.polygon.g {
  left: 73%;
  top: 93rem;
}

</style>
