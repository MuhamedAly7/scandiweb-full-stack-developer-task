<?php

namespace App\GraphQL\schema;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeOrderValueType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'AttributeValue',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::string())
                ],
                'value' => [
                    'type' => Type::nonNull(Type::string())
                ]
            ]
        ];
        parent::__construct($config);
    }
}