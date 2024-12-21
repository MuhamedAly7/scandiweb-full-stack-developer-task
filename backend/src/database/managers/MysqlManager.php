<?php

namespace App\database\managers;

use App\database\grammers\MysqlGrammar;
use App\database\managers\contract\DatabaseManager;
use App\Models\Model;
use PDO;

class MysqlManager implements DatabaseManager
{
    public static $instance;

    public function connect() : PDO {
        $db_config = include config_path() . 'database.php';
        if(!self::$instance) {
            self::$instance = new PDO(env("DB_DRIVER") . ":host=" . $db_config['host'] . ";dbname=" . $db_config["db_name"], $db_config['username'], $db_config['password']);
        }
        return self::$instance;
    }

    public function query(string $query, $values = [])
    {
        $stat = self::$instance->prepare($query);
        for($i = 1; $i <= count($values); $i++) {
            $stat->bindValue($i, $values[$i - 1]);
        }
        $stat->execute();
        return $stat->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = MysqlGrammar::buildInsertQuery(array_keys($data));

        $stat = self::$instance->prepare($query);

        for($i = 1; $i <= count($values = array_values($data)); $i++)
        {
            $stat->bindValue($i, $values[$i-1]);
        }

        return $stat->execute();
    }

    public function read($columns = "*", $filter)
    {
        $query = MysqlGrammar::buildSelectQuery($columns, $filter);
        $stat = self::$instance->prepare($query);
        if($filter)
        {
            $stat->bindValue(1, $filter[2]);
        }
        $stat->execute();
        return $stat->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($attributes, $filter)
    {
        $query = MysqlGrammar::buildUpdateQuery(array_keys($attributes), $filter);
        $stat = self::$instance->prepare($query);
        for($i = 1; $i <= count($values = array_values($attributes)); $i++)
        {
            $stat->bindValue($i, $values[$i -1]);
            if($i == count($attributes))
            {
                if($filter)
                {
                    $stat->bindValue($i + 1 , $filter[2]);
                }
            }
        }
        return $stat->execute();
    }

    public function delete($filter)
    {
        $query = MySQLGrammar::buildDeleteQuery($filter);
        $stat = self::$instance->prepare($query);
        $stat->bindValue(1, $filter[2]);
        return $stat->execute();
    }
}
