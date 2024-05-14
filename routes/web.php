<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Timer\TimerController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'tasks' => auth()->user()->tasks()->orderBy('start_time', 'desc')->get(),
        'projects' => auth()->user()->projects()->get(),
        'clients' => auth()->user()->clients()->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// /dashboard/timer
Route::get('/dashboard/timer', [TimerController::class, 'index'])->middleware(['auth', 'verified'])->name('timer');
Route::post('/api/timer/create', [TimerController::class, 'create'])->middleware(['auth', 'verified'])->name('timer.create');



// TODO : add route /dashboard/clients for clients
// TODO : add route /dashboard/projects for projects

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
