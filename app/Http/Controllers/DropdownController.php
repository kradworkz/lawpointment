<?php

namespace App\Http\Controllers;

use App\Models\Dropdown;
use Illuminate\Http\Request;
use App\Http\Requests\DropdownRequest;
use App\Http\Resources\DefaultResource;

class DropdownController extends Controller
{
    public function index(Request $request)
    {   
        $type = $request->post('type');
        $data = Dropdown::where('id','!=',1)->where('type',$type)->orderBy('id','ASC')->paginate(5);

        return DefaultResource::collection($data);
    }
    

    public function lists($type)
    {
        $data = Dropdown::where('id','!=',1)->where('type',$type)->orderBy('id','ASC')->get();

        return DefaultResource::collection($data);
    }

    public function pubs($type)
    {
        $data = Dropdown::where('type',$type)->orderBy('id','ASC')->get();

        return DefaultResource::collection($data);
    }
    
    
    public function store(DropdownRequest $request)
    {
        $data = ($request->input('status') == 'Update') ? Dropdown::findOrFail($request->input('id')) : new Dropdown;
        $data->name = ucwords($request->input('name'));
        $data->description= ($request->input('description') != null) ? $request->input('description') : 'n/a';
        $data->type = $request->input('type');
        $data->save();

        return new DefaultResource($data); 
    }

    public function search(Request $request)
    {
        $keyword = $request->input('word');
        $type = $request->input('type');
        
        $data = Dropdown::where('id','!=',1)->where('type',$type)->where('name','like','%'.$keyword.'%')->paginate(5);

        return DefaultResource::collection($data);
    }
}
