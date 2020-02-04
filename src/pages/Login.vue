<template>
  <div class="text-center container">
    <div class="form-signin" id="validated-form">
      <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email</label>
        <input
          ref="userEmail"
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Email login"
          name="email"
          autocomplete="off"
          v-model="loginForm.email"
          v-on:keyup="checkUserID"
        />
        <p v-if="userIDValidate" class="error">{{userIDValidate}}</p>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          ref="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-on:keyup="checkPassword"
          v-model="loginForm.password"
        />
        <p v-if="passwordValidate" class="error">{{passwordValidate}}</p>
      </div>
      <button class="btn btn-lg btn-primary btn-block" v-on:click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      userIDValidate: "",
      passwordValidate: "",
      loginForm: {
        email: null,
        password: null
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      loadingID: false,
      loadingPass: false,
      redirect: "/",
      otherQuery: {},
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (!this.loginForm.email) {
      this.$refs.userEmail.focus();
    } else if (!this.loginForm.password) {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      this.checkUserID()
      this.checkPassword()
      if (this.loadingID && this.loadingPass) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push("dashboard")
            }).catch((error) =>{
              console.log(error)
            })
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    checkUserID(e) {
      this.userIDValidate = ""
      if (!this.loginForm.email) {
        this.userIDValidate = "Email required"
      } else if(this.loginForm.email.length >0) {
        if(!this.reg.test(this.loginForm.email)) {
            this.userIDValidate = "Non-email format"
        }  
      }
      if(this.userIDValidate === ""){
        this.loadingID =  true
      }
    },
    checkPassword(e) {
      this.passwordValidate = ""
      if (!this.loginForm.password) {
        this.passwordValidate = "Password required"
      } else if(this.loginForm.password.length < 6){
        this.passwordValidate = "Password must be at least 6 characters"
      }
      if(this.passwordValidate === ""){
        this.loadingPass = true
      }
    }
  }
};
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
  }

  .error{
    color: red
  }
  .form-signin {
    max-width: 400px;
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    input {
      border: 1px solid #ced4da;
      border-radius: 0.25rem !important;
      background: #fff;
    }
  }
</style>
