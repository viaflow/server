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


CREATE TABLE `cronflow` (
  `cronflow_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cronflow_name` longtext NOT NULL,
  `cronflow_tags` longtext,
  `trigger_type` char(24) NOT NULL DEFAULT '',
  `cronflow_cron` varchar(255) DEFAULT NULL,
  `cronflow_nodes` int(11) NOT NULL DEFAULT '0',
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