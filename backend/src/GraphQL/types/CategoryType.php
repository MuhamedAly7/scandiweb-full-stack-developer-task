<?php

namespace App\GraphQL\types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
            ]
        ];

        parent::__construct($config);
    }
}