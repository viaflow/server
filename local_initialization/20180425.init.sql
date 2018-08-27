/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : cronflow

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 27/08/2018 15:34:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for flow
-- ----------------------------
DROP TABLE IF EXISTS `flow`;
CREATE TABLE `flow` (
  `flowId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `flowName` longtext NOT NULL,
  `flowTags` longtext,
  `triggerType` char(24) NOT NULL DEFAULT '',
  `cron` varchar(255) DEFAULT NULL,
  `flowTimezone` char(255) DEFAULT NULL,
  `flowNodes` int(11) NOT NULL DEFAULT '0',
  `flowState` char(24) NOT NULL DEFAULT 'INIT',
  `triggerCount` int(11) NOT NULL DEFAULT '0',
  `flowDescription` longtext,
  `latestDate` datetime DEFAULT NULL,
  `latestStatus` char(255) DEFAULT NULL,
  `nextDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `creator` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `updater` int(11) NOT NULL,
  PRIMARY KEY (`flowId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of flow
-- ----------------------------
BEGIN;
INSERT INTO `flow` VALUES (1, 'TestFlow', 'cron,active,test', 'active', '*/3 * * * *', 'Asia/Shanghai', 0, 'INIT', 0, '这是一个Test的Cronflow\r\n每三分钟触发一次', NULL, NULL, NULL, '2018-08-15 07:23:49', 1, '2018-08-15 07:23:49', 1);
COMMIT;

-- ----------------------------
-- Table structure for node
-- ----------------------------
DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
  `nodeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `flowId` bigint(20) unsigned NOT NULL,
  `parentId` bigint(20) unsigned NOT NULL COMMENT '0表示根节点',
  `sequence` int(10) unsigned NOT NULL,
  `signal` enum('ANY','SUCCESS','FAILURE') NOT NULL,
  `pluginId` bigint(11) NOT NULL,
  `configurations` longtext NOT NULL,
  `creator` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updater` int(10) unsigned NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`nodeId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node
-- ----------------------------
BEGIN;
INSERT INTO `node` VALUES (1, 1, 0, 0, 'ANY', 1, '{\"method\":\"GET\",\"uri\":\"https://baidu.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-16 09:40:12', 1, '2018-08-16 09:40:12');
INSERT INTO `node` VALUES (2, 1, 0, 1, 'ANY', 1, '{\"method\":\"GET\",\"uri\":\"https://baidu.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 05:09:00', 1, '2018-08-20 05:09:00');
INSERT INTO `node` VALUES (3, 1, 0, 2, 'ANY', 1, '{\"method\":\"GET\",\"uri\":\"https://www.qq.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 05:10:08', 1, '2018-08-20 05:10:08');
INSERT INTO `node` VALUES (4, 1, 0, 3, 'ANY', 1, '{\"method\":\"GET\",\"uri\":\"https://baidu.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 05:11:36', 1, '2018-08-20 05:11:36');
INSERT INTO `node` VALUES (5, 1, 0, 4, 'ANY', 1, '{\"method\":\"GET\",\"uri\":\"www.bejson.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 05:12:04', 1, '2018-08-20 05:12:04');
INSERT INTO `node` VALUES (6, 1, 1, 0, 'SUCCESS', 1, '{\"method\":\"GET\",\"uri\":\"www.bejson.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 13:33:45', 1, '2018-08-20 13:33:49');
INSERT INTO `node` VALUES (7, 1, 6, 0, 'SUCCESS', 1, '{\"method\":\"GET\",\"uri\":\"www.bejson.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 13:35:18', 1, '2018-08-20 13:35:22');
INSERT INTO `node` VALUES (8, 1, 7, 0, 'SUCCESS', 1, '{\"method\":\"GET\",\"uri\":\"www.bejson.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-20 14:14:56', 1, '2018-08-20 14:14:59');
INSERT INTO `node` VALUES (9, 1, 1, 1, 'FAILURE', 3, '{\"method\":\"GET\",\"uri\":\"https://baidu.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-27 07:33:57', 1, '2018-08-27 07:33:57');
COMMIT;

-- ----------------------------
-- Table structure for plugin
-- ----------------------------
DROP TABLE IF EXISTS `plugin`;
CREATE TABLE `plugin` (
  `pluginId` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `pluginName` varchar(256) NOT NULL,
  `pluginDesc` longtext,
  `pluginRepo` varchar(512) NOT NULL,
  `pluginTargetDir` varchar(256) DEFAULT NULL,
  `pluginPath` varchar(1024) NOT NULL,
  `pluginCompiledPath` varchar(1024) NOT NULL,
  `pluginVersion` varchar(256) NOT NULL,
  `pluginWorkBranch` varchar(256) NOT NULL,
  `createdAt` datetime NOT NULL,
  `creator` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `updater` int(11) NOT NULL,
  PRIMARY KEY (`pluginId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of plugin
-- ----------------------------
BEGIN;
INSERT INTO `plugin` VALUES (1, 'HTTP', 'Http plugin for viaflow by request/request', 'https://github.com/viaflow/plugin-http.git', NULL, '/cronflow/plugins/plugin-http', '/cronflow/plugins/plugin-http/viaflow_compiled', '1.0.0', 'master', '2018-08-27 06:14:23', 1, '2018-08-27 06:14:23', 1);
INSERT INTO `plugin` VALUES (2, 'HTTP', 'Http plugin for viaflow by request/request', 'https://github.com/viaflow/plugin-http.git', 'http', '/cronflow/plugins/http', '/cronflow/plugins/http/viaflow_compiled', '1.0.0', 'master', '2018-08-27 06:18:32', 1, '2018-08-27 06:18:32', 1);
INSERT INTO `plugin` VALUES (3, 'HTTP', 'Http plugin for viaflow by request/request', 'https://github.com/viaflow/plugin-http.git', 'http-test', '/cronflow/plugins/http-test', '/cronflow/plugins/http-test/viaflow_compiled', '1.0.0', 'master', '2018-08-27 06:22:03', 1, '2018-08-27 06:22:03', 1);
COMMIT;

-- ----------------------------
-- Table structure for temp_data
-- ----------------------------
DROP TABLE IF EXISTS `temp_data`;
CREATE TABLE `temp_data` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_data
-- ----------------------------
BEGIN;
INSERT INTO `temp_data` VALUES (1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` char(255) NOT NULL DEFAULT '',
  `userToken` char(255) DEFAULT NULL,
  `userPassword` char(255) NOT NULL DEFAULT '',
  `userRole` char(1) NOT NULL DEFAULT '',
  `controlTags` longtext,
  `creator` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updater` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'sa1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYTEiLCJyb2xlIjoiMCIsImlhdCI6MTUzNDc1ODAzOCwiZXhwIjoxNTM1MzYyODM4LCJhdWQiOiJjcm9uZmxvdyJ9.qFx5FaMarNCUQq9dPA3FDvPbJ41pH_-G2AuuFaDXRFg', '123456', '0', 'all', 1, '2018-06-16 00:00:00', 1, '2018-08-20 09:40:38');
INSERT INTO `user` VALUES (2, 'sa2', 'test-sa2', '123456', '0', 'all', 1, '2018-06-16 00:00:00', 1, '2018-06-16 00:00:00');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
