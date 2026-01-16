<?php

use Illuminate\Support\Facades\Route;

// pages
Route::get('/', fn()=> view('wp-page::index'))->name('wp-index');

Route::get('/posts/{slug}', [\Wp\Posts\PostController::class, 'show'])->name('wp-post');

Route::get('/categories', [\Wp\Categories\CategoryController::class, 'index'])->name('wp-categories');

Route::get('/category/{slug}', [\Wp\Categories\CategoryController::class, 'show'])->name('wp-category');