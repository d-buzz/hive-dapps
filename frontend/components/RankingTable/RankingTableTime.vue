<template>
  <div class="component-ranking-table-time" v-bind:class="{ active_left: time_selection === '24h', active_mid: time_selection === '7d', active_right: time_selection === '30d' }">
    <div v-bind:class="{ active: time_selection === '24h', inactive: time_selection !== '24h' }" class="option-wrapper option-wrapper-left" @click="$store.dispatch('apps/rankings/changeTimeSelection', '24h')">Daily</div>
    <div v-bind:class="{ active: time_selection === '7d', inactive: time_selection !== '7d' }" class="option-wrapper option-wrapper-middle" @click="$store.dispatch('apps/rankings/changeTimeSelection', '7d')">Weekly</div>
    <div v-bind:class="{ active: time_selection === '30d', inactive: time_selection !== '30d' }" class="option-wrapper option-wrapper-right" @click="$store.dispatch('apps/rankings/changeTimeSelection', '30d')">Monthly</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    time_selection() {
      return this.$store.getters['apps/rankings/time_selection']
    }
  },
  created() {
    if(this.$route.query && this.$route.query.time) {
      let time = this.$route.query.time
      time = time === 'last_month' ? '30d' : (time === 'last_day' ? '24h' : '7d')
      this.$store.dispatch('apps/rankings/changeTimeSelection', time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-time {
  display:flex;
  flex-flow:row;
  align-items: center;
  width:fit-content;
}

.option-wrapper {
  display:flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width:90px;
  flex: 1;
  padding:8px 24px;
  cursor:pointer;
  background-color:#fafafa;
  border-top: 1px solid #e8d9f8;
  border-right: 1px solid #e8d9f8;
  border-bottom: 1px solid #e8d9f8;
  margin:0;
  font-size: 0.8rem;
  font-weight:500;
  text-align:center;
}

.option-wrapper-left {
  //border-radius: 40px 0 0 40px;
  border-radius: 40px;
  border-left: 1px solid #e8d9f8;
  //border-right: 0px;
}

.option-wrapper-middle {
  border-right: 1px solid #e8d9f8;
  border-left: 1px solid #e8d9f8;
  border-radius: 40px;
  margin: 0 8px;
}

.option-wrapper-right {
  //border-radius: 0 40px 40px 0;
   border-radius: 40px;
  border-right: 1px solid #e8d9f8;
  border-left: 1px solid #e8d9f8;
}


.active {
  color: white;
  background-color: $hive-dark-grey;
  border-color: $hive-dark-grey;
}

.active:hover {
  color: white;
}

.inactive {
  border-color: #e8d9f8;
  opacity: 0.8;
}

.inactive.option-wrapper-middle {
  border-color: #e8d9f8;
}

.option-wrapper:hover {
  background-color: $hive-dark-grey--light;
  border-color: $hive-dark-grey--light;
  color: white;
  transition: all .2s ease-out;
}


.active_left > .option-wrapper-middle {
  //border-left: 1px solid #8000de;
}

.active_right > .option-wrapper-middle {
  //border-right: 1px solid #8000de;
}

@media (max-width: 880px) {
  .component-ranking-table-time {
    
  }
}

</style>
