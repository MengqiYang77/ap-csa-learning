CREATE TABLE `codeSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` int NOT NULL,
	`sectionId` varchar(100) NOT NULL,
	`code` text NOT NULL,
	`language` varchar(20) NOT NULL DEFAULT 'java',
	`status` enum('submitted','reviewed','feedback_given') NOT NULL DEFAULT 'submitted',
	`teacherFeedback` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `codeSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` int NOT NULL,
	`sectionId` varchar(100) NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
