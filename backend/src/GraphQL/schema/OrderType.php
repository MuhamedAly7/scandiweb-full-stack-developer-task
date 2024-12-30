<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Order',
            'fields' => [
                'order_details' => [
                    'type' => Type::nonNull(Type::listOf(new OrderDetailsType()))
                ],
            ]
        ];
        parent::__construct($config);
    }
}