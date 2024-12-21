<?php

namespace App\GraphQL\resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function index(string $category = 'all') : array {
        return Product::productGetAll($category);
    }

    public static function getById(string $productId) : array {
        return Product::getByVal($productId);
    }
}