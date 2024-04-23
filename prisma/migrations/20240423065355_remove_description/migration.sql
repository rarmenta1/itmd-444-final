-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "animeid" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "animeid" INTEGER NOT NULL,
    "characterid" INTEGER,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeid_fkey" FOREIGN KEY ("animeid") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_animeid_fkey" FOREIGN KEY ("animeid") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_characterid_fkey" FOREIGN KEY ("characterid") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
