<template>
  <div>
    <LayoutMain>
      <!-- <Header :global="global"/> -->
      <RankingTable
        :apps="apps"
        :is-loading="isLoading"
        style="margin-top: 30px"
      />
    </LayoutMain>
  </div>
</template>

<script>
import { getApps, getGlobal } from "~/helpers/api";
import RankingTable from "~/components/RankingTable/RankingTable";
import RankingTableTime from "~/components/RankingTable/RankingTableTime";
import Header from "~/components/header/Header.vue";
import LayoutMain from "~/components/LayoutMain";

import { mapGetters } from "vuex";
export default {
  computed: {
    time_selection_converted() {
      return this.$store.getters["apps/rankings/time_selection_converted"];
    },
    order_arr() {
      return this.$store.getters["apps/rankings/order_arr"];
    },
    sort_arr() {
      return this.$store.getters["apps/rankings/sort_arr"];
    },
    time_arr() {
      return this.$store.getters["apps/rankings/time_arr"];
    },
  },
  components: {
    RankingTable,
    LayoutMain,
    RankingTableTime,
    Header,
  },
  data() {
    return {
      apps: [],
      global: {},
      isLoading: false,
    };
  },
  async asyncData({ params, query, app }) {
    let q = { ...params };

    q.sort =
      !query.sort ||
      ![
        "rank",
        "dau",
        "tx",
        "volume_hive",
        "volume_hbd",
        "rewards_hive",
        "rewards_hbd",
      ].includes(query.sort)
        ? (q.sort = "rank")
        : query.sort;
    q.order =
      !query.order || !["asc", "desc"].includes(query.order)
        ? "asc"
        : query.order;
    q.time =
      !query.time ||
      !["last_day", "last_week", "last_month"].includes(query.time)
        ? "last_day"
        : query.time;

    const data = await getApps(app.$axios, q);
    const global = await getGlobal(app.$axios);
    return { apps: data.apps, global };
  },
  watch: {
    "$route.query"() {
      this.fetchApps();
    },
  },
  methods: {
    async fetchApps() {
      this.isLoading = true;
      const urlParams = { ...this.$route.params, ...this.$route.query };

      if (
        !this.$route.query.sort ||
        ![
          "rank",
          "dau",
          "tx",
          "volume_hive",
          "volume_hbd",
          "rewards_hive",
          "rewards_hbd",
        ].includes(this.$route.query.sort)
      )
        urlParams.sort = "rank";
      if (
        !this.$route.query.order ||
        !["asc", "desc"].includes(this.$route.query.order)
      )
        urlParams.order = "asc";
      if (
        !this.$route.query.time ||
        !["last_day", "last_week", "last_month"].includes(
          this.$route.query.time
        )
      )
        urlParams.time = this.time_selection_converted;

      const data = await getApps(this.$axios, urlParams);
      this.isLoading = false;
      this.apps = data.apps;
    },
    async resetData() {
      this.apps = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/css/settings";
</style>
