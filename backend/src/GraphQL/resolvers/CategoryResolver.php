<?php

namespace App\GraphQL\resolvers;

use App\Models\Category;

class CategoryResolver
{
    public static function getAll() {
        return Category::all();
    }
}