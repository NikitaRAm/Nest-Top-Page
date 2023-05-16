interface IUser {
	userId: number;
	id: number;
	title: string;
	info: Iinfo;
	tags: Itag[];
}

interface Iinfo {
	desc: string;
	isActive: boolean;
}

interface Itag {
	name: string;
	value: number;
}
