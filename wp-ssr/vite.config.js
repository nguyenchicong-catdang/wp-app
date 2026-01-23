import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    root: "./",
    plugins: [
        laravel({
            // input: ["main.scss", "main.js"],
            input: ["main.js"],
            refresh: true,
            // Ép Vite tạo file 'hot' ở thư mục public gốc của Laravel
            hotFile: "../public/hot",
            buildDirectory: "./../../public/vite-ssr-dist",
       }),
    ],
    // Quan trọng: Chỉ định thư mục public của Laravel gốc
    publicDir: "../public",
    // Tránh để outDir nằm trong publicDir nếu có thể
    build: {
        emptyOutDir: true, // Tự động xóa file cũ dù nằm ngoài root
    },
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
