import homePage from './views/homepage.js';
import bookApp from './views/book-app.js';
import bookDetails from './views/book-details.js';
import about from './views/about.js';
import aboutMe from './cmps/about-me.js';
import aboutProject from './cmps/about-project.js';

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
    {
        path: '/about',
        component: about,
        children: [
            {
                path: 'me',
                component: aboutMe
            },
            {
                path: 'project',
                component: aboutProject
            }
        ]
    }
];

export const router = VueRouter.createRouter({
    routes, 
    history: VueRouter.createWebHashHistory()
});