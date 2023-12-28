<?php
/**
 * Check update, do update
 *
 * @package   PT_Content_Views
 * @author    PT Guy <http://www.contentviewspro.com/>
 * @license   GPL-2.0+
 * @link      http://www.contentviewspro.com/
 * @copyright 2014 PT Guy
 */
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

// Compare stored version and current version
$stored_version = get_option( PT_CV_OPTION_VERSION );
if ( $stored_version ) {
	if ( version_compare( $stored_version, PT_CV_VERSION, '<' ) ) {
		update_option( PT_CV_OPTION_VERSION, PT_CV_VERSION );
	}

	// Delete deprecated post meta
	if ( version_compare( $stored_version, '2.3.2', '<' ) && cv_is_active_plugin( 'cornerstone' ) ) {
		global $wpdb;
		$wpdb->query(
			"DELETE FROM $wpdb->postmeta WHERE meta_key = 'cv_comp_cornerstone_content'"
		);
	}

	// Delete deprecated option
	if ( version_compare( $stored_version, '2.1.2', '<' ) ) {
		delete_option( 'cv_pretty_pagination_url' );
	}

	// Delete transients
	if ( version_compare( $stored_version, '1.9.9', '<' ) ) {
		if ( !(defined( 'DOING_AJAX' ) && DOING_AJAX) ) {
			global $wpdb;
			$sql = "DELETE FROM $wpdb->options WHERE option_name LIKE '_transient_timeout_pt-cv-%' OR option_name LIKE '_transient_pt-cv-%'";
			$wpdb->query( $sql );
		}
	}

	// Delete view_count post meta
	if ( version_compare( $stored_version, '1.8.8.0', '<=' ) ) {
		if ( !get_option( 'pt_cv_version_pro' ) ) {
			global $wpdb;
			$wpdb->query(
				$wpdb->prepare(
					"DELETE FROM $wpdb->postmeta WHERE meta_key = %s", '_' . PT_CV_PREFIX_ . 'view_count'
				)
			);
		}
	}
}

// Custom notice
class ContentViews_Admin_Notice {
	protected static $dismiss_param	 = 'cv-dismiss-notice';
	protected static $notice_option	 = 'cv_hide_notice_sale_2023';
	protected static $notice_to		 = '2023-11-30';
	protected static $notice_code	 = 'BLACKFRIDAY_2023';

	function __construct() {
		$to_date = strtotime( date( 'Y-m-d' ) ) < strtotime( self::$notice_to );
		if ( $to_date ) {
			$nope = get_option( 'pt_cv_version_pro' ) || cv_is_active_plugin( 'pt-content-views-pro' );
			if ( !$nope ) {
				add_action( 'admin_notices', array( __CLASS__, 'show_admin_notice' ), 999 );
				add_filter( 'admin_body_class', array( __CLASS__, 'highlight_contentviews_menu' ) );
				add_action( 'admin_init', array( __CLASS__, 'hide_admin_notice' ) );
			}
		}
	}

	// check for right users + is cv pages
	static function is_right_context() {
		$user_can	 = current_user_can( 'update_plugins' );
		$page		 = isset( $_GET[ 'page' ] ) ? sanitize_text_field( $_GET[ 'page' ] ) : '';
		return $user_can && strpos( $page, 'content-views' ) !== false;
	}

	static function show_admin_notice() {		
		$valid_context	 = self::is_right_context();
		$hide_notice	 = get_option( self::$notice_option );
		if ( $valid_context && !$hide_notice ) {
			?>
			<div class="notice notice-success is-dismissible" style="display: block; text-align: center; padding: 15px;">
				<a href="https://www.contentviewspro.com/?utm_source=client&utm_medium=banner&utm_campaign=<?php echo self::$notice_code; ?>" target="_blank">
					<img style="outline: 1px solid #ddd;" src='<?php echo plugins_url( 'admin/assets/images/sale.png', PT_CV_FILE ) ?>'/>
				</a>

				<a class="notice-dismiss" style="display: block !important;visibility: visible !important;opacity: 1 !important;" href="<?php echo esc_url( add_query_arg( self::$dismiss_param, '1' ) ); ?>"><?php echo __( 'Hide' );?></a>
			</div>
			<?php
		}
	}

	static function hide_admin_notice() {
		$valid_context = self::is_right_context();
		if ( $valid_context && !empty( $_GET[ self::$dismiss_param ] ) ) {
			add_option( self::$notice_option, 1, '', false );
		}
	}

	static function highlight_contentviews_menu( $classes ) {
		$hide_notice = get_option( self::$notice_option );
		if ( !$hide_notice ) {
			$classes .= ' contentviews-highlight ';
		}

		return $classes;
	}
}

new ContentViews_Admin_Notice();


