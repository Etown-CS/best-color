import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const votes = pgTable('votes', {
	id: serial('id').primaryKey(),
	theme: text('theme').notNull(),
	color1: text('color1').notNull(),
	color2: text('color2').notNull(),
	chosenColor: text('chosen_color').notNull(),
	userAgent: text('user_agent'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
