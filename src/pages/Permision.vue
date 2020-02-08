<template>
  <div class="contact-us full-screen">
    <div class="wrapper wrapper-full-page section content">
      <div class>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
              <h2 class="title text-danger">413 Permision</h2>
              <h2 class="title">Permision denined</h2>
              <button @click="logout()">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken, removeCurrentUser, getRole } from "@/utils/auth";
export default {
  name: "permision",
  methods: {
    logout() {
      removeToken();
      removeCurrentUser();
      removeRole();
      this.$router.push("login")
    }
  }
};
</script>
