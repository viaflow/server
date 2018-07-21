-- ----------------------------
-- Table structure for `temp_data`
-- ----------------------------
DROP TABLE IF EXISTS `temp_data`;
CREATE TABLE `temp_data` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_data
-- ----------------------------
INSERT INTO `temp_data` VALUES ('1');


CREATE TABLE IF NOT EXISTS `cronflow` (
  `cronflow_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cronflow_name` longtext NOT NULL,
  `cronflow_tags` longtext,
  `trigger_type` char(24) NOT NULL DEFAULT '',
  `cronflow_cron` varchar(255) DEFAULT NULL,
  `cronflow_timezone` char(255) DEFAULT NULL,
  `cronflow_nodes` int(11) NOT NULL DEFAULT '0',
  `cronflow_state` char(24) NOT NULL DEFAULT 'ACTIVE',
  `cronflow_triggered` int(11) NOT NULL DEFAULT '0',
  `cronflow_desc` longtext,
  `latest_date` datetime DEFAULT NULL,
  `latest_status` char(255) DEFAULT NULL,
  `next_date` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `created_user` int(11) NOT NULL,
  `updated_date` datetime NOT NULL,
  `updated_user` int(11) NOT NULL,
  PRIMARY KEY (`cronflow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cronflow_node` (
  `node_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `flow_id` int(11) NOT NULL,
  `plugin_id` int(11) NOT NULL,
  `is_entry` tinyint(1) NOT NULL DEFAULT '0',
  `parallel_level` int(11) NOT NULL,
  `node_config` longtext,
  `node_sequence` int(11) NOT NULL,
  `node_privacy` char(24) NOT NULL DEFAULT 'private',
  `execute_hash` char(36) NOT NULL DEFAULT '',
  `created_date` datetime NOT NULL,
  `created_user` int(11) NOT NULL,
  `updated_date` datetime NOT NULL,
  `updated_user` int(11) NOT NULL,
  PRIMARY KEY (`node_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cronflow_plugin` (
  `plugin_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plugin_tag` longtext,
  `plugin_name` char(255) NOT NULL DEFAULT '',
  `plugin_md` longtext,
  `plugin_available` char(24) DEFAULT NULL,
  `plugin_path` longtext NOT NULL,
  `plugin_main` char(255) NOT NULL DEFAULT 'index.js',
  `plugin_author` text NOT NULL,
  `plugin_version` char(255) NOT NULL DEFAULT '1.0.0',
  `latest_version` char(255) NOT NULL DEFAULT '',
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`plugin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cronflow_secret` (
  `secret_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `target_flow` char(255) NOT NULL DEFAULT 'all',
  `secret_key` char(255) NOT NULL DEFAULT '',
  `secret_value` longtext NOT NULL,
  PRIMARY KEY (`secret_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` char(255) NOT NULL DEFAULT '',
  `userToken` char(255) DEFAULT NULL,
  `userPassword` char(255) NOT NULL DEFAULT '',
  `userRole` char(1) NOT NULL DEFAULT '',
  `controlTags` longtext,
  `creater` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updater` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;

INSERT INTO `user` (`userId`, `userName`, `userToken`, `userPassword`, `userRole`, `controlTags`, `creater`, `createdAt`, `updater`, `updatedAt`)
VALUES
	(1,'sa1','test-sa1','123456','0','all',1,'2018-06-16 00:00:00',1,'2018-06-16 00:00:00'),
	(2,'sa2','test-sa2','123456','0','all',1,'2018-06-16 00:00:00',1,'2018-06-16 00:00:00');

UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `log_execute` (
  `log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `batch_id` char(255) NOT NULL DEFAULT '',
  `cronflow_id` int(11) NOT NULL,
  `log_step` int(11) NOT NULL,
  `step_name` char(255) NOT NULL DEFAULT '',
  `step_in` longtext NOT NULL,
  `execute_content` longtext,
  `step_out` longtext,
  `execute_ages` char(255) NOT NULL DEFAULT '',
  `execute_date` datetime NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `log_normal` (
  `log_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `log_type` char(255) NOT NULL DEFAULT '',
  `log_associated_user` int(11) NOT NULL,
  `log_content` longtext NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `plugin_histroy` (
  `history_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plugin_id` int(11) NOT NULL,
  `plugin_tag` longtext,
  `plugin_name` char(255) NOT NULL DEFAULT '',
  `plugin_md` longtext NOT NULL,
  `plugin_available` char(24) NOT NULL DEFAULT '',
  `plugin_path` longtext NOT NULL,
  `plugin_main` char(255) NOT NULL DEFAULT '',
  `plugin_author` char(255) NOT NULL DEFAULT '',
  `plugin_version` char(255) NOT NULL DEFAULT '',
  `latest_version` char(255) NOT NULL DEFAULT '',
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

