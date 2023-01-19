-- CreateTable
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "songs" TEXT,
    "authorID" INTEGER NOT NULL,
    CONSTRAINT "Playlist_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
