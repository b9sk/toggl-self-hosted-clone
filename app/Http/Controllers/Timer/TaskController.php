<?php

namespace App\Http\Controllers\Timer;
use Inertia\Inertia;
use App\Models\Task;

class TaskController
{
    public function index()
    {
        if (request()->wantsJson()) {
            return response()->json(['test']);
        }

        return Inertia::render('Timer', [
            'tasks' => auth()->user()->tasks()->orderBy('start_time', 'desc')->get(),

            // 'tasks' => auth()->user()->tasks()->orderBy('start_time', 'desc')->get()->groupBy(function ($task) {
            //     return $task->start_time->format('Y-m-d');
            // }),
            // 'isRunning' => auth()->user()->isRunning(),
            // 'elapsed' => auth()->user()->elapsed(),
        ]);
    }

    public function store()
    {
        $taskRequest = request()->all();

        Task::updateOrCreate([
            'id' => $taskRequest['id'],
        ], $taskRequest);

        $task = Task::query()->find($taskRequest['id']);

        // FIXME replace the Inertia::render by axios on the frontend in Timer's form handler
        return Inertia::render('SuccessPage', [
            'data' => [
                'task' => $task,
            ]
        ]);
    }
}
