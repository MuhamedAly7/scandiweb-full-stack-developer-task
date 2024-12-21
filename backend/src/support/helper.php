<?php


if(!function_exists('base_path')) {
    function base_path() {
        return dirname(__DIR__) . '/../';
    }
}

if(!function_exists('config_path')) {
    function config_path() {
        return base_path() . 'src/config/';
    }
}

if(!function_exists('env')) {
    function env($key, $default = null) {
        return $_ENV[$key] ?? value($default);
    }
}

if(!function_exists('value')) {
    function value($value) {
        return ($value instanceof Closure) ? $value() : $value;
    }
}

if(!function_exists('class_basename'))
{
    function class_basename($class)
    {
        $class = is_object($class) ? get_class($class) : $class;
        return basename(str_replace('\\', '/', $class));
    }
}

if(!function_exists('getDatabaseDriver')) {
    function getDatabaseDriver() {
        return match(env('DB_DRIVER')) {
            'mysql' => new App\database\managers\MysqlManager,
            'default' => new App\database\managers\MysqlManager
        };
    }
}

if(!function_exists('DB'))
{
    function DB() : App\database\DB {
        static $instance = null;

        if(!$instance)
        {
            $instance = new App\database\DB(getDatabaseDriver());
            $instance->init();
        }
        return $instance;
    }
}

if(!function_exists('dump')) {
    function dump($value)
    {
        echo '<pre>';
        var_dump($value);
        echo '</pre>';
    }
}