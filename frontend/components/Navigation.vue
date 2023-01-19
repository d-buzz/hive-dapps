<template>
  <div class="component-navigation-wrapper">
    <div class="component-navigation-inner">
      <div class="logo-wrapper">
        <nuxt-link to="/">
          <div class="logo-wrapper-div">
            <Logo/>
          </div>
          <div class="logo-wrapper-div">
          <span v-if="false" class="text-alpha">Decentralised Apps on Hive</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/partials/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-navigation-wrapper {
  width:95%;
  max-width: 1222px;
  margin: 0 auto;
  margin-top:20px;
}

.component-navigation-inner {
  padding: 18px 30px 5px 30px;
  display:flex;
  justify-content: space-between;
  flex-flow:row wrap;
}

.logo-wrapper > a {
  display:flex;
  align-items: center;
  flex-flow:column;
  justify-content: flex-end;
}

.logo-wrapper-div {
  width: 100%;
  justify-content: flex-end;
  display:flex;
}

.text-alpha {
  outline: none;
  color: #a2a2a2;
  text-align: right;
  width:100%;
  font-size:0.7rem;
  margin-right:4px;
}

a:focus {
  text-decoration: none !important;
}

.table-top-wrapper {
  display:flex;
  flex-flow:row wrap;
  align-items: center;
  justify-content: flex-end;
  margin-right:10px;
}
.dropdown {
  margin-right:30px;
  margin-bottom:5px;
  width: 125px;
}

@media (max-width: 880px) {
  .component-navigation-wrapper {
    margin-top:10px;
  }

  .component-navigation-inner {
    justify-content: center;
  }

  .logo-wrapper {
    margin-bottom:10px;
  }
}

@media (max-width: 570px) {
  .table-top-wrapper {
    width:100%;
    justify-content: center;
  }
  .dropdown {
    margin-bottom:20px;
    
  }
}

@media (max-width: 390px) {


  .dropdown {
    margin-right:0;
    width:100%;
  }
}


</style>
