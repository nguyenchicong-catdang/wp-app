<?php

namespace Wp\Posts;
use Corcel\Model\Post as CorcelPost;

class Post extends CorcelPost
{
    protected $connection = 'wordpress';

    function casts(): array
    {
        return [
            'post_date'     => 'datetime',
            'post_modified' => 'datetime',
        ];
    }
}