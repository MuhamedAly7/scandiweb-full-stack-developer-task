<?php

namespace App\database\concerns;

use App\database\managers\contract\DatabaseManager;

trait ConnectTo
{
    public static function connect(DatabaseManager $manager) {
        return $manager->connect();
    }
}