import homePage from './views/homepage.js';
import bookApp from './views/book-app.js';
import bookDetails from './views/book-details.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = VueRouter.createRouter({
    routes, 
    history: VueRouter.createWebHashHistory()
});