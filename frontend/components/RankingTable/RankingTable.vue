<template>
  <div class="component-ranking-table">
    <div class="wrapper">
      <div>
      </div>
      <div class="table">
        <RankingTableNavigation :apps="apps"/>
        <!--<div class="table-top-wrapper">
        <RankingTableTime/>
        </div>-->
        <div class="table-header">
          <div class="table-row">
            <div v-if="display_columns.rank_24h" class="table-head col-rank">
              <RankHead :sort="true" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.rank_7d" class="table-head col-rank">
              <RankHead :sort="true" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.rank_30d" class="table-head col-rank">
              <RankHead :sort="true" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.name" class="table-head col-name">
              <NameHead/>
            </div>
            <div v-if="display_columns.app_type" class="table-head col-app-type">
              <AppTypeHead/>
            </div>
            <div v-if="display_columns.category" class="table-head col-category">
              <CategoryHead/>
            </div>

            <div v-if="display_columns.users_24h" class="table-head col-dau">
              <DauHead :sort="true" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.users_7d" class="table-head col-dau">
              <DauHead :sort="true" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.users_30d" class="table-head col-dau">
              <DauHead :sort="true" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.tx_24h" class="table-head col-tx">
              <TxHead :sort="true" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.tx_7d" class="table-head col-tx col-tx-7d">
              <TxHead :sort="true" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.tx_30d" class="table-head col-tx col-tx-7d">
              <TxHead :sort="true" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.volume_hive_24h" class="table-head col-vol">
              <VolumeHead :sort="true" :asset="'HIVE'" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.volume_hive_7d" class="table-head col-vol">
              <VolumeHead :sort="true" :asset="'HIVE'" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.volume_hive_30d" class="table-head col-vol">
              <VolumeHead :sort="true" :asset="'HIVE'" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.volume_hbd_24h" class="table-head col-vol col-vol-hbd">
              <VolumeHead :sort="true" :asset="'HBD'" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.volume_hbd_7d" class="table-head col-vol col-vol-hbd">
              <VolumeHead :sort="true" :asset="'HBD'" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.volume_hbd_30d" class="table-head col-vol col-vol-hbd">
              <VolumeHead :sort="true" :asset="'HBD'" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.rewards_hive_24h" class="table-head col-rewards col-rewards-hive">
              <RewardsHead :sort="true" :asset="'HIVE'" :time="'last_day'"/>
            </div>
            <div v-if="display_columns.rewards_hive_7d" class="table-head col-rewards col-rewards-hive">
              <RewardsHead :sort="true" :asset="'HIVE'" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.rewards_hive_30d" class="table-head col-rewards col-rewards-hive">
              <RewardsHead :sort="true" :asset="'HIVE'" :time="'last_month'"/>
            </div>

            <div v-if="display_columns.rewards_hbd_24h" class="table-head col-rewards col-rewards-hbd">
              <RewardsHead :sort="true" :asset="'HBD'" :time="'last_day'"/>
            </div> 
            <div v-if="display_columns.rewards_hbd_7d" class="table-head col-rewards col-rewards-hbd">
              <RewardsHead :sort="true" :asset="'HBD'" :time="'last_week'"/>
            </div>
            <div v-if="display_columns.rewards_hbd_30d" class="table-head col-rewards col-rewards-hbd">
              <RewardsHead :sort="true" :asset="'HBD'" :time="'last_month'"/>
            </div> 
          </div>
        </div>
        <div class="table-body">
          <p
            v-if="!isLoading && !apps.length"
            class="no-results">
            There are currently no DApps for this category
          </p>
          <template
            v-for="app in apps"
            class="table-row">
            <div
              @click="goDetail(app.name)"
              v-if="app && app.rank && app.rank.last_day"
              :key="app._id"
              class="table-row">
              <div v-if="display_columns.rank_24h" class="table-data col-rank">
                <RankBody
                  :rank="app.rank.last_day"
                  :past_rank="app.rank.before_last_day"/>
              </div>
              <div v-if="display_columns.rank_7d" class="table-data col-rank">
                <RankBody
                  :rank="app.rank.last_week"
                  :past_rank="app.rank.before_last_week"/>
              </div>
              <div v-if="display_columns.rank_30d" class="table-data col-rank">
                <RankBody
                  :rank="app.rank.last_month"
                  :past_rank="app.rank.before_last_month"/>
              </div>
              <div v-if="display_columns.name" class="table-data col-name">
                <NameBody
                  :logo="app.logo"
                  :name="app.name"
                  :short_description="app.short_description"
                  :description="app.description"
                  :logo_account="app.accounts.filter(x => x.logo)[0]"
                  :display_name="app.display_name"
                  :link="app.link"
                  :ref_link="app.ref_link"
                  :app_type="app.app_type"
                  :category="app.category"/>
              </div>
              <div v-if="display_columns.app_type" class="table-data col-app-type">
                <AppTypeBody @click="$store.dispatch('apps/rankings/changeSelectedAppType', `${app.app_type}`)"
                  :app_type="app.app_type"/>
              </div>
              
              <div v-if="display_columns.category" class="table-data col-category">
                <span class="label-category">Category: </span>
                <media :query="{maxWidth: min_width_header }">
                  
                </media>
                <CategoryBody
                  :category="app.category || ''"/>
              </div>
              <!-- DAU -->
              <div v-if="display_columns.users_24h" class="table-data col-dau">
                <span class="col-title-mobile">Users 24h</span>
                <ValueBody
                  :value="app.dau.last_day"
                  :value_pct="app.dau.change_last_day"/>
              </div>
              <div v-if="display_columns.users_7d" class="table-data col-dau col-dau-7d">
                <span class="col-title-mobile">Users 7d</span>
                <ValueBody
                  :value="app.dau.last_week"
                  :value_pct="app.dau.change_last_week"/>
              </div>
              <div v-if="display_columns.users_30d" class="table-data col-dau col-dau-30d">
                <span class="col-title-mobile">Users 30d</span>
                <ValueBody
                  :value="app.dau.last_month"
                  :value_pct="app.dau.change_last_month"/>
              </div>
              <!-- TX -->
              <div v-if="display_columns.tx_24h" class="table-data col-tx">
                <span class="col-title-mobile">Transactions 24h</span>
                <ValueBody
                  :value="app.tx.last_day"
                  :value_pct="app.tx.change_last_day"/>
              </div>
              <div v-if="display_columns.tx_7d" class="table-data col-tx col-tx-7d">
                <span class="col-title-mobile">Transactions 7d</span>
                <ValueBody
                  :value="app.tx.last_week"
                  :value_pct="app.tx.change_last_week"/>
              </div>
              <div v-if="display_columns.tx_30d" class="table-data col-tx col-tx-30d">
                <span class="col-title-mobile">Transactions 30d</span>
                <ValueBody
                  :value="app.tx.last_month"
                  :value_pct="app.tx.change_last_month"/>
              </div>
              <!-- Volume HIVE -->
              <div v-if="display_columns.volume_hive_24h" class="table-data col-vol">
                <span class="col-title-mobile">Volume HIVE 24h</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.volume.hive.last_day"
                  :value_pct="app.volume.hive.change_last_day"/> 
              </div>
              <div v-if="display_columns.volume_hive_7d" class="table-data col-vol">
                <span class="col-title-mobile">Volume HIVE 7d</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.volume.hive.last_week"
                  :value_pct="app.volume.hive.change_last_week"/> 
              </div>
              <div v-if="display_columns.volume_hive_30d" class="table-data col-vol">
                <span class="col-title-mobile">Volume HIVE 30d</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.volume.hive.last_month"
                  :value_pct="app.volume.hive.change_last_month"/> 
              </div>
              <!-- Volume HBD -->
              <div v-if="display_columns.volume_hbd_24h" class="table-data col-vol col-vol-hbd">
                <span class="col-title-mobile">Volume HBD 24h</span>
                <VolumeBody
                  :asset="'HBD'"
                  :value="app.volume.hbd.last_day"
                  :value_pct="app.volume.hbd.change_last_day"/>
              </div>
              <div v-if="display_columns.volume_hbd_7d" class="table-data col-vol col-vol-hbd">
                <span class="col-title-mobile">Volume HBD 7d</span>
                <VolumeBody
                  :asset="'HBD'"
                  :value="app.volume.hbd.last_week"
                  :value_pct="app.volume.hbd.change_last_week"/>
              </div>
              <div v-if="display_columns.volume_hbd_30d" class="table-data col-vol col-vol-hbd">
                <span class="col-title-mobile">Volume HBD 30d</span>
                <VolumeBody
                  :asset="'HBD'"
                  :value="app.volume.hbd.last_month"
                  :value_pct="app.volume.hbd.change_last_month"/>
              </div>
              <!-- Rewards HIVE -->
              <div v-if="display_columns.rewards_hive_24h" class="table-data col-rewards col-rewards-hive">
                <span class="col-title-mobile">Rewards HIVE 24h</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.rewards.hive.last_day"
                  :value_pct="app.rewards.hive.change_last_day"/>
              </div>
              <div v-if="display_columns.rewards_hive_7d" class="table-data col-rewards col-rewards-hive">
                <span class="col-title-mobile">Rewards HIVE 7d</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.rewards.hive.last_week"
                  :value_pct="app.rewards.hive.change_last_week"/>
              </div>
              <div v-if="display_columns.rewards_hive_30d" class="table-data col-rewards col-rewards-hive">
                <span class="col-title-mobile">Rewards HIVE 30d</span>
                <VolumeBody
                  :asset="'HIVE'"
                  :value="app.rewards.hive.last_month"
                  :value_pct="app.rewards.hive.change_last_month"/>
              </div>
              <!-- Rewards HBD -->
              <div v-if="display_columns.rewards_hbd_24h" class="table-data col-rewards col-rewards-hbd">
                <span class="col-title-mobile">Rewards HBD 24h</span>
                <VolumeBody
                  :asset="'HBD'"
                  :value="app.rewards.hbd.last_day"
                  :value_pct="app.rewards.hbd.change_last_day"/>
              </div>
              <div v-if="display_columns.rewards_hbd_30d" class="table-data col-rewards col-rewards-hbd">
                <span class="col-title-mobile">Rewards HBD 30d</span>
                <VolumeBody
                  :asset="'HBD'"
                  :value="app.rewards.hbd.last_month"
                  :value_pct="app.rewards.hbd.change_last_month"/>
              </div>
            </div>
          </template>
        </div>
        <div class="submit-wrapper">
          <SubmitButton class="darkgrey_button" :to="'apps-new'"/>
        </div>
      </div>
      
      <!--<BasePager
        v-if="!isLoading"
        :limit="pager.limit"
        :offset="pager.offset"
        :total-count="pager.totalCount"
        @selectPage="selectPage"/>-->
    </div>
  </div>
</template>

<script>

import RankHead from './head/RankHead'
import DauHead from './head/DauHead'
import TxHead from './head/TxHead'
import NameHead from './head/NameHead'
import VolumeHead from './head/VolumeHead'
import CategoryHead from './head/CategoryHead'
import AppTypeHead from './head/AppTypeHead.vue'
import RewardsHead from './head/RewardsHead.vue'

import RankBody from './body/RankBody'
import DauBody from './body/DauBody'
import TxBody from './body/TxBody'
import NameBody from './body/NameBody'
import VolumeBody from './body/VolumeBody'
import CategoryBody from './body/CategoryBody'
import ValueBody from './body/ValueBody'
import AppTypeBody from './body/AppTypeBody.vue'
import RewardsBody from './body/RewardsBody.vue'

import RankingTableTime from './RankingTableTime.vue'
import RankingTableNavigation from './partials/navigation.vue'

import SubmitButton from '~/components/partials/SubmitButton'

import Media from 'vue-media'
import { mapGetters } from 'vuex'

export default {
  props: {
    apps: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    pager: {
      type: Object,
      required: false
    }
  },
  computed: {
    display_columns() {
      return this.$store.getters['apps/rankings/display_columns']
    },
  },
  data() {
    return {
      tweakpoint: 60,//1050,
      min_width_header: 880
    }
  },
  methods: {
    goDetail(name) {
      this.$router.push({ name: 'app-detail', params: { name } })
    }
  },
  components: {
    RankingTableNavigation, SubmitButton, Media, ValueBody, RankHead, DauHead, TxHead, NameHead, VolumeHead, CategoryHead, RankBody, DauBody, TxBody, NameBody, VolumeBody, CategoryBody, AppTypeHead, AppTypeBody, RewardsHead, RewardsBody, RankingTableTime
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';
.table {
  max-width: 1200px;
  margin: 0 auto;
}

.submit-wrapper {
  display:flex;
  justify-content: flex-end;
  margin-right:15px;
  margin-top:15px;
}

.label-category {
  margin-right:5px;
}

.table-data {
  margin: 0;
  text-align: inherit;
  display:flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
}

.table-head {
  padding: 0;
  margin: 0;
  text-align: initial;
}

.col-category {
  width: 90px;
  padding: 0 10px;
}

.col-dau {
  width: 100px;
  text-align: right;
  padding: 0 10px;
}

.col-tx {
  width: 125px;
  text-align: right;
  padding: 0 10px;
}

.col-name {
  flex: 1;
  justify-content: flex-start;
}

.col-app-type {
  width:90px;
  display:flex;
  //justify-content: center;
}

.col-vol {
  width: 150px;
  text-align: right;
  padding: 0 10px;
}

.col-rewards {
  width: 150px;
  text-align: right;
}

.col-rank {
  width: 50px;
  margin-right: 12px;
  background: #ececec21;
  border-right: 1px solid #e1e1e1;
  border-radius: 5px 0 0 5px;
}

.table-header {
  margin: 0 -10px;
  padding: 15px 10px 15px 10px;
  background: $hive-light-grey;
  position: sticky;
  top: 0;
  .table-row {
    min-height: 22px;
    box-shadow: none;
    border-radius: 0;
    background:transparent;
    margin-bottom: 0;
    cursor: initial;
  }

  .col-rank {
    background: initial;
    border-right:none;
  }

  .table-row:hover {
    background-color: initial;
  }
}

.table-row {
  background:$hive-light-grey--light;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(51,51,51,.05);
  margin-bottom: 12px;
  padding-right:15px;
  min-height: 80px;
  display: flex;
  flex-flow:row nowrap;
  //align-items: center;
  cursor: pointer;
}

.table-row:hover {
  background:#fdfdff;
}

.table-top-wrapper {
  width: 100%;
  display:flex;
  justify-content: flex-end;
}

.wrapper {
  @include margin-wrapper-main;
}

/deep/ .head-link {
  color: $hive-dark-grey;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #d5d5d5;
  background: transparent;
  padding: 0;
  text-decoration: none;
  &.is-active {
    background: transparent;
    font-weight: 500;
    border-bottom: 1px solid #c7c7c7;
  }
}

.col-title-mobile {
  display: none;
}

@media (max-width: 1050px) {

  .col-rewards-hbd {
    display: none;
  }
}

@media (max-width: 1050px) {
  .col-vol-hbd {
    display: none;
  }

}

@media (max-width: 880px) {
  .table-header {
    display:none;
  }
  .col-vol-hbd, .col-dau-7d, .col-rewards-hive {
    display: initial;
  }

  .table-row {
    display:flex;
    flex-flow:column;
    padding-bottom:10px;
    padding-right:0;
    margin: 20px 0;
  }

  .col-title-mobile {
    display: initial;
  }
  

  .table-data {
    width:100%;
  }

  .col-rank {
    margin-right:0;
  }

  .col-text, .col-dau, .col-vol, .col-tx, .col-name, .col-rewards {
    justify-content: space-between;
    display:flex;
    flex-flow:row;
    padding:5px 20px;
    min-height: 45px;
  }

  .col-name {
    padding: 15px 20px;
  }

  .col-category {
    display:flex;
    justify-content: center;
    display:flex;
    padding:5px 5px;
  }

  .component-ranking-table-rank {
    height:50px;
    border-right: none;
  }

  .col-name {
    justify-content: center;
  }

  .component-ranking-table-name {
    margin-right:0;
    justify-content: center;
  }

  .col-category {
    text-align:center;
  }
}
</style>
