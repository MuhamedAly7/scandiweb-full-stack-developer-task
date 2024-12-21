<?php

namespace App\Models;

use App\support\Str;

abstract class Model
{
    protected static $instance;
    protected static $table;
    
    public static function create(array $attributes) {
        self::$instance = static::class;
        return DB()->create($attributes);
    }

    public static function all() {
        self::$instance = static::class;
        return DB()->read();
    }

    public static function delete($filter) {
        self::$instance = static::class;
        return DB()->delete($filter);
    }

    public static function update(array $attributes, $filter) {
        self::$instance = static::class;
        return DB()->update($attributes, $filter);
    }

    public static function where($filter, $columns = "*") {
        self::$instance = static::class;
        return DB()->read($columns, $filter);
    }

    public static function getModel()
    {   
        return self::$instance;
    } 

    public static function getTableName()
    {   
        return Str::lower(Str::plural(class_basename(self::$instance)));
    }   
}