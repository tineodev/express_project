/*
  Warnings:

  - You are about to alter the column `year` on the `songs` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "year" INTEGER,
    "genre" TEXT,
    "duration" INTEGER
);
INSERT INTO "new_songs" ("album", "artist", "duration", "genre", "id", "name", "year") SELECT "album", "artist", "duration", "genre", "id", "name", "year" FROM "songs";
DROP TABLE "songs";
ALTER TABLE "new_songs" RENAME TO "songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
