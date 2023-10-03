<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Project/Index',[
            'projects' =>  Project::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('Project/Show', [
            'project' => $project,
            'tasks' => [
                'pendiente' => $project->tasks()->where('status', 'pendiente')->get(),
                'en_progreso' => $project->tasks()->where('status', 'en progreso')->get(),
                'completada' => $project->tasks()->where('status', 'completada')->get()
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request, $board)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($board)
    {
        //
    }
}