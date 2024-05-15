<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Task
 *
 * @property int $id
 * @property int|null $project_id
 * @property Carbon|null $start_time
 * @property Carbon|null $end_time
 *
 * @property Project|null $project
 *
 * @package App\Models
 */
class Task extends Model
{
	protected $table = 'tasks';
	public $timestamps = true;
    protected $keyType = 'string';

	protected $casts = [
		'project_id' => 'int',
		'start_time' => 'datetime',
		'end_time' => 'datetime'
	];

	protected $fillable = [
		'project_id',
		'start_time',
		'end_time',
        'text',
        'user_id'
	];

	public function project()
	{
		return $this->belongsTo(Project::class);
	}

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
