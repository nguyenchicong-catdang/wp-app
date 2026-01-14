<?php

namespace Wp\Categories;

use Corcel\Model\Taxonomy as CorcelTaxonomy;

class Category extends CorcelTaxonomy
{
    protected $connection = 'wordpress';
    // WordPress lưu category trong taxonomy tên là 'category'

    /**
     * Ghi đè để chỉ lấy các taxonomy là 'category'
     */
    protected $taxonomy = 'category';
}