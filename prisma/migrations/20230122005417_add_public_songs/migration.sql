-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "year" INTEGER,
    "genre" TEXT,
    "duration" INTEGER,
    "public" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_songs" ("album", "artist", "duration", "genre", "id", "name", "year") SELECT "album", "artist", "duration", "genre", "id", "name", "year" FROM "songs";
DROP TABLE "songs";
ALTER TABLE "new_songs" RENAME TO "songs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
