<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/lawyers', 'PageController@publawyers');  
Route::get('/lawyer/{id}', 'PageController@publawyer');  

Route::middleware('auth')->group(function () {
   
    Route::get('/settings', 'PageController@settings');  
    Route::get('/myreports', 'PageController@myreports');  

});

Route::middleware(['role:Client','auth'])->group(function () {
   
    Route::get('/myappointments', 'PageController@pubappointments');  

}); 

Route::middleware(['role:Lawyer','auth'])->group(function () {
   
    Route::get('/appointments', 'PageController@lawyerappointments');  
    Route::get('/calendar', 'PageController@calendar');  

}); 



Route::middleware(['role:Administrator','auth'])->group(function () {

    Route::get('/reports', 'PageController@reports'); 
    Route::get('/dropdowns', 'PageController@dropdowns');  
    Route::get('/lawyers/list', 'PageController@lawyers');  
    Route::get('/appointments/list', 'PageController@appointments'); 
    Route::get('/clients', 'PageController@clients');  

}); 

Route::prefix('request')->group(function () {

    Route::post('/changepassword', 'UserController@password');

    Route::get('/dropdownpub/{type}', 'DropdownController@pubs');
    Route::get('/dropdown/{type}', 'DropdownController@lists');
    Route::post('/dropdowns', 'DropdownController@index');
    Route::post('/dropdowns/store', 'DropdownController@store');
    Route::post('/dropdown/search', 'DropdownController@search');
    
    Route::post('/user/availability', 'UserController@availability');
    Route::get('/users/{type}', 'UserController@index'); 
    Route::get('/userlaw', 'UserController@law'); 
    Route::get('/user/{id}', 'UserController@solo'); 
    Route::get('/user/list/{type}', 'UserController@list');
    Route::post('/user/store', 'UserController@store');
    Route::put('/user/store', 'UserController@store');
    Route::post('/user/search', 'UserController@search');
    Route::put('/user/status', 'UserController@status');
    Route::get('/clientss', 'UserController@clients');

    Route::post('/appointment/setatty', 'AppointmentController@setatty');
    Route::post('/appointment/set', 'AppointmentController@store');
    Route::post('/appointment/walkin', 'AppointmentController@storewalkin');
    Route::post('/appointment/search', 'AppointmentController@search');
    Route::get('/appointments/lists/{type}', 'AppointmentController@appointments');
    Route::get('/appointments/lawyer', 'AppointmentController@lawyerappointments');
    // Route::post('/appointment/status', 'AppointmentController@status');
    Route::post('/appointment/checkslot', 'AppointmentController@checkslot');
    Route::post('/appointment/lawyersearch', 'AppointmentController@lawyersearch');
    Route::get('/appointmentid/{id}', 'AppointmentController@getapp');
    
    Route::get('/appointment/history/{id}', 'LawyerController@history');
    Route::post('/appointment/note/add', 'LawyerController@note');
    Route::get('/appointment/notes/{id}', 'LawyerController@notes');
    Route::post('/appointment/file/add', 'LawyerController@file');
    Route::get('/appointment/files/{id}', 'LawyerController@files');
    Route::post('/app/refer', 'LawyerController@refer');
    Route::post('/appointment/status', 'LawyerController@status');

    Route::get('/emaill', 'AppointmentController@emaill');

    Route::get('/count', 'UserController@count');


    //Reports -------------------------------

    Route::post('insights', 'InsightController@index');
    Route::post('reports', 'InsightController@report');
    Route::post('reports2', 'InsightController@report2');


    //Calendar ------------------------------

    Route::get('events', 'CalendarController@index');
    Route::post('event/update', 'CalendarController@update');
    Route::post('event/store', 'CalendarController@store');
    Route::get('activities', 'CalendarController@activity');
    Route::post('activity/update', 'CalendarController@activityupdate');

    //Lawyer -------------------------------

    Route::post('/lawyer/search', 'LawyerController@search');


    //Client -------------------------------

    Route::get('/clients', 'ClientController@clients'); 
    Route::post('/client/store', 'ClientController@store');
    Route::put('/client/store', 'ClientController@store');
    Route::post('/client/search', 'ClientController@search');
    Route::post('/appointment/client/status', 'ClientController@status');
    Route::get('/appointments', 'ClientController@index'); 
    Route::get('/appointmentdi/{id}', 'ClientController@getapp'); 
    
    //Client -------------------------------

    Route::get('/notifications', 'NotificationController@index'); 
    Route::get('/notification/client', 'NotificationController@clients'); 
    Route::get('/notification/secretary', 'NotificationController@secretary');
    Route::post('/notification/update', 'NotificationController@status'); 

    // Route::post('/appointment/restatus', 'AppointmentController@restatus');
    // Route::post('/appointment/resched', 'AppointmentController@resched');
    // Route::post('/appointment/declined', 'AppointmentController@declined');

    Route::post('/myreports', 'ReportController@index');
    Route::post('/myreports/insights', 'ReportController@insights');
    Route::post('/myreportss', 'ReportController@reports');
});