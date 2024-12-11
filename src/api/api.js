import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.33:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function get(route) {
    return api.get(route).then(res => res.data);
}

export function post(route, obj) {
    return api.post(route, obj);
}

export function put(route, obj) {
    return api.put(route, obj);
}

export function del(route) {
    return api.delete(route);
}

export const listRoutes = {
    bonusPoints: '/bonus-points',
    dish: '/dishes',
    event: '/events',
    feedback: '/feedbacks',
    hall: '/halls',
    payment: '/payments',
    promotion: '/promotions',
    receipt: '/receipts',
    reservation: '/reservations',
    table: '/tables',
}

export const routes = {
    aboutPage: '/about-page',
}