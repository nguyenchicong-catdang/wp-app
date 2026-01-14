<?php

namespace Wp\Posts;

use Wp\Posts\Resources\PostResource;

class PostController extends \App\Http\Controllers\Controller
{
    public function index($slug)
    {
        $post = Post::where('post_name', $slug)->firstOrFail();

        return response()->json([
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        ]);
    }

    public function show($slug, PostService $service)
    {
        $post = $service->show($slug);
        // Ép kiểu (object) để biến mảng thành stdClass
        $data = (object) PostResource::make($post)->resolve();
        // $data = PostResource::make($post)->resolve();
        return view('wp-posts::post', ['post' => $data]);
    }
}