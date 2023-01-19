<template>
  <div class="component-header-number">
    <div class="number-inner" :class="color">
      <div class="number-value">
        {{ formatToUnits(value) }}
      </div>
      <div class="number-text">
        {{ text }}
      </div>
      
    </div>
  </div>
</template>

<script>
import { formatToUnits } from '~/helpers/mixins'
  
export default {
  mixins: [formatToUnits],
  props: {
    value: {
      type: Number
    },
    last_value: {
      type: Number
    },
    change: {
      type: Number
    },
    text: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-header-number {
  width:300px;
  margin:10px 15px;
  cursor: default;
}

.number-inner {
  border-radius:5px;
  background-color: white;
  padding:35px 60px;
  display:flex;
  flex-flow:column nowrap;
  justify-content: center;
  color: white;
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.25);
}

.number-value {
  font-size:32px;
  font-weight:700;
  text-align:center;
}

.number-text {
  text-align: center;
  font-size:13px;
}

/* .color-one {
  background-color: #8000de;
  background: linear-gradient(90deg,#1371e3 3%,#138ee3);
}

.color-two {
  
  background-color: #9410f3;
  background: linear-gradient(90deg,#138ee3 3%,#11c5e1);
}

.color-three {
  background-color: #5f00de;
  background: linear-gradient(90deg,#11c5e1 3%,#1362d5);
}
*/

 .color-one {
  background-color: $hive-red;
  background: linear-gradient(90deg,$hive-black 3%,$hive-mid-grey);
}

.color-two {
  
  background-color: #363e45;
  background: linear-gradient(90deg,$hive-mid-grey 3%,$hive-mid-grey);
}

.color-three {
  background-color: #585b60;
  background: linear-gradient(90deg,$hive-mid-grey 3%,$hive-black);
}

</style>
