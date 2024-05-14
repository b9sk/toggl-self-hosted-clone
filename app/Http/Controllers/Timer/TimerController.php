<?php

namespace App\Http\Controllers\Timer;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TimerController
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

    public function create(Request $request)
    {
        return back()->with('success', 'Timer created successfully');
//        return response()->json(['test']);
    }
}
