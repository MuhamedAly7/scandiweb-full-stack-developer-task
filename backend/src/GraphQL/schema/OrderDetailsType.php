<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderDetailsType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'OrderDetails',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::string())
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string())
                ],
                'quantity' => [
                    'type' => Type::nonNull(Type::int())
                ],
                'prices' => [
                    'type' => Type::nonNull(new PriceInputType())
                ],
                'attributes' => [
                    'type' => Type::listOf(new OrderAttributesType())
                ]
            ]
        ];
        parent::__construct($config);
    }
}
