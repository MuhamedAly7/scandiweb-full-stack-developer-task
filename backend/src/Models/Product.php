<?php 

namespace App\Models;

class Product extends Model
{
    public static function productGetAll(string $category = null): array {
        $products = [];
        if($category && $category !== 'all') {
            $products = self::where(['category', '=', $category]);
        } else {
            $products = self::all();
        }

        foreach($products as &$product) {
            self::fetchProductDetails($product);
        }

        return $products;
    }

    public static function getByVal(string $val, string $column = null) : array {
        $product = self::where([$column, '=', $val]);
        if($product) {
            self::fetchProductDetails($product);
        }
        return $product;
    }

    private static function fetchProductDetails(&$product) {
        $galleryData = json_decode($product['gallery'], true);
        $product['gallery'] = ($galleryData != null && is_array($galleryData)) ? $galleryData : [];
        $product['prices'] = Price::where(['product_id', '=', $product['id']]);
        $currency = Currency::where(['label', '=', $product['prices'][0]['currency']]);
        $product['prices'][0]['currency'] = $currency[0];
        $productItems  = Item::where(['product_id', '=', $product['id']]);
        $attributesIDs = array_unique(array_column($productItems, 'attribute_id'));
        
        $attributes = [];
        foreach($attributesIDs as $attrId) {
            $attr = Attribute::where(['id', '=', $attrId]);
            array_push($attributes, $attr); 
        }


        foreach ($attributes as &$attributeGroup) {
            foreach ($attributeGroup as &$attribute) {
                // Filter $productItems based on attribute_id
                $attribute['items'] = array_map(function ($item) {
                    unset($item['attribute_id']);
                    unset($item['product_id']);
                    return $item;
                }, array_filter($productItems, function ($item) use ($attribute) {
                    return $item['attribute_id'] === $attribute['id'];
                }));
            }
        }
        $attributes = self::flattenArray($attributes);
        // dump($attributes);
        $product['attributes'] = $attributes;
        $product['inStock'] = (bool)$product['inStock'];
    }

    private static function flattenArray($array) {
        $result = [];
        
        foreach ($array as $value) {
            if (is_array($value)) {
                $result = array_merge($result, $value);
            } else {
                $result[] = $value;
            }
        }
        
        return $result;
    }
}