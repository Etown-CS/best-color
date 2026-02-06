CREATE TABLE "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"color1" text NOT NULL,
	"color2" text NOT NULL,
	"chosen_color" text NOT NULL,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
