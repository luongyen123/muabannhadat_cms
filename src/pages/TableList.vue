<template>
  <div class="row">
    <div class="col-12" style="padding-bottom: 10px">
      <b-button variant="success" v-on:click="addNew()">Thêm tin mới</b-button>
    </div>
    <div
      class="col-12"
      v-if="show"
      style="background-color: #FFFFFF; padding-top: 20px; margin-bottom: 20px; padding-bottom: 20px; padding-left: 100px; padding-right: 100px"
    >
      <h4 v-if="formData.id === 0">Thêm tin mua bán bất động sản</h4>
      <h4 v-else>Sửa tin mua bán bất động sản</h4>
      <div class="form-group row">
        <div class="col-12">
          <select class="form-control custom" v-model="formData.type" v-on:change="checkType()">
            <option value="0">Chọn loại tin *</option>
            <option value="1">Tin Bán</option>
            <option value="2">Tin cho thuê</option>
          </select>
          <span v-if="formValidate.type" class="error">{{formValidate.type}}</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <label>Loại bất động sản</label>
          <select class="form-control custom" v-model="formData.type_bds" @change="checkLoaiBDS()">
            <option value="0">Loại bất động sản *</option>
            <option
              v-for="(type_bds,index) in colum_bds"
              v-bind:key="index"
              v-bind:value="index"
            >{{type_bds}}</option>
          </select>
          <span v-if="formValidate.type_bds" class="error">{{formValidate.type_bds}}</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12">Địa điểm</label>
        <div class="col-4">
          <select
            class="form-control custom"
            v-model="formData.city_code"
            v-on:change="getDistrict"
          >
            <option value="0">Tỉnh/Thành phố*</option>
            <option
              v-for="(city,index) in cityData"
              v-bind:key="index"
              v-bind:value="city.city_code"
            >{{city.name}}</option>
          </select>
          <span v-if="formValidate.city_code" class="error">{{formValidate.city_code}}</span>
        </div>
        <div class="col-4">
          <select
            class="form-control custom"
            v-model="formData.district_code"
            v-on:change="getAddress"
          >
            <option value="0">Quận/Huyện *</option>
            <option
              v-for="(district,index) in districtData"
              v-bind:key="index"
              v-bind:value="district.district_code"
            >{{district.name}}</option>
          </select>
          <span v-if="formValidate.district_code" class="error">{{formValidate.district_code}}</span>
        </div>
        <div class="col-4">
          <select
            class="form-control custom"
            v-model="formData.address_code"
            style="margin-bottom: 5px"
            @change="checkLocation(3)"
          >
            <option value="0">Xã/Phường *</option>
            <option
              v-for="(address,index) in addressData"
              v-bind:key="index"
              v-bind:value="address.address_code"
            >{{address.name}}</option>
          </select>
          <span v-if="formValidate.address_code" class="error">{{formValidate.address_code}}</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-4">
          <input
            class="form-control custom"
            placeholder="Số nhà"
            type="text"
            v-model="formData.address_number"
          />
        </div>
        <div class="col-8">
          <input
            class="form-control custom"
            placeholder="Đường"
            type="text"
            v-model="formData.address_street"
          />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <label>Tiêu đề *</label>
          <input
            class="form-control custom"
            placeholder="Tiêu đề*"
            type="text"
            v-model="formData.title"
            v-on:keyup="checkTitle(1)"
          />
          <span v-if="formValidate.title" class="error">{{formValidate.title}}</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <label>Mô tả chi tiết*</label>
          />
          <textarea
            class="form-control"
            placeholder="Mô tả chi tiết"
            type="text"
            id="custom1"
            v-model="formData.description"
            v-on:keyup="checkTitle(2)"
          ></textarea>
          <span v-if="formValidate.description" class="error">{{formValidate.description}}</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label>Tổng giá *</label>
          <input
            class="form-control custom"
            placeholder="Tổng giá"
            type="text"
            v-model="formData.price"
            @change="checkGia(1)"
          />
          <span v-if="formValidate.price" class="error">{{formValidate.price}}</span>
        </div>
        <div class="col-6">
          <label>Đơn vị tiền tệ *</label>
          <select
            class="form-control custom"
            v-model="formData.money"
            style="margin-bottom: 5px"
            @change="checkGia(2)"
          >
            <option value="0">Đơn vị tiền tệ *</option>
            <option value="1">Tỷ</option>
            <option value="2">Triệu</option>
          </select>
          <span v-if="formValidate.money" class="error">{{formValidate.money}}</span>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-3">
          <label>Số phòng ngủ</label>
          <input
            class="form-control custom"
            placeholder="Số phòng ngủ"
            type="number"
            v-model="formData.number_roomNgu"
          />
        </div>
        <div class="col-3">
          <label>Số phòng tắm</label>
          <input
            class="form-control custom"
            placeholder="Số phòng tắm"
            type="number"
            v-model="formData.number_roomTam"
          />
        </div>
        <div class="col-3">
          <label>Bề rộng</label>
          <input
            class="form-control custom"
            placeholder="Bề rộng"
            type="text"
            v-model="formData.rong"
          />
        </div>
        <div class="col-3">
          <label>Bề dài</label>
          <input
            class="form-control custom"
            placeholder="Bề dài"
            type="text"
            v-model="formData.dai"
          />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <select class="form-control custom" v-model="formData.huong">
            <option value="0">Hướng</option>
            <option
              v-for="(huong,index) in huong_colums"
              v-bind:key="index"
              v-bind:value="index"
            >{{huong}}</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control custom" v-model="formData.hem">
            <option value="0">Hẻm</option>
            <option
              v-for="(hem,index) in hem_colums"
              v-bind:key="index"
              v-bind:value="index"
            >{{hem}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-4">
          <label>Số tầng</label>
          <input
            class="form-control custom"
            placeholder="Số tầng"
            type="text"
            v-model="formData.number_tang"
          />
        </div>
        <div class="col-4">
          <label>Tổng diện tích</label>
          <input
            class="form-control custom"
            placeholder="TTổng diện tích"
            type="text"
            v-model="formData.sumS"
          />
        </div>
        <div class="col-4">
          <label>Pháp lý</label>
          <select class="form-control custom" v-model="formData.type_bds">
            <option value="0">Pháp lý</option>
            <option
              v-for="(phaply,index) in phaply_colums"
              v-bind:key="index"
              v-bind:value="index"
            >{{phaply}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Choose Image</label>
        <div class="custom-file" style="margin-bottom: 10px">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile04"
            @change="onFileChanged"
            multiple
          />
          <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
        </div>
        <div class="col-8" v-if="urls.length >0">
          <div class="row">
            <div class="col" v-for="(url, index) in urls" v-bind:key="index">
              <button class="btn btn-danger" @click="xoaanh(index)">Xóa ảnh</button>
              <br />
              <img :src="url" class="img-thumbnail" style="max-height: 250px" />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        v-on:click="addTin()"
        v-if="formData.id === 0"
      >Thêm</button>
      <button type="submit" class="btn btn-primary" v-on:click="updateTinbds()" v-else>Sửa tin</button>
    </div>
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <h4>Tìm kiếm tin mua bán</h4>
        <div class="form-group row">
          <div class="col-4">
            <label>Lọc theo loại tin</label>
            <select class="form-control custom" v-model="formData.type">
              <option value="0">Chọn loại tin *</option>
              <option value="1">Tin Bán</option>
              <option value="2">Tin cho thuê</option>
            </select>
          </div>
          <div class="col-3">
            <label>Lọc theo loại BDS</label>
            <select class="form-control custom" v-model="formData.type_bds">
              <option value="0">Loại bất động sản *</option>
              <option
                v-for="(type_bds,index) in colum_bds"
                v-bind:key="index"
                v-bind:value="index"
              >{{type_bds}}</option>
            </select>
          </div>
          <div class="col-2">
            <br />
            <b-button
              variant="primary"
              v-on:click="fetch(1)"
              class="btn btn-primary"
              style="margin-left: 5px"
            >
              <span class="ti-search"></span> Search
            </b-button>
          </div>
          <div class="col-3">
            <br />
            <b-button variant="primary" v-on:click="reset" class="btn btn-danger">
              <span class="ti-reload"></span> Reset search
            </b-button>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-12">Lọc theo địa điểm</label>
          <div class="col-4">
            <select
              class="form-control custom"
              v-model="formData.city_code"
              v-on:change="getDistrict"
            >
              <option value="0">Tỉnh/Thành phố*</option>
              <option
                v-for="(city,index) in cityData"
                v-bind:key="index"
                v-bind:value="city.city_code"
              >{{city.name}}</option>
            </select>
          </div>
          <div class="col-4">
            <select
              class="form-control custom"
              v-model="formData.district_code"
              v-on:change="getAddress"
            >
              <option value="0">Quận/Huyện *</option>
              <option
                v-for="(district,index) in districtData"
                v-bind:key="index"
                v-bind:value="district.district_code"
              >{{district.name}}</option>
            </select>
          </div>
          <div class="col-4">
            <select
              class="form-control custom"
              v-model="formData.address_code"
              style="margin-bottom: 5px"
            >
              <option value="0">Xã/Phường *</option>
              <option
                v-for="(address,index) in addressData"
                v-bind:key="index"
                v-bind:value="address.address_code"
              >{{address.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-4">
            <label>Giá nhỏ nhất</label>
            <input type="number" v-model="formData.price_min" class="form-control custom" />
          </div>
          <div class="col-4">
            <label>Giá lớn nhất</label>
            <input type="number" v-model="formData.price_max" class="form-control custom" />
          </div>
          <div class="col-4">
            <label>Đơn vị tiền tệ *</label>
            <select class="form-control custom" v-model="formData.money" style="margin-bottom: 5px">
              <option value="0">Đơn vị tiền tệ *</option>
              <option value="1">Tỷ</option>
              <option value="2">Triệu</option>
            </select>
          </div>
        </div>
        <div class="col-md-4 pull-right" style="margin-top:20px" v-if="totalPage >1">
          <input
            v-for="(item, index) in totalPage"
            v-bind:key="index"
            v-on:click="fetch(item)"
            v-bind:value="item"
            name="page"
            type="button"
            class="btn btn-sm btn-primary active"
            v-bind:disabled="item === pageActive"
            style="margin-right: 2px"
          />
        </div>
        <div slot="raw-content" class="table-responsive">
          <paper-table
            :data="data"
            :columns="table1.columns"
            :columns_index="table1.colum_index"
            @updateTin="editTin"
            @delTin="delTin"
          ></paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = [
  "Loại BDS",
  "Tỉnh/TP",
  "Quận/Huyện",
  "Phường Xã",
  "Tiêu đề",
  "Tổng giá",
  "Người đăng",
  "Ngày đăng",
  "Trạng thái",
  "Hành động"
];
const colums_index = [
  "type_bds",
  "city",
  "district",
  "address",
  "title",
  "price",
  "user",
  "created",
  "status"
];
const colum_bds = {
  1: "Căn hộ",
  2: "Nhà",
  3: "-- Nhà phố",
  4: "-- Biệt thự",
  5: "-- Nhà riêng",
  6: "Đất nền",
  7: "-- Đất thổ cư",
  8: "-- Đất nông nghiệp",
  9: "-- Đất công nghiệp",
  10: "Mặt bằng",
  11: "-- Mặt bằng văn phòng",
  12: "-- Mặt bằng bán lẻ",
  13: "-- Kho xưởng"
};
const huong_colums = {
  1: "Đông",
  2: "Tây",
  3: "Nam",
  4: "Bắc",
  5: "Đông Bắc",
  6: "Tây Bắc",
  7: "Tây Nam",
  8: "Đông Nam"
};
const hem_colums = {
  1: "Mặt tiền",
  2: "Dưới 3m",
  3: "Từ 3-5m",
  4: "Trên 5m"
};
const phaply_colums = {
  1: "Sổ đỏ",
  2: "Sổ Hồng",
  3: "Hợp đồng mua bán",
  4: "Giấy tay",
  5: "Khác",
  6: "Không rõ"
};
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
        id: 0,
        type: 0,
        type_bds: 0,
        city_code: "0",
        district_code: "0",
        address_code: "0",
        price_min: 0,
        price_max: 0,
        money: 0,
        address_street: "",
        address_number: "",
        title: "",
        description: "",
        price: 0.0,
        number_roomNgu: 0,
        number_roomTam: 0,
        rong: 0,
        dai: 0,
        huong: 0,
        hem: 0,
        number_tang: 0,
        media: [],
        status: 0,
        sumS: 0,
        next_page: 1
      },
      show: false,
      colum_bds: colum_bds,
      huong_colums: huong_colums,
      hem_colums: hem_colums,
      phaply_colums: phaply_colums,
      urls: [],
      images: [],
      formUpload: {
        image: [],
        folder: 1
      },
      cityData: [],
      districtData: [],
      addressData: [],
      formValidate: {
        type: "",
        type_bds: "",
        city_code: "",
        district_code: "",
        address_code: "",
        title: "",
        description: "",
        price: "",
        money: ""
      },
      indexData: 0,
      data: [],
      totalPage: 0,
      pageActive: 1
    };
  },
  created() {
    this.fetch(1);
    this.fetch_locaion();
  },
  methods: {
    async fetch(page) {
      if (page) {
        this.formData.next_page = page;
      }
      this.$store.dispatch("bds/getList", this.formData).then(reponse => {
        this.data = reponse.datas;
        this.totalPage = reponse.total_page;
        this.pageActive = page === 1 ? 1 : page;
      });
    },
    async fetch_locaion() {
      this.$store.dispatch("city/getCity", this.locationGet).then(reponse => {
        this.cityData = reponse;
      });
    },
    addNew() {
      if (this.show && this.formData.id > 0) {
        this.urls = [];
        this.images = [];
      } else {
        this.show = !this.show;
      }
      this.formData = {
        id: 0,
        type: 0,
        type_bds: 0,
        city_code: "0",
        district_code: "0",
        address_code: "0",
        price_min: 0,
        price_max: 0,
        money: 0,
        address_street: "",
        address_number: "",
        title: "",
        description: "",
        price: 0.0,
        number_roomNgu: 0,
        number_roomTam: 0,
        rong: 0,
        dai: 0,
        huong: 0,
        hem: 0,
        number_tang: 0,
        media: [],
        next_page: 1
      };
    },
    async onFileChanged(e) {
      const files = e.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          let url = URL.createObjectURL(files[i]);
          this.urls.push(url);
          this.images.push(url);
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            this.formUpload.image.push(reader.result);
          };
        }
      }
    },
    async addTin() {
      this.checkType();
      this.checkLoaiBDS();
      this.checkLocation(1);
      this.checkLocation(2);
      this.checkLocation(3);
      this.checkTitle(1);
      this.checkTitle(2);
      this.checkGia(1);
      this.checkGia(2);
      if (this.formUpload.image.length > 0) {
        await this.$store
          .dispatch("media/upload", this.formUpload)
          .then(response => {
            this.formData.media = this.formData.media.concat(response);
          });
      }
      let validate =
        this.formValidate.type === "" &&
        this.formValidate.type_bds === "" &&
        this.formValidate.city_code === "" &&
        this.formValidate.district_code === "" &&
        this.formValidate.address_code == "" &&
        this.formValidate.title === "" &&
        this.formValidate.description === "" &&
        this.formValidate.price === "" &&
        this.formValidate.money === "";
      if (validate) {
        this.$store.dispatch("bds/create", this.formData).then(response => {
          this.data.unshift(response);
          this.formData = {
            type: 0,
            type_bds: 0,
            city_code: "0",
            district_code: "0",
            address_code: "0",
            price_min: 0,
            price_max: 0,
            money: 0,
            address_street: "",
            address_number: "",
            title: "",
            description: "",
            price: 0.0,
            number_roomNgu: 0,
            number_roomTam: 0,
            rong: 0,
            dai: 0,
            huong: 0,
            hem: 0,
            number_tang: 0,
            media: [],
            next_page: 1
          };
          this.images = [];
          this.urls = [];
          this.show = false;
        });
      }
    },
    async updateTinbds() {
      this.checkType();
      this.checkLoaiBDS();
      this.checkLocation(1);
      this.checkLocation(2);
      this.checkLocation(3);
      this.checkTitle(1);
      this.checkTitle(2);
      this.checkGia(1);
      this.checkGia(2);
      if (this.formUpload.image.length > 0) {
        await this.$store
          .dispatch("media/upload", this.formUpload)
          .then(response => {
            this.formData.media = this.formData.media.concat(response);
          });
      }
      let validate =
        this.formValidate.type === "" &&
        this.formValidate.type_bds === "" &&
        this.formValidate.city_code === "" &&
        this.formValidate.district_code === "" &&
        this.formValidate.address_code == "" &&
        this.formValidate.title === "" &&
        this.formValidate.description === "" &&
        this.formValidate.price === "" &&
        this.formValidate.money === "";
      if (validate) {
        this.$store.dispatch("bds/update", this.formData).then(response => {
          this.data[this.indexData] = response;
          this.formData = {
            type: 0,
            type_bds: 0,
            city_code: "0",
            district_code: "0",
            address_code: "0",
            price_min: 0,
            price_max: 0,
            money: 0,
            address_street: "",
            address_number: "",
            title: "",
            description: "",
            price: 0.0,
            number_roomNgu: 0,
            number_roomTam: 0,
            rong: 0,
            dai: 0,
            huong: 0,
            hem: 0,
            number_tang: 0,
            media: [],
            next_page: 1
          };
          this.images = [];
          this.urls = [];
          this.show = false;
        });
      }
    },
    getDistrict() {
      this.checkLocation(1);
      if (this.formData.city_code != 0) {
        this.$store
          .dispatch("district/getDistrict", this.formData)
          .then(response => {
            this.districtData = response;
          });
      }
      // this.fetch(1);
    },
    getAddress() {
      this.checkLocation(2);
      if (this.formData.district_code != 0) {
        this.$store
          .dispatch("address/getAddress", this.formData)
          .then(response => {
            this.addressData = response;
          });
      }
      // this.fetch(1);
    },
    checkType(e) {
      this.formValidate.type = "";
      if (this.formData.type === "0" || this.formData.type === 0) {
        this.formValidate.type = "Bắt buộc chọn loại tin";
      }
    },
    checkLoaiBDS(e) {
      this.formValidate.type_bds = "";
      if (this.formData.type_bds === "0" || this.formData.type_bds === 0) {
        this.formValidate.type_bds = "Bắt buộc chọn loại bất động sản";
      }
    },
    checkLocation(type) {
      if (type == 1) {
        this.formValidate.city_code = "";
        if (this.formData.city_code === "0") {
          this.formValidate.city_code = "Bắt buộc chọn tỉnh thành phố";
        }
      }
      if (type == 2) {
        this.formValidate.district_code = "";
        if (this.formData.district_code === "0") {
          this.formValidate.district_code = "Bắt buộc chọn quận huyện";
        }
      }
      if (type == 3) {
        this.formValidate.address_code = "";
        if (this.formData.address_code === "0") {
          this.formValidate.address_code = "Bắt buộc chọn quận huyện";
        }
      }
    },
    checkTitle(type) {
      if (type === 1) {
        this.formValidate.title = "";
        if (this.formData.title === "") {
          this.formValidate.title = "Bắt buộc phải điền tiêu đề";
        }
      }
      if (type === 2) {
        this.formValidate.description = "";
        if (this.formData.description === "") {
          this.formValidate.description = "Bắt buộc phải điền tiêu đề";
        }
      }
    },
    checkGia(type) {
      if (type === 1) {
        this.formValidate.price = "";
        if (this.formData.price === "0" || this.formData.price === 0) {
          this.formValidate.price = "Bắt buộc phải nhập giá";
        }
      }
      if (type === 2) {
        this.formValidate.money = "";
        if (this.formData.money === "0" || this.formData.money === 0) {
          this.formValidate.money = "Bắt buộc phải chọn đơn vị tiền tệ";
        }
      }
    },
    reset() {
      this.formData = {
        type: 0,
        type_bds: 0,
        city_code: "0",
        district_code: "0",
        address_code: "0",
        price_min: 0,
        price_max: 0,
        money: 0,
        address_street: "",
        address_number: "",
        title: "",
        description: "",
        price: 0.0,
        number_roomNgu: 0,
        number_roomTam: 0,
        rong: 0,
        dai: 0,
        huong: 0,
        hem: 0,
        number_tang: 0,
        media: "",
        next_page: 1
      };
      this.fetch(1);
    },
    editTin(dataGet) {
      let index = dataGet.index;
      let status = dataGet.status;
      this.formData = this.data[index];
      this.formData.city_code = this.data[index].city.city_code;
      this.formData.district_code = this.data[index].district.district_code;
      this.formData.address_code = this.data[index].address.address_code;
      
      if (status != 2 || status != "2") {
        if (status === 1 || status === "1") {
          status = 0;
        } else {
          status = 1;
        }
        this.formData.status = status;
        console.log(this.formData.status);
        this.$store.dispatch("bds/update", this.formData).then(response => {
          this.data[index] = response;
          this.formData = {
            type: 0,
            type_bds: 0,
            city_code: "0",
            district_code: "0",
            address_code: "0",
            price_min: 0,
            price_max: 0,
            money: 0,
            address_street: "",
            address_number: "",
            title: "",
            description: "",
            price: 0.0,
            number_roomNgu: 0,
            number_roomTam: 0,
            rong: 0,
            dai: 0,
            huong: 0,
            hem: 0,
            number_tang: 0,
            media: [],
            next_page: 1
          };
          this.images = [];
          this.urls = [];
          this.show = false;
        });
      } else {
        this.show = true;
        this.indexData = index;
        this.urls = this.data[index].media;
        if (this.formData.city_code != 0) {
          this.$store
            .dispatch("district/getDistrict", this.formData)
            .then(response => {
              this.districtData = response;
            });
        }
        if (this.formData.district_code != 0) {
          this.$store
            .dispatch("address/getAddress", this.formData)
            .then(response => {
              this.addressData = response;
            });
        }
      }
    },
    delTin(index) {
      let formDel = this.data[index];
      this.$store.dispatch("bds/del", formDel).then(response => {
        this.data.splice(index, 1);
      });
    },
    xoaanh(index) {
      let url_image = this.urls[index];
      let index_media = this.formData.media.indexOf(url_image);
      if (index_media != -1) {
        this.formData.media.splice(index_media, 1);
      }
      let index_image = this.images.indexOf(url_image);
      if (index_image != -1) {
        this.images.splice(index_image, 1);
        this.formUpload.image.splice(index_image, 1);
      }
      this.urls.splice(index, 1);
    }
  }
};
</script>
<style>
input.custom {
  background-color: #ffffff;
  border: 1px solid #b39898;
}
select.custom {
  background-color: #ffffff;
  border: 1px solid #b39898;
}
#custom1 {
  background-color: #ffffff;
  border: 1px solid #b39898;
  height: 200px;
}
.error {
  color: red;
}
</style>
