<?php

namespace App\GraphQL\resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function index(string $category = 'all') : array {
        return Product::productGetAll($category);
    }

    public static function showProduct(string $productId) : array {
        return Product::getById($productId)[0];
    }
}