const app = Vue.createApp({
    data() {
        return {
            isLoggedIn: false,
            userInfo: null,
            customerInfo: null, // 用于存储从API获取的客户信息
            isDataLoaded: false, // 用于确保数据加载完毕前不渲染
            modalImage: '' // 用于存储模态框中显示的图片链接
        };
    },
    computed: {
        limitedCustomerInfo() {
            if (!this.customerInfo) {
                return [];
            }
            // 倒序排列，并取最后9条
            return this.customerInfo.slice().reverse().slice(0, 9);
        },
        totalRecords() {
            return this.customerInfo ? this.customerInfo.length : 0;
        },
        totalHeatSum() {
            if (!this.customerInfo) {
                return 0;
            }
            return this.customerInfo.reduce((sum, info) => sum + info.heat_sum, 0);
        },
        averageHeat() {
            if (!this.customerInfo || this.customerInfo.length === 0) {
                return 0;
            }
            return this.totalHeatSum / this.totalRecords;
        }
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
            const apiUrl = `/api/customer-info?user=${userId}`;
            console.log('apiUrl:', apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.customerInfo = data; // 将从 API 获取的客户信息存储在 customerInfo 中
                    console.log('Customer Info:', this.customerInfo);
                    this.isDataLoaded = true; // 数据加载完毕
                    this.updateDataAttributes();
                })
                .catch(err => {
                    console.error('Failed to fetch customer info', err);
                });
        },
        parseItems(itemString) {
            try {
                return JSON.parse(itemString.replace(/'/g, '"'));
            } catch (error) {
                console.error('Failed to parse items', error);
                return [];
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', 
                              hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return new Date(dateString).toLocaleString('zh-TW', options);
        },
        formatNumber(number) {
            return new Intl.NumberFormat('zh-TW').format(number);
        },
        updateDataAttributes() {
            this.$nextTick(() => {
                const totalRecordsElement = document.querySelector('.total-records');
                const totalHeatSumElement = document.querySelector('.total-heat-sum');
                const averageHeatElement = document.querySelector('.average-heat');
                
                totalRecordsElement.setAttribute('data-to', this.totalRecords);
                totalHeatSumElement.setAttribute('data-to', this.totalHeatSum);
                averageHeatElement.setAttribute('data-to', this.averageHeat);

                // Trigger the animation again (assuming your library has a method to reinitialize the animation)
                if (typeof $.fn.countTo !== 'undefined') {
                    $(totalRecordsElement).countTo();
                    $(totalHeatSumElement).countTo();
                    $(averageHeatElement).countTo();
                }
            });
        },
        showImage(picName) {
            this.modalImage = picName;
            $('#imageModal').modal('show'); // 使用 jQuery 显示 Bootstrap 模态框
        }
    },
    mounted() {
        this.initLiff();
    },
    watch: {
        customerInfo() {
            this.updateDataAttributes();
        }
    }
});
app.mount("#app");
