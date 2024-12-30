<?php

namespace App\GraphQL\schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class PriceInputType extends InputObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'PriceInput',
            'fields' => [
                'amount' => [
                    'type' => Type::nonNull(Type::float()),
                ],
                'currency' => [
                    'type' => Type::nonNull(new CurrencyInputType())
                ]
            ]
        ];
        parent::__construct($config);
    }
}