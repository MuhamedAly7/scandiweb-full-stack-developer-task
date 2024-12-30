<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderAttributesType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'OrderAttributes',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf(new OrderItemsType())
            ]
        ];
        parent::__construct($config);
    }
}