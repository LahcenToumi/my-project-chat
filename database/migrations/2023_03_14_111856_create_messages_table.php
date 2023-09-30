<?php

use App\Models\Chat;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(Chat::class)->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->text('message');
            // $table->text('code_msg')->unique();
            $table->enum('status_Message',['audio','video','text','document']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * enum
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
