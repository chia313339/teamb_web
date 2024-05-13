<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">我是誰</h1>
        <p v-if="isLoggedIn" class="col-md-8 fs-4">
            UserID: {{ userInfo.userId }}<br>
            暱稱: {{ userInfo.displayName }}
        </p>
        <p v-else class="col-md-8 fs-4">未登入</p>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'About',
    props: {
        isLoggedIn: Boolean,
        userInfo: Object
    }
    }
</script>
