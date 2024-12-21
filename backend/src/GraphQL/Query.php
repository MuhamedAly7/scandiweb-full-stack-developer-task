<?php

namespace App\GraphQL;

use App\GraphQL\resolvers\CategoryResolver;
use App\GraphQL\resolvers\ProductsResolver;
use App\GraphQL\types\CategoryType;
use App\GraphQL\types\ProductType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Query
{
    public static function defineQueries() {
        $productType = new ProductType();
        return new ObjectType([
            'name' => 'Query',
                'fields' => [
                    'echo' => [
                        'type' => Type::string(),
                        'args' => [
                            'message' => ['type' => Type::string()],
                        ],
                        'resolve' => static fn ($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                    ],
                    'categories' => [
                        'type' => Type::listOf(new CategoryType()),
                        'resolve' => static fn () => CategoryResolver::getAll()
                    ],
                    'products' => [
                        'type' => Type::listOf($productType),
                        'args' => [
                            'category' => [
                                'type' => Type::string()
                            ],
                        ],
                        'resolve' => static fn ($rootValue, $args) => ProductsResolver::index($args['category'] ?? null)

                    ],
                    'product' => [
                        'type' => $productType,
                        'args' => [
                            'id' => [
                                'type' => Type::nonNull(Type::string())
                            ]
                        ],
                        'resolve' => static fn ($rootValue, $args) => ProductsResolver::showProduct($args['id'])
                    ]
                ]
        ]);
    }
}