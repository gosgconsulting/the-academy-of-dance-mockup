<?php
/**
 * Plugin Name: AOD Pages Editor
 * Description: Admin plugin to list Vite pages and edit per-page content overrides (text/images) stored in WordPress. Exposes REST endpoints for public consumption.
 * Version: 0.1.0
 * Author: AOD
 */

if (!defined('ABSPATH')) {
  exit;
}

class AOD_Pages_Editor {
  const OPTION_PREFIX = 'aod_page_content_';
  const REST_NS = 'aod/v1';

  public function __construct() {
    // Admin menu
    add_action('admin_menu', [$this, 'register_admin_menu']);
    add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);

    // REST API
    add_action('rest_api_init', [$this, 'register_rest_routes']);

    // Handle CORS preflight early for our namespace
    add_action('init', function() {
      if (!isset($_SERVER['REQUEST_METHOD'])) return;
      if (strtoupper($_SERVER['REQUEST_METHOD']) !== 'OPTIONS') return;
      $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
      if (strpos($uri, '/wp-json/'. self::REST_NS .'/') === false) return;
      $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
      header('Access-Control-Allow-Origin: ' . $origin);
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      $reqHeaders = isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']) ? $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] : 'Content-Type, X-WP-Nonce';
      header('Access-Control-Allow-Headers: ' . $reqHeaders);
      header('Access-Control-Max-Age: 600');
      header('Vary: Origin');
      status_header(204);
      exit;
    }, 0);

    // CORS for our namespace
    add_filter('rest_send_cors_headers', [$this, 'send_cors_headers']);
    add_action('rest_api_init', function() {
      remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
      add_filter('rest_pre_serve_request', function($value) {
        // Allow GET from any origin for public read of page content
        if (isset($_SERVER['REQUEST_METHOD'])) {
          $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
          header('Access-Control-Allow-Origin: ' . $origin);
          header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
          $reqHeaders = isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']) ? $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] : 'Content-Type, X-WP-Nonce';
          header('Access-Control-Allow-Headers: ' . $reqHeaders);
          header('Access-Control-Max-Age: 600');
          header('Vary: Origin');
        }
        return $value;
      });
    }, 15);
  }

  public function register_admin_menu() {
    add_menu_page(
      'AOD Pages Editor',
      'AOD Pages',
      'manage_options',
      'aod-pages-editor',
      [$this, 'render_admin_page'],
      'dashicons-edit',
      30
    );
  }

  public function enqueue_admin_assets($hook) {
    if ($hook !== 'toplevel_page_aod-pages-editor') return;

    $base_url = plugins_url('', __FILE__);
    wp_enqueue_style('aod-editor-css', $base_url . '/admin/editor.css', [], '0.1.0');

    wp_enqueue_script('aod-editor-js', $base_url . '/admin/editor.js', ['jquery'], '0.1.0', true);
    wp_localize_script('aod-editor-js', 'AOD_CONFIG', [
      'restBase' => esc_url_raw(rest_url(self::REST_NS . '/')),
      'nonce' => wp_create_nonce('wp_rest'),
    ]);
  }

  public function render_admin_page() {
    echo '<div class="wrap"><h1>AOD Pages Editor</h1>';
    echo '<div id="aod-admin-root"></div>';
    echo '</div>';
  }

  private function pages_dir() {
    // Mounted by docker-compose: ./src -> /var/www/html/src (ro)
    return ABSPATH . 'src/pages';
  }

  private function list_pages() {
    // Manually defined list of available pages (title, slug, path)
    return [
      [ 'title' => 'Home',             'slug' => 'index',            'path' => '/' ],
      [ 'title' => 'Blog',             'slug' => 'blog',             'path' => '/blog' ],
      [ 'title' => 'Privacy Policy',   'slug' => 'privacy-policy',   'path' => '/privacy-policy' ],
      [ 'title' => 'Terms & Conditions','slug' => 'terms-conditions','path' => '/terms-conditions' ],
    ];
  }

  private function filename_to_slug($name) {
    if (!$name) return null;
    if ($name === 'Index') return 'index';
    // Convert PascalCase or camelCase to kebab-case
    $kebab = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $name));
    $kebab = str_replace('_', '-', $kebab);
    return $kebab;
  }

  private function slug_to_title($slug) {
    $parts = explode('-', $slug);
    $parts = array_map(function ($p) { return ucfirst($p); }, $parts);
    return implode(' ', $parts);
  }

  private function default_content_path($slug) {
    // Defaults are stored under this plugin's /defaults/{slug}.json
    return plugin_dir_path(__FILE__) . 'defaults/' . $slug . '.json';
  }

  private function load_default_content($slug) {
    $path = $this->default_content_path($slug);
    if (!file_exists($path)) {
      return [ 'text' => [], 'images' => [] ];
    }
    $raw = @file_get_contents($path);
    if ($raw === false) {
      return [ 'text' => [], 'images' => [] ];
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
      return [ 'text' => [], 'images' => [] ];
    }
    // Accept either { content: { text, images } } or { text, images }
    $c = (isset($data['content']) && is_array($data['content'])) ? $data['content'] : $data;
    $text = (isset($c['text']) && is_array($c['text'])) ? $c['text'] : [];
    $images = (isset($c['images']) && is_array($c['images'])) ? $c['images'] : [];
    return [ 'text' => $text, 'images' => $images ];
  }

  // Normalize sections by key prefix.
  // Any key starting with 'nav.' is moved to header; 'footer.' to footer; others to page.
  private function normalize_sections_by_prefix($header, $page, $footer) {
    $H = [ 'text' => [], 'images' => [] ];
    $P = [ 'text' => [], 'images' => [] ];
    $F = [ 'text' => [], 'images' => [] ];

    $assign = function($key, $val, &$destText, &$destImages, $isImage = false) {
      if ($isImage) {
        $destImages[$key] = $val;
      } else {
        $destText[$key] = $val;
      }
    };

    $rebucket = function($section) use (&$H, &$P, &$F, $assign) {
      $text = isset($section['text']) && is_array($section['text']) ? $section['text'] : [];
      $images = isset($section['images']) && is_array($section['images']) ? $section['images'] : [];
      foreach ($text as $k => $v) {
        if (strpos($k, 'nav.') === 0) {
          $assign($k, $v, $H['text'], $H['images'], false);
        } elseif (strpos($k, 'footer.') === 0) {
          $assign($k, $v, $F['text'], $F['images'], false);
        } else {
          $assign($k, $v, $P['text'], $P['images'], false);
        }
      }
      foreach ($images as $k => $v) {
        if (strpos($k, 'nav.') === 0) {
          $assign($k, $v, $H['text'], $H['images'], true);
        } elseif (strpos($k, 'footer.') === 0) {
          $assign($k, $v, $F['text'], $F['images'], true);
        } else {
          $assign($k, $v, $P['text'], $P['images'], true);
        }
      }
    };

    $rebucket($header);
    $rebucket($page);
    $rebucket($footer);

    return [ 'header' => $H, 'page' => $P, 'footer' => $F ];
  }

  public function register_rest_routes() {
    // Admin-only: list pages derived from filesystem
    register_rest_route(self::REST_NS, '/pages', [
      [
        'methods' => 'GET',
        'callback' => function($request) {
          if (!current_user_can('manage_options')) {
            return new WP_Error('forbidden', 'Forbidden', ['status' => 403]);
          }
          return rest_ensure_response($this->list_pages());
        },
        'permission_callback' => '__return_true',
      ],
    ]);

    // Public: get page content overrides
    register_rest_route(self::REST_NS, '/pages/(?P<slug>[a-z0-9\-]+)', [
      [
        'methods' => 'GET',
        'callback' => function($request) {
          $slug = sanitize_title($request['slug']);
          $opt = get_option(self::OPTION_PREFIX . $slug, '');
          $header = [ 'text' => [], 'images' => [] ];
          $page   = [ 'text' => [], 'images' => [] ];
          $footer = [ 'text' => [], 'images' => [] ];
          if (is_string($opt) && $opt !== '') {
            $decoded = json_decode($opt, true);
            if (is_array($decoded)) {
              // New structure support: { header:{}, page:{}, footer:{} }
              if (isset($decoded['header']) || isset($decoded['page']) || isset($decoded['footer'])) {
                foreach (['header','page','footer'] as $k) {
                  if (isset($decoded[$k]) && is_array($decoded[$k])) {
                    $sec = $decoded[$k];
                    $tx = (isset($sec['text']) && is_array($sec['text'])) ? $sec['text'] : [];
                    $im = (isset($sec['images']) && is_array($sec['images'])) ? $sec['images'] : [];
                    if ($k === 'header') $header = ['text'=>$tx,'images'=>$im];
                    if ($k === 'page')   $page   = ['text'=>$tx,'images'=>$im];
                    if ($k === 'footer') $footer = ['text'=>$tx,'images'=>$im];
                  }
                }
              } else {
                // Back-compat: { text, images } => treat as page
                $tx = isset($decoded['text']) && is_array($decoded['text']) ? $decoded['text'] : [];
                $im = isset($decoded['images']) && is_array($decoded['images']) ? $decoded['images'] : [];
                $page = ['text'=>$tx,'images'=>$im];
              }
            }
          }
          // Apply defaults to page if nothing saved
          $has_page = (count($page['text']) > 0) || (count($page['images']) > 0);
          if (!$has_page) {
            $defaults = $this->load_default_content($slug);
            $page = [ 'text' => $defaults['text'], 'images' => $defaults['images'] ];
          }
          // Enforce prefix-based bucketing (nav.* -> header, footer.* -> footer)
          $norm = $this->normalize_sections_by_prefix($header, $page, $footer);
          $header = $norm['header'];
          $page   = $norm['page'];
          $footer = $norm['footer'];
          // Merged content for frontend consumption
          $content = [
            'text' => array_merge($header['text'], $page['text'], $footer['text']),
            'images' => array_merge($header['images'], $page['images'], $footer['images'])
          ];
          return rest_ensure_response([
            'slug' => $slug,
            'title' => $this->slug_to_title($slug),
            'content' => $content, // merged
            'header' => $header,
            'page' => $page,
            'footer' => $footer,
          ]);
        },
        'permission_callback' => '__return_true',
      ],
      [
        'methods' => 'POST',
        'callback' => function($request) {
          if (!current_user_can('manage_options')) {
            return new WP_Error('forbidden', 'Forbidden', ['status' => 403]);
          }
          $slug = sanitize_title($request['slug']);
          $body = $request->get_body();
          $data = json_decode($body, true);
          if (!is_array($data)) {
            return new WP_Error('invalid_json', 'Invalid JSON', ['status' => 400]);
          }
          // Accept either new structure {header,page,footer} or legacy {text,images}
          $header = isset($data['header']) && is_array($data['header']) ? $data['header'] : null;
          $page   = isset($data['page']) && is_array($data['page']) ? $data['page'] : null;
          $footer = isset($data['footer']) && is_array($data['footer']) ? $data['footer'] : null;
          if ($header !== null || $page !== null || $footer !== null) {
            // Normalize each section
            $normalize = function($sec){
              $t = (isset($sec['text']) && is_array($sec['text'])) ? $sec['text'] : [];
              $i = (isset($sec['images']) && is_array($sec['images'])) ? $sec['images'] : [];
              return ['text'=>$t,'images'=>$i];
            };
            $header = $normalize($header ?? []);
            $page   = $normalize($page ?? []);
            $footer = $normalize($footer ?? []);
            // Enforce prefix-based bucketing regardless of provided section
            $norm = $this->normalize_sections_by_prefix($header, $page, $footer);
            $to_save = [ 'header' => $norm['header'], 'page' => $norm['page'], 'footer' => $norm['footer'] ];
            update_option(self::OPTION_PREFIX . $slug, wp_json_encode($to_save));
          } else {
            // Legacy body
            if (!isset($data['text'])) $data['text'] = [];
            if (!isset($data['images'])) $data['images'] = [];
            if (!is_array($data['text']) || !is_array($data['images'])) {
              return new WP_Error('invalid_schema', 'Expected { text: object, images: object }', ['status' => 400]);
            }
            // Route by prefix from legacy flat structure
            $norm = $this->normalize_sections_by_prefix(['text'=>[],'images'=>[]], ['text'=>$data['text'],'images'=>$data['images']], ['text'=>[],'images'=>[]]);
            $to_save = [ 'header' => $norm['header'], 'page' => $norm['page'], 'footer' => $norm['footer'] ];
            update_option(self::OPTION_PREFIX . $slug, wp_json_encode($to_save));
          }
          return rest_ensure_response(['success' => true]);
        },
        'permission_callback' => function() {
          return current_user_can('manage_options');
        },
      ],
    ]);
  }

  public function send_cors_headers($value) {
    // This runs for all REST responses; keep permissive for read
    if (isset($_SERVER['REQUEST_METHOD'])) {
      $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
      header('Access-Control-Allow-Origin: ' . $origin);
      header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
      $reqHeaders = isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']) ? $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] : 'Content-Type, X-WP-Nonce';
      header('Access-Control-Allow-Headers: ' . $reqHeaders);
      header('Access-Control-Max-Age: 600');
      header('Vary: Origin');
    }
    return $value;
  }
}

new AOD_Pages_Editor();
