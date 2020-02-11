<template>
  <div class="row" style="background-color: white; padding: 10px">
    <h4>Danh sách người dùng đăng ký</h4>
    <table class="table">
      <thead>
        <slot name="columns">
          <th v-for="column in columns" :key="column">{{column}}</th>
        </slot>
      </thead>
      <tbody>
        <tr v-for="(item, index) in datas" :key="index">
          <slot :row="item">
            <td v-for="(column, index) in columns_index" :key="index">{{itemValue(item, column)}}</td>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formatTimeLog } from "@/utils/dateFormat";
const columns = ["Họ tên", "Email", "Số điện thoại", "Nội dung", "Thời gian"];
const columns_index = ["name", "email", "phone", "content", "created"];
export default {
  name: "FormRegister",
  data() {
    return {
      columns: columns,
      columns_index: columns_index,
      datas: [],
      totalPage: 1,
      currentPage: 1
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    async getList(page) {
      this.currentPage = page;
      this.$store.dispatch("form/getList", { page: page }).then(response => {
        this.datas = response.datas;
        this.totalPage = response.total_page;
      });
    },
    itemValue(item, column) {
      if (column === "created") {
        return formatTimeLog(item[column]);
      }
      if (item[column] === "") {
        return "_";
      }
      return item[column];
    },
    setActive(page) {
      if (page == this.current_page) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
</style>