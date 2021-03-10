<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'email' => 'laicaalavar20@gmail.com',
            // 'email' => 'admin@law.com',
            'password' => bcrypt('123456'),
            'type' => 'Administrator',
            'status' => 'Active',
            'created_at' => now(),
            'updated_at' => now(),
            'email_verified_at' => now(),
        ]);

        DB::table('profiles')->insert([
            'firstname' => 'Laica',
            'lastname' => 'Alvarez',
            'gender' => 'Female',
            'birthday' => '2000-01-01',
            'avatar' => 'avatar.jpg',
            'user_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('dropdowns')->insert([
            'name' => 'No Legal Practice',
            'type' => 'Legal Practice',
            'description' => 'A Secretary will choose a lawyer for you.',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
