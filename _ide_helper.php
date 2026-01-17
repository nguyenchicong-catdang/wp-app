<?php

/**
 * File này chỉ để VS Code nhận diện class Redis, không chạy thực tế.
 */
class Redis
{
    public function connect($host, $port = 6379, $timeout = 0.0) {}
    public function del($key) {}
    public function set($key, $value) {}
    public function get($key) {}
    // Thêm các hàm khác nếu bạn cần
}
