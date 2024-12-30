<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemsType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'OrderItems',
            'fields' => [
                'id' => Type::string(),
                'value' => Type::string(),
                'display_value' => Type::string(),
                'selected' => Type::boolean()
            ]
        ];
        parent::__construct($config);
    }
}