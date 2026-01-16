<?php
namespace Wp;

use Illuminate\Support\ServiceProvider;

class WpServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // routes wwp
        $this->loadRoutesFrom(__DIR__.'/routesWp.php');
        // page views
        $this->loadViewsFrom(__DIR__.'/pages', 'wp-page');
    }
}
