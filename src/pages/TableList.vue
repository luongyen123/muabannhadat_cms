<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns" :columns_index="table1.colum_index">

            </paper-table>
          </div>
        </card>
      </div>

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Loại BDS", "Tỉnh/TP", "Quận/Huyện", "Phường Xã", "Tiêu đề","Tổng giá","Người đăng","Trạng thái"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  }
];
const colums_index = [
  "type_bds", "city", "district", "address", "title", "price", "user","status"
]
export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "",
        subTitle: "",
        columns: [...tableColumns],
        colum_index: [...colums_index],
        data: []
      },
      formData: {
        type: 0,
        type_bds: 0,
        city_code: '0',
        district_code: '0',
        address_code: '0',
        price_min: 0,
        price_max: 0,
        money: 0,
        next_page: 1
      }
    };
  },
  created() {
    this.fetch(1)
  },
  methods: {
    async fetch(page) {
      if (page) {
        this.formData.next_page = page;
      }
      this.$store.dispatch('bds/getList', this.formData).then(reponse => {
        this.data = reponse.datas;
        this.totalPage = reponse.total_page;
        this.pageActive = page === 1 ? 1 : page;
      });
    },
    async fetch_locaion() {
      this.$store
        .dispatch("location/listCity", this.locationGet)
        .then(reponse => {
          this.dataLocation = reponse;
        });
    },
  }
};
</script>
<style>
</style>
