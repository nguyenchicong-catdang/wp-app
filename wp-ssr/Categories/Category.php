<?php

namespace Wp\Categories;

use Illuminate\Database\Eloquent\Builder;
use Corcel\Model\Taxonomy as CorcelTaxonomy;

class Category extends CorcelTaxonomy
{
    protected $connection = 'wordpress';
    // WordPress lưu category trong taxonomy tên là 'category'

    /**
     * Ghi đè để chỉ lấy các taxonomy là 'category'
     */
    protected $taxonomy = 'category';

    /**
     * Khai báo hằng số ID cần loại bỏ
     */
    protected const UNCATEGORIZED_TERM_ID = 1;

    /**
     * Hàm boot để tự động áp dụng filter cho mọi truy vấn
     */

    protected static function booted(): void
    {
        static::addGlobalScope('exclude_uncategorized', function(Builder $builder){
            // Tự động thêm: WHERE term_id != 1 vào mọi câu lệnh
            $builder->whereNot('term_id', self::UNCATEGORIZED_TERM_ID);
        });
    }
}