<template>
  <div>
    <div class="logo">
    <img class="Rotation img" src="http://cdn.jingqueyun.com/turntable/image/theme/theme2/turntable-outer-bg2.png" width="128" height="128"/>
</div>
  </div>
</template>
<script>

export default {
  

};
</script>
<style lang="scss" scoped>
.logo {
            text-align: center;
            margin-top: 100px;
        }
        @-webkit-keyframes rotation {
            from {
                -webkit-transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(360deg);
            }
        }

        .Rotation {
            -webkit-transform: rotate(360deg);
            animation: rotation 40s linear infinite;
            -moz-animation: rotation 40s linear infinite;
            -webkit-animation: rotation 40s linear infinite;
            -o-animation: rotation 40s linear infinite;
        }

        .img {
            border-radius: 200px;
        }
</style>