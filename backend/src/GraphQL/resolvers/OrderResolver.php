<?php

namespace App\GraphQL\resolvers;

use App\Models\Order;
use App\Models\Product;

class OrderResolver
{
    public static function storeOrder($args) : string {
        if(empty($args['order_details'])) {
            http_response_code(500);
            return json_encode(["errors" => ['message' => 'Order detials are required']]);
        }


        $total_amount = 0;
        foreach($args['order_details'] as $key => $orderUnit) {
            $product = Product::where(['id', '=', $orderUnit['id']]);
            
            if((!$product) || ($orderUnit['quantity'] <= 0) || (!$product[0]['inStock'])) {
                unset($args['order_details'][$key]);
                continue;
            }
            $total_amount += $orderUnit['prices']['amount'] * $orderUnit['quantity'];
        }


        if(empty($args['order_details'])) {
            http_response_code(500);
            return json_encode(["errors" => ['message' => 'Order is empty please try to order valid items']]);
        }

        Order::create(['order_details' => json_encode(array_values($args['order_details'])), 'total_amount' => $total_amount]);
        return json_encode(['message' => "success", "order" => array_values($args['order_details'])]);
    }

}
