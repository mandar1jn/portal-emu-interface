class Portal
{
	ip: URL;

	constructor(ip: string | URL)
	{
		this.ip = new URL(ip);
	}
}

export default Portal;