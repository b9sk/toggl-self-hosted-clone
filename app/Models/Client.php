<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Client
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 *
 * @property User $user
 * @property Collection|Project[] $projects
 *
 * @package App\Models
 */
class Client extends Model
{
	protected $table = 'clients';
	public $timestamps = true;

	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'name'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function projects()
	{
		return $this->hasMany(Project::class);
	}
}
