$ = require('expose?$!expose?jQuery!jquery');
const bootstrap = require('bootstrap');
window.Vue = require('vue');
window.Highcharts = require('highcharts/highstock');
const VueResource = require('vue-resource'),
    VeeValidate = require('vee-validate'),
    Vue2Filters = require('vue2-filters'),
    Overlay = require('vue-overlay'),
    highchartsMore = require('highcharts/highcharts-more')(Highcharts),
    SolidGauge = require('highcharts/modules/solid-gauge')(Highcharts),
    Exporting = require('highcharts/modules/exporting')(Highcharts),
    VueRouter = require('vue-router'),
    navigator = require('vue!./components/main_components/navigation.vue'),
    LoginView = require('vue!./components/auth/login.vue'),
    RegistrationView = require('vue!./components/auth/registration.vue'),
    ResetPasswordView = require('vue!./components/auth/reset_password.vue'),
    SuccessfulSignupView = require('vue!./components/auth/successful_registration.vue'),
    
    auth = require("./auth"),
    timeDisplay = require('vue!./components/main_components/time_display.vue'),
    showMessage = require('vue!./components/main_components/show_message.vue'),
    showMessageNew = require('vue!./components/main_components/show_message_new.vue'),
    asyncConfirm = require('vue!./components/main_components/async_confirm.vue'),

// client portal
    CarrierDashboardView = require('vue!./components/clients/management/carrier_dashboard.vue'),
    CarrierAccountView = require('vue!./components/clients/management/account.vue'),
    CarrierMessagesView = require('vue!./components/clients/management/messages.vue'),
    CarrierProductsView = require('vue!./components/clients/management/products.vue'),
    CarrierProductsIpsView = require('vue!./components/clients/management/productsIps.vue'),
    CarrierRateTableView = require('vue!./components/clients/management/rate_table.vue'),
    CarrierTrunksView = require('vue!./components/clients/management/trunks.vue'),
    CarrierTrunksProductsNewView = require('vue!./components/clients/management/trunks_products_new.vue'),
    CarrierTrunksProductsView = require('vue!./components/clients/management/trunks_products.vue'),
    CarrierTrunkRateView = require('vue!./components/clients/management/trunks_rates.vue'),
    CarrierTrunksIpsView = require('vue!./components/clients/management/trunks_ips.vue'),
    CarrierBalanceView = require('vue!./components/clients/billing/balance.vue'),
    CarrierInvoicesView = require('vue!./components/clients/billing/invoices.vue'),
    CarrierPaymentView = require('vue!./components/clients/billing/payment.vue'),
    CarrierOnlinePaymentView = require('vue!./components/clients/billing/online_payment.vue'),
    CarrierCdrsSearchView = require('vue!./components/clients/reports/cdrs_search.vue'),
    CarrierSummaryReportView = require('vue!./components/clients/reports/summary_report.vue'),
    CarrierSipPacketSearchView = require('vue!./components/clients/sip/sip_packet_search.vue'),

// agent portal
    AgentDashboardView = require('vue!./components/agents/management/agent_dashboard.vue'),
    AgentClientListView = require('vue!./components/agents/client/client_list.vue'),
    AgentClientPaymentView = require('vue!./components/agents/client/client_payment.vue'),
    AgentClientTransactionView = require('vue!./components/agents/client/client_transaction.vue'),
    AgentTrafficReportView = require('vue!./components/agents/statistics/traffic_report.vue'),
    AgentCdrsSearchView = require('vue!./components/agents/statistics/cdrs_search.vue'),
    AgentpcapSearchView = require('vue!./components/agents/statistics/pcap_search.vue'),
    AgentCommisionHistoryView = require('vue!./components/agents/statistics/commission_history.vue');


import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import MultiLanguage from './es6'
import language from './lang/language'

Vue.use(MultiLanguage, language);
Vue.use(ElementUI, { locale });
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.component('time-display', timeDisplay);
//Vue.component('show-message', showMessage);

function requireAuth(to, from, next) {
    console.log('routing:' + to.path);

    if (auth.loggedIn()) {
        if (to.path == '/auth/login') {
            if (auth.getType() == 'admin') {
                next('/statistics/dashboard');
            } else if (auth.getType() == 'client') {
                next('/clients/management/carrier_dashboard');
            } else if (auth.getType() == 'agent') {
                next('/agents/management/agent_dashboard');
            }
        } else if (to.path == '/') {
            if (auth.getType() == 'admin') {
                next('/statistics/dashboard');
            } else if (auth.getType() == 'client') {
                next('/clients/management/carrier_dashboard');
            } else if (auth.getType() == 'agent') {
                next('/agents/management/agent_dashboard');
            }
        } else {
            next();
        }
    } else {
        if (to.path == '/auth/login' ||
            to.path == '/auth/registration') { //TODO: forgot password, register, logout
            console.log('auth-free page: ' + to.path);
            next();
        } else {
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath }
            })
        }
    }
}

const router = new VueRouter({
    routes: [
        // { path: '/', redirect: '/statistics/dashboard' },
        // { path: '/clients', redirect: '/clients/management/carrier_dashboard' },
        // { path: '/agents', redirect: '/agents/management/agent_dashboard' },
        {
            path: '/logout',
            beforeEnter(to, from, next) {
                auth.logout();
                next('/auth/login')
            }
        },

        { path: '/auth/successful_registration', component: SuccessfulSignupView },
        { path: '/auth/reset_password', component: ResetPasswordView },
        { path: '/auth/login', component: LoginView },
        { path: '/auth/registration', component: RegistrationView },

        // client portal
        
        { path: '/clients/management/carrier_dashboard', component: CarrierDashboardView },
        { path: '/clients/management/account_summary', component: CarrierAccountView },
        { path: '/clients/management/messages', component: CarrierMessagesView },
        { path: '/clients/management/products', component: CarrierProductsView },
        { path: '/clients/management/products/ips/:id', component: CarrierProductsIpsView },
        { path: '/clients/management/rate_table', component: CarrierRateTableView },
        { path: '/clients/management/trunks', component: CarrierTrunksView },
        { path: '/clients/management/trunks/products/new', component: CarrierTrunksProductsNewView },
        { path: '/clients/management/trunks/products/:id', component: CarrierTrunksProductsView },
        { path: '/clients/management/trunks/products/:id/rate/:productid', component: CarrierTrunkRateView, props: true },
        { path: '/clients/management/trunks/ips/:id', component: CarrierTrunksIpsView },
        { path: '/clients/billing/balance', component: CarrierBalanceView },
        { path: '/clients/billing/invoices', component: CarrierInvoicesView},
        { path: '/clients/billing/payment', component: CarrierPaymentView},
        { path: '/clients/billing/online_payment', component: CarrierOnlinePaymentView},
        { path: '/clients/reports/cdrs_search', component: CarrierCdrsSearchView},
        { path: '/clients/reports/summary_report', component: CarrierSummaryReportView},
        { path: '/clients/sip/sip_packet_search', component: CarrierSipPacketSearchView},
        
        // agent portal
        { path: '/agents/management/agent_dashboard', component: AgentDashboardView },
        { path: '/agents/client/client_list', component: AgentClientListView },
        { path: '/agents/client/client_payment', component: AgentClientPaymentView },
        { path: '/agents/client/client_transaction', component: AgentClientTransactionView },
        { path: '/agents/statistics/traffic_report', component: AgentTrafficReportView },
        { path: '/agents/statistics/cdrs_search', component: AgentCdrsSearchView},
        { path: '/agents/statistics/pcap_search', component: AgentpcapSearchView},
        { path: '/agents/statistics/commission_history', component: AgentCommisionHistoryView},
    ]
});

router.beforeEach(requireAuth);
// router.beforeEach(requireAuth);

Vue.http.interceptors.push((request, next) => {
    if (auth.loggedIn()) {
        console.log("interceptors");
        request.headers.set('X-Auth-Token', auth.getToken());
    }
    next();
});

import store from './store/index.js'

new Vue({
    el: '#app',
    router,
    store,
    components: {
        navigator: navigator,
        overlay: Overlay,
        'app-message': showMessageNew,
        'async-confirm': asyncConfirm
    }
});
