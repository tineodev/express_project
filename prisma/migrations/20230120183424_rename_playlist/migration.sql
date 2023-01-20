/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Playlist";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "playlists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "songs" TEXT,
    "authorID" INTEGER NOT NULL,
    CONSTRAINT "playlists_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
