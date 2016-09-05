#!/usr/bin/env php
<?php
/* Shutdown Script
 *
 * If idle times exceed a defined value or if no users are logged in,
 * shutdown the computer. If running from cron there should be no "dot"
 * in the script file name. Make the script executable.
 *
 * Caveat: running the script as root in an interactive shell will cause
 * immediate shutdown, as though typing 'shutdown -P now'.
 * (It should only be run from cron.)
 */
$max_idle_time = 3600; // seconds
$cmd_idle_time = 'w|tr -s " "|cut -d " " -f 5|tail -n +3'; // idle times
$shutdown_now = true; // boolean

function shutdown() {
    //exec('/sbin/shutdown -P now'); // or -h
    exec('echo `date`" -- run shutdown" >> /tmp/autoshutdown.out');
}

// Form an array from the output of $cmd_idle_time
$idle_times = explode("\n", shell_exec($cmd_idle_time));

foreach ($idle_times as $idle_time) {
    // Are there no users logged on, or did root run this from a shell?
    if (empty($idle_time)) {
        exec('echo `date`" -- check idle: empty" >> /tmp/autoshutdown.out');
        continue;
    }

    exec('echo `date`" -- check idle: not empty and idle is '.$idle_time.'" >> /tmp/autoshutdown.out');
    // Remove trailing "s" from idle time and round to nearest second
    $idle_time = round(substr($idle_time, 0 , -2));

    // Cancel shutdown if any user's idle time is less than $max_idle_time
    if ($idle_time < $max_idle_time) {
        $shutdown_now = false;
    }
}

// If the $shutdown_now boolean is still true, shutdown.
if ($shutdown_now === true) {
    shutdown();
}
?>
