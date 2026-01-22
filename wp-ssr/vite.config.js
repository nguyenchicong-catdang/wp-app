import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ["scss/main.scss", "js/main.js"],
            refresh: true,
            // Ép Vite tạo file 'hot' ở thư mục public gốc của Laravel
            hotFile: "../public/hot",
            buildDirectory: "vite-ssr-dist",
        }),
    ],
    // Quan trọng: Chỉ định thư mục public của Laravel gốc
    publicDir: "../public",
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
