import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const votes = pgTable('votes', {
	id: serial('id').primaryKey(),
	theme: text('theme').notNull(),
	color1: text('color1').notNull(),
	color2: text('color2').notNull(),
	chosenColor: text('chosen_color').notNull(),
	userAgent: text('user_agent'),
	uaBrowser: text('uaBrowser'),
	uaEngine: text('uaEngine'),
	uaOS: text('uaOS'),
	uaDeviceModel: text('uaDeviceModel'),
	uaDeviceVendor: text('uaDeviceVendor'),
	uaDeviceType: text('uaDeviceType'),
	uaCPUArch: text('uaCPUArch'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
