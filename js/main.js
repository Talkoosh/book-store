import { router } from "./router.js";
import appHeader from "./cmps/app-header.js";
import userMsg from "./cmps/user-msg.js";

const options = {
    template: `
        <section>
            <user-msg />
            <app-header />
           <router-view />
        </section>
    `,
    components: {
        appHeader,
        userMsg
    }
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');

