<?php

namespace App\GraphQL\types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf(new AttributeType()),
            ]
        ];

        parent::__construct($config);
    }
}