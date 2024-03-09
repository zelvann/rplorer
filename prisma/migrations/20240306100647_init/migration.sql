-- CreateTable
CREATE TABLE "user" (
    "username" VARCHAR(30) NOT NULL,
    "firstname" VARCHAR(30) NOT NULL,
    "lastname" VARCHAR(30) NOT NULL,
    "bio" TEXT,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "post" (
    "id" VARCHAR(255) NOT NULL,
    "image_path" VARCHAR(512) NOT NULL,
    "caption" TEXT,
    "likes" INTEGER DEFAULT 0,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "user_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,
    "post_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" VARCHAR(255) NOT NULL,
    "comment" TEXT NOT NULL,
    "post_id" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
