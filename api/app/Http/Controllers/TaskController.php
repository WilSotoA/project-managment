<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::all();
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
            'status' => 'required|string|in:pendiente,en progreso,completada',
            'project_id' => 'required|integer|exists:projects,id',
        ]);

        if ($data->fails()) {
            return response()->json(['errors' => $data->messages()]);
        }
        $project = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'project_id' => $request->project_id
        ]);


        if ($project) {
            return response()->json(['message' => 'Creado correctamente']);
        }
        return response()->json(['message' => 'No se creo correctamente']);
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
            'status' => 'required|string|in:pendiente,en progreso,completada',
        ]);

        if ($data->fails()) {
            return response()->json(['errors' => $data->messages()]);
        }
        $task = Task::find($id);
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        if ($task) {
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
        $task = Task::find($id);

        if ($task) {
            $task->delete();
            return response()->json(['message' => 'Tarea eliminada correctamente']);
        }
        return response()->json(['message' => 'No se encontro la tarea']);
    }
}
