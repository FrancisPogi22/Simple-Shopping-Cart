<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function cart($id)
    {
        $cart = Cart::select('carts.*', 'products.price', 'products.product_name', 'products.product_description')
            ->join('products', 'products.product_id', '=', 'carts.product_id')
            ->where('carts.user_id', $id)
            ->get();

        return response()->json($cart, 200);
    }

    public function addItemCart(Request $request)
    {
        Cart::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);

        return response(['Successfully Added.'], 201);
    }

    public function updateQuantityItem(Request $request, $id)
    {
    }

    public function checkOut($id)
    {
        $cart = Cart::where('user_id', $id)->delete();

        return response()->json($cart, 200);
    }
}
