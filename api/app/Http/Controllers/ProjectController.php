<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Project::all();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->role_id !== 1)  return response()->json(['message' => 'No autorizado']);
        $data = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($data->fails()) {
            return response()->json(['errors' => $data->messages()]);
        }
        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date
        ]);


        if ($project) {
            return response()->json(['message' => 'Creado correctamente']);
        }
        return response()->json(['message' => 'No se creo correctamente']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return [
            'project' => $project,
            'tasks' => [
                'pendiente' => $project->tasks()->where('status', 'pendiente')->get(),
                'en_progreso' => $project->tasks()->where('status', 'en progreso')->get(),
                'completada' => $project->tasks()->where('status', 'completada')->get()
            ]
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        if (auth()->user()->role_id !== 1)  return response()->json(['message' => 'No autorizado']);
        $data = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($data->fails()) {
            return response()->json(['errors' => $data->messages()]);
        }
        $project = Project::find($id);
        $project->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        if ($project) {
            return response()->json(['message' => 'actualizado correctamente']);
        }
        return response()->json(['message' => 'No se actualizo correctamente']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        if (auth()->user()->role_id !== 1)  return response()->json(['message' => 'No autorizado']);
        $project = Project::find($id);

        if ($project) {
            $project->delete();
            return response()->json(['message' => 'Proyecto eliminado correctamente']);
        }
        return response()->json(['message' => 'No se encontro el proyecto']);
    }
}
