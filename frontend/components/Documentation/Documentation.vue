<template>
  <div class="component-documentation">
    <h2>API Documentation</h2>
    <Intro class="intro"/>
    <Endpoint v-for="e in endpoints" 
      :key="e.name"
      :name="e.name"
      :endpoint="`${api_endpoint}${e.endpoint}`"
      :request_type="e.request_type"
      :description="e.description"
      :parameters="e.parameters"/>
  </div>
</template>

<script>
import Intro from '~/components/Documentation/partial/Intro'
import Endpoint from '~/components/Documentation/partial/Endpoint'
export default {
  components: {
    Endpoint, Intro
  },
  data() {
    return {
      api_endpoint: 'https://hivedapps.com/api',
      endpoints: [
        {
          name: 'Global Apps Data',
          endpoint: '/global',
          request_type: 'GET',
          description: 'Returns an object which includes summerized data of all apps, hbd_dollar_price & hive_dollar_price',
          parameters: [
          ]
        },
        {
          name: 'Apps',
          endpoint: '/apps',
          request_type: 'GET',
          description: 'Returns an array of apps',
          parameters: [
            {
              name: 'name',
              type: 'string',
              required: false,
              description: '',
              example: 'smartsteem',
              valid: ''
            },
            {
              name: 'app_type',
              type: 'string',
              required: false,
              description: '',
              example: ``,
              valid: 'app, dapp, interface'
            },
            {
              name: 'category',
              type: 'string',
              required: false,
              description: '',
              example: '',
              valid: ''
            },
            {
              name: 'approved',
              type: 'boolean',
              required: false,
              description: 'If the app has been reviewed and approved by team after submit/change',
              example: ``,
              valid: ''
            },
            {
              name: 'sort',
              type: 'string',
              required: false,
              description: '',
              example: '',
              valid: 'rank, dau, tx, volume_hbd, volume_hive, rewards_hbd, rewards_hive'
            },
            {
              name: 'order',
              type: 'string',
              required: false,
              description: '',
              example: '',
              valid: 'asc, desc'
            },
            {
              name: 'time',
              type: 'string',
              required: false,
              description: '',
              example: '',
              valid: 'last_day, last_week, last_month'
            },
          ]
        },
        {
          name: 'Data',
          endpoint: '/data',
          request_type: 'GET',
          description: 'Returns an array of data, consisting of objects { app, account, data_type, data }',
          parameters: [
            {
              name: 'app',
              type: 'string',
              required: true,
              description: '',
              example: 'smartsteem',
              valid: ''
            },
            {
              name: 'account',
              type: 'string',
              required: false,
              description: '',
              example: 'smartsteem',
              valid: ''
            },
            {
              name: 'data_type',
              type: 'string',
              required: false,
              description: '',
              example: '',
              valid: 'dau_total, dau_transfers, dau_meta, dau_custom, dau_benefactor, dau_transfers_outgoing, dau_transfers_incoming, tx_meta, tx_custom, tx_transfers_hbd, tx_transfers_hive, volume_transfers_hbd, volume_transfers_hive, volume_meta, rewards_benefactor_hbd, rewards_benefactor_hive, rewards_benefactor_vests, rewards_curation'
            }
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-documentation {
  max-width:1200px;
  margin: 0 auto;
  height: 100%;
  padding: 20px 10px;
  width:95%;
}

.intro {
  margin-bottom:30px;
}

</style>
