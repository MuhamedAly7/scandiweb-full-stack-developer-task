<?php

namespace App\database\managers\contract;

interface DatabaseManager
{
    public function connect(): \PDO;
    public function query(string $query, $values = []);
    public function create($data);
    public function read($columns = "*", $filter);
    public function update($attributes, $filter);
    public function delete($filter);
}