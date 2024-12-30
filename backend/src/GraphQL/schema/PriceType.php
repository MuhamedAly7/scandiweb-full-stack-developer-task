<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'PriceType',
            'fields' => [
                'amount' => Type::float(),
                'currency' => new CurrencyType(),
            ]
        ];

        parent::__construct($config);
    }
}