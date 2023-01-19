<template>
  <div class="component-ranking-navigation">
    <div v-if="$route.name.includes('rankings')" class="table-top-wrapper">
      <h2 class="apps-text">Total: {{ apps.length ? apps.length : 0 }} {{ selectedType !== 'All Types' ? optionsType.filter(x => x.value === selectedType)[0].name + 's' : 'Apps' }}</h2>
      <div class="container-right">
        <Dropdown v-on:updateOption="updateOptionType" class="dropdown"
          :options="optionsType" 
          :optionKey="'value'"
          :selected="{ name: selectedType !== 'All Types' ? optionsType.filter(x => x.value === selectedType)[0].name : 'All Types', value: selectedType }"
          :placeholder="'All Types'"/>
        <Dropdown v-on:updateOption="updateOptionCategory" class="dropdown"
          :options="optionsCategory" 
          :selected="{ value: selectedCategory }"
          :placeholder="'All Categories'"/>
        <RankingTableTime class="nav-ranking-table-time"/>
      </div>
    </div>
  </div>
</template>

<script>
import RankingTableTime from '~/components/RankingTable/RankingTableTime'
import Dropdown from '~/components/partials/Dropdown'
export default {
  components: {
     RankingTableTime, Dropdown
  },
  props: {
    apps: {
      type: Array
    }
  },
  computed: {
    selectedType() {
      return this.$route && this.$route.params.type ? this.$route.params.type : 'All Types'
    },
    selectedCategory() {
      return this.$route && this.$route.params.category ? this.$route.params.category : 'All Categories'
    },
  },
  data() {
    return {
      optionsType: [
        { name: 'All Types' },
        { name: 'App', value: 'app' },
        //{ name: 'dapp' },
        { name: 'Interface', value: 'interface' },
        { name: 'Steem Engine', value: 'steemengine'},
        { name: 'Project', value: 'project' },
        { name: 'Browser Extension', value: 'extension' }
      ],
      optionsCategory: [
        { name: 'All Categories' },
        { name: 'games' },
        { name: 'entertainment' },
        { name: 'exchanges' },
        { name: 'development' },
        { name: 'gambling' },
        { name: 'wallet' },
        { name: 'finance' },
        { name: 'promotion' },
        { name: 'social' },
        { name: 'media' },
        { name: 'security' },
        { name: 'utility' },
        { name: 'interface' },
        { name: 'education' },
        { name: 'health' },
        { name: 'content discovery' }
      ]
    }
  },
  created() {
  },
  methods: {
    updateOptionType({ name, value }) {
      let q = { name: 'rankings' }
      if(name !== 'All Types') {
        q = { name: 'rankings-type', params: { type: value } }
      }
      this.$router.push(q)
    },
    updateOptionCategory({ name }) {
      let q = { name: 'rankings' }
      if(name !== 'All Categories') {
        q = { name: 'rankings-category', params: { category: name } }
      }
      this.$router.push(q)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-navigation {
  margin-bottom:10px;
}

.nav-ranking-table-time {
  margin-top:-4px;
}

a:focus {
  text-decoration: none !important;
}

.table-top-wrapper {
  display:flex;
  flex-flow:row wrap;
  align-items: center;
  justify-content: space-between;
  margin-right:5px;
}
.dropdown {
  margin-right:30px;
  margin-bottom:5px;
  width: 125px;
}

.container-right {
  display:flex;
  flex-flow:row wrap;
}

.apps-text {
  text-align:center;
  font-size:15.4px;
  font-weight:700;
  margin-bottom:0;
  margin-left:5px;
  color: #636b6f;
}

@media (max-width: 750px) {
  .component-navigation-wrapper {
    margin-top:10px;
  }

  .logo-wrapper {
    margin-bottom:10px;
  }
}

@media (max-width: 880px) {
  .table-top-wrapper {
    width:100%;
    flex-flow:column wrap;
    justify-content: center;
  }
  .dropdown {
    margin-bottom:20px;
    margin-right:0;
    width:100%;
  }

  .container-right {
    flex-flow: column;
  }
}

@media (max-width: 390px) {


  .dropdown {
    
  }
}

</style>
