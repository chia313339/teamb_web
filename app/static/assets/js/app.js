const app = Vue.createApp({
    data() {
        return {
            isLoggedIn: false,
            userInfo: null,
            customerInfo: null, // 用于存储从API获取的客户信息
        };
    },
    methods: {
        initLiff() {
            liff.init({ liffId: '2005069078-1NnRjwqZ' }).then(() => {
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
            this.customerInfo = null; // 登出时清空客户信息
            this.$router.push('/');  // 使用 Vue Router 的 push 方法来跳转
            window.location.reload();
        },
        getUserProfile() {
            liff.getProfile().then(profile => {
                this.userInfo = {
                    userId: profile.userId,
                    displayName: profile.displayName
                };
                this.fetchCustomerInfo(profile.userId); // 获取用户信息后调用 API
            }).catch(err => {
                console.error('Failed to get profile', err);
            });
        },
        fetchCustomerInfo(userId) {
            const apiUrl = `https://aad7esqtuc.execute-api.ap-southeast-1.amazonaws.com/test?user=${userId}`;
            console.log('apiUrl:', apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.customerInfo = data; // 将从 API 获取的客户信息存储在 customerInfo 中
                    console.log('Customer Info:', this.customerInfo);
                })
                .catch(err => {
                    console.error('Failed to fetch customer info', err);
                });
        }
    },
    mounted() {
        this.initLiff();
    }
});
app.mount("#app");
