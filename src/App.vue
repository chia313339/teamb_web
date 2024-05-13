<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand">小孩大聯盟</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/" exact>首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a v-if="isLoggedIn" class="nav-link" href="#" @click="logout">登出</a>
            <a v-else class="nav-link" href="#" @click="login">登入</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <router-view :is-logged-in="isLoggedIn" :user-info="userInfo"/>
  </div>
</template>

<script>
import liff from '@line/liff';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      userInfo: null,
    };
  },
  methods: {
    initLiff() {
      liff.init({ liffId: '2004469534-LnN5rRE3' }).then(() => {
        if (liff.isLoggedIn()) {
          this.isLoggedIn = true;
          this.getUserProfile();
        } else {
          this.isLoggedIn = false;
          this.userInfo = null;
        }
      }).catch(err => {
        console.error('LIFF Initialization failed', err);
      });
    },
    login() {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    },
    logout() {
      liff.logout();
      this.isLoggedIn = false;
      this.userInfo = null;
      this.$router.push('/');  // 使用 Vue Router 的 push 方法來跳轉
      window.location.reload();
    },
    getUserProfile() {
      liff.getProfile().then(profile => {
        this.userInfo = {
          userId: profile.userId,
          displayName: profile.displayName
        };
      }).catch(err => {
        console.error('Failed to get profile', err);
      });
    }
  },
  mounted() {
    this.initLiff();
  }
}
</script>
