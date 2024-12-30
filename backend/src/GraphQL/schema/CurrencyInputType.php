<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyInputType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'CurrencyInput',
            'fields' => [
                'label' => Type::nonNull(Type::string()),
                'symbol' => Type::nonNull(Type::string())
            ]
        ];
        parent::__construct($config);
    }
}