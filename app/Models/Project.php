<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Project
 *
 * @property int $id
 * @property string $name
 * @property int|null $client_id
 *
 * @property Client|null $client
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class Project extends Model
{
	protected $table = 'projects';
	public $timestamps = true;

	protected $casts = [
		'client_id' => 'int'
	];

	protected $fillable = [
		'name',
		'client_id',
        'user_id'
	];

	public function client()
	{
		return $this->belongsTo(Client::class);
	}

    public function user()
    {
        return $this->belongsTo(User::class);
    }

	public function tasks()
	{
		return $this->hasMany(Task::class);
	}
}
