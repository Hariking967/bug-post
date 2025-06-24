-- AlterTable
ALTER TABLE "Bug" ALTER COLUMN "answered" SET DEFAULT 0,
ALTER COLUMN "answered" DROP DEFAULT;
DROP SEQUENCE "bug_answered_seq";
