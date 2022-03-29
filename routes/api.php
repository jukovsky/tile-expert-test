<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/page', [PageController::class, 'all']);
Route::get('/page/{folder}', [PageController::class, 'folder']);
Route::post('/page', [PageController::class, 'parse']);
Route::delete('/page/{folder}', [PageController::class, 'clear']);
