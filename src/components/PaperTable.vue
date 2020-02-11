<template>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="columns">
      <th v-for="column in columns" :key="column">{{column}}</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns_index"
            :key="index">
          {{itemValue(item, column)}}
        </td>
        <td>
          <a class="btn btn-info"  target="_blank" title="Xem tin" v-bind:href="href + item.slug" ><span class="ti-eye"></span></a>
          <button class="btn btn-success" title="Sửa tin" @click="update(index,2)"><span class="ti-pencil"></span></button>
          <button class="btn btn-danger" title="Xóa tin" @click="del(index)"><span class="ti-trash"></span></button>
          <button class="btn btn-primary" title="Unlock" @click="update(index,item.status)"><span class="ti-lock"></span></button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import  {formatTimeLog} from '../utils/dateFormat'
export default {
  name: 'paper-table',
  data() {
    return {
      href:"http://localhost:8081/tin-mua-ban-bds/"
    }
  },
  props: {
    columns: Array,
    columns_index: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
       switch (column) {
        case "city":
        case "address":
        case "district":
          if ("district" in item || "city" in item || "address" in item ) {
            return item[column].name;
          } else {
            return "";
          }
        case "price":
          if(item['money'] === 1){
            return item[column] + ' Tỷ';
          } else {
            return item[column] + ' Triệu';
          }
        case "user":
          return item[column].name
        case "created":
          return formatTimeLog(item[column]);
        case "status":
          if(item[column] === 0 || item[column] === '0'){
            return "Chưa phê duyệt"
          } else {
            return "Đã phê duyệt"
          }
        case "type_bds":
          if (item[column] === 1) {
            return "Căn hộ";
          } else if(item[column] === 2){
            return "Nhà";
          }
          else if(item[column] === 3){
            return "Nhà phố";
          }
          else if(item[column] === 4){
            return "Biệt thự";
          }
          else if(item[column] === 5){
            return "Nhà riêng";
          }
          else if(item[column] === 6){
            return "Đất nền";
          }
          else if(item[column] === 7){
            return "Đất thổ cư";
          }
          else if(item[column] === 8){
            return "Đất nông nghiệp";
          }
          else if(item[column] === 9){
            return "Đất công nghiệp";
          }
          else if(item[column] === 10){
            return "Mặt bằng";
          }
          else if(item[column] === 11){
            return "Mặt bằng văn phòng";
          }
          else if(item[column] === 12){
            return "Mặt bằng bán lẻ";
          }else {
            return "Kho xưởng";
          }
        default:
          return item[column];
      }
    },
    update(index, status) {
      let data = {
        index: index,
        status: status
      }
      this.$emit('updateTin',data)
    },
    del(index) {
      if(confirm('Bạn chắc chắn muốn xoá?')) {
        this.$emit('delTin',index)
      }
    }
  }
};
</script>
<style>
</style>
