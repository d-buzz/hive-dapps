<template>
  <div class="component-header" v-if="global.data">
    <div class="header-inner">
      <Number
        :value="global.data.dau[`${time_selection_converted}`]"
        :last_value="global.data.dau[`before_${time_selection_converted}`]"
        :change="global.data.dau[`change_${time_selection_converted}`]"
        :text="`${text_time} Active Users`"
        :color="`color-one`"/>
      <Number
        :value="global.data.tx[`${time_selection_converted}`]"
        :last_value="global.data.tx[`before_${time_selection_converted}`]"
        :change="global.data.tx[`change_${time_selection_converted}`]"
        :text="`${text_time} Transactions`"
        :color="`color-two`"/>
      <Number
        :value="volume_usd"
        :last_value="global.data.volume.hive[`before_${time_selection_converted}`]"
        :change="global.data.volume.hive[`change_${time_selection_converted}`]"
        :text="`${text_time} USD Volume`"
        :color="`color-three`"/>
    </div>
    
  </div>
</template>

<script>
import Number from './partials/number'

export default {
  components: {
    Number
  },
  computed: {
    time_selection_converted() {
      return this.$store.getters['apps/rankings/time_selection_converted']
    },
    text_time() {
      return this.time_selection_converted === 'last_day' ? 'Daily' : (this.time_selection_converted === 'last_week' ? 'Weekly' : 'Monthly')
    },
    volume_usd() {
      const hive = this.global.data.volume.hive[`${this.time_selection_converted}`]
      const hbd = this.global.data.volume.hbd[`${this.time_selection_converted}`]
      const hive_dollar_price = this.global.hive_dollar_price || 1
      const hbd_price = this.global.hbd_dollar_price || 1
      return (hive * hive_dollar_price) + (hbd * hbd_price)
    }
  },
  props: {
    global: {
      type: Object,
      default: {
        data: {
          dau: {
          },
          volume: {
            hbd: 0,
            hive: 0
          }
        },
        hive_dollar_price: 1,
        hbd_dollar_price: 1
      }
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-header {
  display:flex;
  
  width:100%;
  margin:25px 0 50px 0;
}

.header-inner {
  display:flex;
  justify-content:center;
  flex-flow:row wrap;
  width:100%;
}

.header-partial {
  
}
</style>
