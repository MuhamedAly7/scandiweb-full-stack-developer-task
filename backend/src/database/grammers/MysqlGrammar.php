<?php

namespace App\database\grammers;

use App\Models\Model;

class MysqlGrammar
{
    public static function buildInsertQuery($keys) {
        $values = '';
        for($i = 1; $i <= count($keys); $i++)
        {
            $values .= '?';
            if($i < count($keys))
            {
                $values .= ', ';
            }
        }
        
        $query = "INSERT INTO " . Model::getTableName() . " (`" . implode("`, `", $keys) . "`) VALUES(" . $values . ')';

        return $query;
    }

    public static function buildSelectQuery($columns = '*', array $filter = null)
    {
        if(is_array($columns))
        {
            $columns = implode(', ', $columns);
        }

        $query = "SELECT {$columns} FROM " . Model::getTableName();

        if($filter)
        {
            // $filter[0] -----> meant the column's name
            // $filter[1] -----> meant the logical operation like =|>|< etc.
            // $filter[2] -----> should be the value of filter will be bined in manager
            $query .= " WHERE {$filter[0]} {$filter[1]} ?";
        }

        return $query;
    }

    public static function buildDeleteQuery(array $filter)
    {
        if((count($filter) == 3))
        {
            if(!empty($filter[0]) && !empty($filter[1]) && !empty($filter[2]))
            {
                return 'DELETE FROM ' . Model::getTableName() . " WHERE {$filter[0]} {$filter[1]} ?";
            }
        }
    }

    public static function buildUpdateQuery($keys, $filter)
    {
        $query = 'UPDATE ' . Model::getTableName() . ' SET ';

        foreach($keys as $key)
        {
            $query .= "{$key} = ?, ";
        }
        $query = rtrim($query, ", ") . " WHERE {$filter[0]} $filter[1] ?";

        return $query;
    }

    public static function buildDeleteInQuery($column, array $data)
    {
        if(!empty($data))
        {
            $query =  "DELETE FROM " . Model::getTableName() . " WHERE {$column} IN (";
            $values = '';
            for($i = 1; $i <= count($data); $i++)
            {
                $values .= '?';
                if($i < count($data))
                {
                    $values .= ", ";
                }
            }
            $query .= $values . ")";
            return $query;
        }
    }


}