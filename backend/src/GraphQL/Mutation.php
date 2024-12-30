<?php

namespace App\GraphQL;

use App\GraphQL\resolvers\OrderResolver;
use App\GraphQL\schema\OrderType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Mutation
{
    public static function defineMutations() {
        return new ObjectType([
            'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                    'insertOrder' => [
                        'type' => Type::string(),
                        'args' => [
                            'order' => [
                                'type' => Type::nonNull(new OrderType())
                            ],
                        ],
                        'resolve' => static fn ($rootValue, array $args):string => OrderResolver::storeOrder($args['order']),
                    ],
                ],
        ]);
    }
}