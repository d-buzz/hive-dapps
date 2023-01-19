<template>
  <LayoutMain>
    <AppDetail :app="hive_app" />
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'
import AppDetail from '~/components/AppDetail/AppDetail'
import { getApp } from '~/helpers/api'

export default {
  components: {
    LayoutMain, AppDetail
  },
  data() {
    return {
      hive_app: {}
    }
  },
  async asyncData({ params, query, app }) {
    const hive_app = await getApp(app.$axios, params.name)
    return { hive_app: hive_app }
  }
}
</script>

<style>

</style>
