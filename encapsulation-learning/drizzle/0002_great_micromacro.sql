CREATE TABLE `userBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeId` varchar(50) NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userBadges_id` PRIMARY KEY(`id`)
);
