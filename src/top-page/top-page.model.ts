import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;

	@prop()
	updatedAt: Date;
}

export class TopPageAdvantages {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base { }

@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => [HhData] })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvantages] })
	advantages: TopPageAdvantages[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop()
	tags: string[];
}