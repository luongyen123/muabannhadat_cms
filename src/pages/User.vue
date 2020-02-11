<template>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-success" @click="plusTintuc()" style="margin-bottom: 10px">Thêm tin tức</button>
      <form v-if="show" @submit.prevent="AddTin()" style="background-color: white;padding: 10px;">
        <h4 class="text-center">{{title}}</h4>
        <div class="form-group">
          <label for="exampleInputTitle">Tiêu đề</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputTitle"
            required
            v-model="formData.title"
            style="border: 1px solid #7a9e9f;background-color: white;"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Nội dung chi tiết</label>
          <br />
          <b-button
            v-b-modal.modal-sm
            variant="info"
            style="margin-bottom: 5px"
            @click="AddImage()"
          >Thêm ảnh</b-button>
          <ckeditor :editor="editor" v-model="formData.description" :config="editorConfig"></ckeditor>
          <b-modal id="modal-sm" size="md" title="Thêm ảnh">
            <label>Choose Image</label>
            <div class="custom-file" style="margin-bottom: 10px">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile04"
                @change="onFileChanged"
                required
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
            <button type="button" class="btn btn-info" @click="upload()">Upload</button>
          </b-modal>
        </div>
        <button type="submit" class="btn btn-primary">{{buttonTitle}}</button>
      </form>
    </div>
    <div class="col-12" style="background-color: white;padding: 10px;">
      <h4>Danh sách bài viết</h4>
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
              <td>
                <a class="btn btn-info"  target="_blank" title="Xem tin" v-bind:href="href + item.slug" ><span class="ti-eye"></span></a>
                <button class="btn btn-success" title="Sửa tin" @click="update(index)">
                  <span class="ti-pencil"></span>
                </button>
                <button class="btn btn-danger" title="Xóa tin" @click="del(index)">
                  <span class="ti-trash"></span>
                </button>
              </td>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatTimeLog } from "@/utils/dateFormat";

const columns_index = ["title", "user", "created"];
const columns = ["Tiêu đề", "Nguời đăng", "Ngày đăng", "Hành động"];
export default {
  name: "user",
  components: {},
  data() {
    return {
      editor: ClassicEditor,
      formData: {
        id: 0,
        description: "",
        title: ""
      },
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote"
        ]
      },
      urls: [],
      formUpload: {
        image: [],
        folder: 1
      },
      datas: [],
      show: false,
      title: "Viết bài",
      buttonTitle: "Thêm bài",
      columns_index: columns_index,
      columns: columns,
      index: 0,
      href:"http://localhost:8081/tin-tuc/"
    };
  },
  created() {
    this.getTin();
  },
  mounted() {},
  methods: {
    async AddTin() {
      if (this.formData.id === 0) {
        this.$store.dispatch("tintuc/create", this.formData).then(response => {
          this.formData = {
            title: "",
            description: ""
          };
          this.datas.unshift(response);
          this.show = false;
          this.urls = [];
          this.formUpload.image = [];
        });
      } else {
        this.$store.dispatch("tintuc/update", this.formData).then(response => {
          this.formData = {
            title: "",
            description: ""
          };
          this.datas[this.index] = response;
          this.index = 0;
          this.show = false;
          this.urls = [];
          this.formUpload.image = [];
        });
      }
    },
    async onFileChanged(e) {
      const files = e.target.files;
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          let url = URL.createObjectURL(files[i]);
          this.urls.push(url);
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            this.formUpload.image.push(reader.result);
          };
        }
      }
    },
    xoaanh(index) {
      let url_image = this.urls[index];
      this.urls.splice(index, 1);
    },
    async upload() {
      if (this.formUpload.image.length > 0) {
        await this.$store
          .dispatch("media/upload", this.formUpload)
          .then(response => {
            console.log(response);
            this.formData.description += "<img src='" + response[0] + "'/>";
          });
      }
    },
    AddImage() {
      this.urls = [];
      this.formUpload.image = [];
    },
    plusTintuc() {
      this.show = !this.show;
      this.formData = {
        id: 0,
        title: "",
        description: ""
      };
      this.index = 0;
    },
    async getTin() {
      this.$store.dispatch("tintuc/getList", {}).then(response => {
        this.datas = response.datas;
      });
    },
    itemValue(item, column) {
      switch (column) {
        case "user":
          return item[column].name;
        case "created":
          return formatTimeLog(item[column]);
        default:
          return item[column];
      }
    },
    update(index) {
      this.title = "Sửa bài viết";
      this.buttonTitle = "Sửa bài";
      this.index = index;
      this.show = true;
      let item = this.datas[index];
      this.formData.id = item.id;
      this.formData.title = item.title;
      this.formData.description = item.description;
    },
    del(index) {
      if (confirm("Bạn chắc chắn muốn xoá?")) {
        this.formData.id = this.datas[index].id
        this.$store.dispatch("tintuc/del", this.formData).then(response => {
          this.datas.splice(index, 1);
        });
      }
    }
  }
};
</script>

<style>
</style>