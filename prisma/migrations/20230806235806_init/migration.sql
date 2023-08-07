-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "base_stat" INTEGER NOT NULL,
    "effort" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    CONSTRAINT "Stat_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    CONSTRAINT "Type_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE INDEX "Pokemon_id_name_idx" ON "Pokemon"("id", "name");

-- CreateIndex
CREATE INDEX "Stat_name_idx" ON "Stat"("name");

-- CreateIndex
CREATE INDEX "Type_name_idx" ON "Type"("name");
