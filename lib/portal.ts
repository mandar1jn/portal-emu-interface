export type Info = {
	name: string;
	version: string;
}

export type Toy = {
	id: number;
	id_hex: string;
	variant: number;
	variant_hex: string;
}

export enum SlotStatus {
	EMPTY = 0,
	PRESENT = 1,
	REMOVED = 2,
	ADDED = 3
}

export type Slot = {
	toy?: Toy;
	status: SlotStatus;
}

export type Slots = {
	slots: Slot[];
}

export type ToyData = {
	data: Uint8Array;
}

class Portal
{
	ip: URL;

	constructor(ip: string | URL)
	{
		this.ip = new URL(ip);
	}

	api = {
		getInfo: async (): Promise<Info> =>
		{
			return await (await fetch(this.ip + "api/v1/info")).json()
		},
		getSlots: async (): Promise<Slots> =>
		{
			return await (await fetch(this.ip + "api/v1/slots")).json();
		},
		getToy: async (index: 0 | 1 | 2 | 3 | 4 | 5): Promise<ToyData> =>
		{
			return {
				data: new Uint8Array(await (await fetch(`${this.ip}api/v1/toys?slot_index=${index}`)).arrayBuffer())
			}
		}
	}
}

export default Portal;