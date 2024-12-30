<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'AttributeType',
            'fields' => [
                'id' => Type::string(),
                // 'attribute_id' => Type::string(),
                "display_value" => Type::string(),
                'value' => Type::string(),

            ]
        ];
        parent::__construct($config);
    }
}