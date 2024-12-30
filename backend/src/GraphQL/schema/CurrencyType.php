<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'CurrencyType',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ]
        ];
        parent::__construct($config);
    }
}