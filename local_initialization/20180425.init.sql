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

 Date: 16/08/2018 17:40:43
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
  `plugin` varchar(256) NOT NULL,
  `configurations` longtext NOT NULL,
  `creator` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updater` int(10) unsigned NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`nodeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node
-- ----------------------------
BEGIN;
INSERT INTO `node` VALUES (1, 1, 0, 0, 'ANY', 'plugin-http', '{\"method\":\"GET\",\"uri\":\"https://baidu.com\",\"qs\":\"\",\"headers\":\"\",\"body\":\"\",\"extends\":\"\"}', 1, '2018-08-16 09:40:12', 1, '2018-08-16 09:40:12');
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
INSERT INTO `user` VALUES (1, 'sa1', 'test-sa1', '123456', '0', 'all', 1, '2018-06-16 00:00:00', 1, '2018-06-16 00:00:00');
INSERT INTO `user` VALUES (2, 'sa2', 'test-sa2', '123456', '0', 'all', 1, '2018-06-16 00:00:00', 1, '2018-06-16 00:00:00');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
