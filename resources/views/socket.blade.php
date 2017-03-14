@extends('layouts.app')

@section('content')

    <div class="container" ng-controller="TestController as controller">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2" >
                <div id="messages" ></div>
            </div>
        </div>
    </div>
@endsection