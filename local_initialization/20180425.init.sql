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


CREATE TABLE IF NOT EXISTS `flow` (
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
  `createdUser` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `updatedUser` int(11) NOT NULL,
  PRIMARY KEY (`flowId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` char(255) NOT NULL DEFAULT '',
  `userToken` char(255) DEFAULT NULL,
  `userPassword` char(255) NOT NULL DEFAULT '',
  `userRole` char(1) NOT NULL DEFAULT '',
  `controlTags` longtext,
  `createdUser` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedUser` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;

INSERT INTO `user` (`userId`, `userName`, `userToken`, `userPassword`, `userRole`, `controlTags`, `createdUser`, `createdAt`, `updatedUser`, `updatedAt`)
VALUES
	(1,'sa1','test-sa1','123456','0','all',1,'2018-06-16 00:00:00',1,'2018-06-16 00:00:00'),
	(2,'sa2','test-sa2','123456','0','all',1,'2018-06-16 00:00:00',1,'2018-06-16 00:00:00');

UNLOCK TABLES;