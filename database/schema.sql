set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."entries" (
	"entryId" serial NOT NULL,
	"eventDescription" TEXT NOT NULL,
	"startTime" TEXT NOT NULL,
	"endTime" TEXT NOT NULL,
	"notes" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"eventDate" TEXT NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
