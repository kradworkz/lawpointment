@extends('layouts.backend')
@section('content')

<div class="card chat-card" style="height: 100%; width:100%; position:absolute; right:0; top:0;">
    <div class="card-header">
        <h5>Chat history</h5>
        <div class="card-header-right">
            <ul class="list-unstyled card-option">
                <li class="first-opt"><i class="feather icon-chevron-left open-card-option"></i></li>
                <li><i class="feather icon-maximize full-card"></i></li>
                <li><i class="feather icon-minus minimize-card"></i></li>
                <li><i class="feather icon-refresh-cw reload-card"></i></li>
                <li><i class="feather icon-trash close-card"></i></li>
                <li><i class="feather icon-chevron-left open-card-option"></i></li>
            </ul>
        </div>
    </div>
    <div class="card-block">
        <div class="row m-b-20 received-chat">
            <div class="col-auto p-r-0">
                <img src="../files/assets/images/avatar-2.jpg" alt="user image" class="img-radius img-40">
            </div>
            <div class="col">
                <div class="msg">
                    <p class="m-b-0">Nice to meet you!</p>
                </div>
                <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>10:20am</p>
            </div>
        </div>
        <div class="row m-b-20 send-chat">
            <div class="col">
                <div class="msg">
                    <p class="m-b-0">Nice to meet you!</p>
                </div>
                <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>10:20am</p>
            </div>
            <div class="col-auto p-l-0">
                <img src="../files/assets/images/avatar-3.jpg" alt="user image" class="img-radius img-40">
            </div>
        </div>
        <div class="row m-b-20 received-chat">
            <div class="col-auto p-r-0">
                <img src="../files/assets/images/avatar-2.jpg" alt="user image" class="img-radius img-40">
            </div>
            <div class="col">
                <div class="msg">
                    <p class="m-b-0">Nice to meet you!</p>
                    <img src="../files/assets/images/mega-menu/01.jpg" alt="">
                    <img src="../files/assets/images/mega-menu/03.jpg" alt="">
                </div>
                <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>10:20am</p>
            </div>
        </div>
        <div class="row m-b-20 send-chat">
            <div class="col">
                <div class="msg">
                    <p class="m-b-0">Come now to meet you!</p>
                </div>
                <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>10:20am</p>
            </div>
            <div class="col-auto p-l-0">
                <img src="../files/assets/images/avatar-3.jpg" alt="user image" class="img-radius img-40">
            </div>
        </div>
        <div class="row m-b-20 received-chat">
            <div class="col-auto p-r-0">
                <img src="../files/assets/images/avatar-2.jpg" alt="user image" class="img-radius img-40">
            </div>
            <div class="col">
                <div class="msg">
                    <p class="m-b-0">Nice to meet you!</p>
                    <img src="../files/assets/images/mega-menu/03.jpg" alt="">
                </div>
                <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>10:20am</p>
            </div>
        </div>
        <div class="right-icon-control">
            <div class="input-group input-group-button">
                <input type="text" class="form-control" placeholder="Send message">
                <div class="input-group-append">
                    <button class="btn btn-primary waves-effect waves-light" type="button"><i
                            class="feather icon-message-circle"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
