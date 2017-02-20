<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use LRedis;
use Illuminate\Http\Request;

class SocketController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function index()
    {
        return view('socket');
    }

    public function writemessage()
    {
        return view('writemessage');
    }

    public function sendMessage(Request $request){
        $redis = LRedis::connection();
//        $redis->publish('message.1', $request->message);
        $redis->publish('message', $request->message);
        return redirect('writemessage');
    }
}
