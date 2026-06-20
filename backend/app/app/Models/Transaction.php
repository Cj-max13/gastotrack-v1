<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'merchant',
        'description',
        'type',
        'source',
        'transaction_date',
    ];

    public function user() {
        return $this->belongsTo(User::class);

    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

}