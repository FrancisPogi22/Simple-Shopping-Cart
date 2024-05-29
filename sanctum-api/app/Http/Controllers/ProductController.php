<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function products()
    {
        $products = Product::all();

        return response()->json($products, 200);
    }

    public function showProduct(Request $request, $id)
    {
        return response(['Show Product'], 201);
    }

    public function addProduct(Request $request)
    {
        $request->validate(
            [
                'user_id' => 'required',
                'productName' => 'required',
                'productDescription' => 'required',
                'productQuantity' => 'required',
                'price' => 'required',
            ]
        );

        Product::create([
            'user_id' => $request->user_id,
            'product_name' => $request->productName,
            'product_description' => $request->productDescription,
            'quantity' => $request->productQuantity,
            'price' => $request->price
        ]);

        return response(['message' => 'Product Added Successfully'], 201);
    }

    public function editProduct(Request $request)
    {
        return response(['Edit Product'], 201);
    }

    public function removeProduct(Request $request)
    {
        return response(['Remove Product'], 201);
    }

    public function filterLowPrice()
    {
        $products = Product::orderBy('price', 'asc')->get();
        
        return response()->json($products,200);
    }

    public function filterHighPrice()
    {
        $products = Product::orderBy('price', 'desc')->get();
        
        return response()->json($products,200);
    }
}
