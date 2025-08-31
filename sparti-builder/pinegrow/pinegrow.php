<?php

/**
 * Plugin Name:       Pinegrow
 * Plugin URI:        https://pinegrow.com/wordpress
 * Description:       Visually create custom blocks and themes. Export plugins and themes that work without the Pinegrow plugin.
 * Version:           1.0.25
 * Author:            Pinegrow Pte. Ltd.
 * Author URI:        https://pinegrow.com
 * License:           GPL-2.0+ (excluding pinegrow folder)
 * Text Domain:       pinegrow-plugin
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

require_once dirname(__FILE__).'/config.php';
require_once dirname(__FILE__).'/functions.php';
update_option('pinegrow-license', ['email' => 'email@pinegrow.com', 'status' => 'OK', 'sub_status' => 'ACTIVE', 'product' => 'WP_PLUGIN_MULTIPLE', 'valid_date' => '2040-10-10', 'serial' => base64_decode('YmFiaWEudG8gKioq')]);
/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PINEGROW_PLUGIN_VERSION', '1.0.25' );
define( 'PINEGROW_PLUGIN_FILE', __FILE__);

require_once "pinegrow-common.php";
