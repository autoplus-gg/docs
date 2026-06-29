import Image from "next/image";

interface SupportedCrypto {
	confirmationsRequired: number;
	icon: string;
	name: string;
	networkIcon?: string;
}

const supportedCryptos: readonly SupportedCrypto[] = [
	{ name: "Litecoin", icon: "ltc", confirmationsRequired: 1 },
	{ name: "Solana", icon: "sol", confirmationsRequired: 30 },
	{ name: "Ethereum", icon: "eth", confirmationsRequired: 10 },
	{ name: "Binance Coin", icon: "bnb", confirmationsRequired: 30 },
	{ name: "Bitcoin", icon: "btc", confirmationsRequired: 1 },
	{ name: "Polygon", icon: "pol", confirmationsRequired: 50 },
	{ name: "USDC SOL", icon: "usdc", networkIcon: "sol", confirmationsRequired: 30 },
	{ name: "USDT SOL", icon: "usdt", networkIcon: "sol", confirmationsRequired: 30 },
	{ name: "USDC ERC-20", icon: "usdc", networkIcon: "eth", confirmationsRequired: 10 },
	{ name: "USDT ERC-20", icon: "usdt", networkIcon: "eth", confirmationsRequired: 10 },
	{ name: "USDC BEP-20", icon: "usdc", networkIcon: "bnb", confirmationsRequired: 30 },
	{ name: "USDT BEP-20", icon: "usdt", networkIcon: "bnb", confirmationsRequired: 30 },
	{ name: "USDC POL", icon: "usdc", networkIcon: "pol", confirmationsRequired: 50 },
	{ name: "USDT POL", icon: "usdt", networkIcon: "pol", confirmationsRequired: 50 },
	{ name: "USDC.e POL", icon: "usdce", networkIcon: "pol", confirmationsRequired: 50 }
];

function iconPath(symbol: string) {
	const normalized = symbol.toLowerCase();
	return `/crypto/${normalized === "usdce" ? "usdc" : normalized}.svg`;
}

function confirmationLabel(count: number) {
	return `${count} confirmation${count === 1 ? "" : "s"}`;
}

export function SupportedCryptocurrencies() {
	return (
		<div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
			{supportedCryptos.map((crypto) => (
				<div
					key={crypto.name}
					className="flex items-center gap-3 rounded-md border border-gray-400/20 bg-gray-800/10 p-3 dark:border-gray-200/20 dark:bg-gray-800/20"
				>
					<div className="relative shrink-0">
						<Image src={iconPath(crypto.icon)} alt={`${crypto.name} icon`} width={32} height={32} unoptimized />
						{crypto.networkIcon ? (
							<Image
								src={iconPath(crypto.networkIcon)}
								alt=""
								width={14}
								height={14}
								className="absolute -right-1 -bottom-1 rounded-full bg-white dark:bg-black"
								unoptimized
							/>
						) : null}
					</div>
					<div className="min-w-0">
						<p className="font-semibold">{crypto.name}</p>
						<p className="text-sm text-gray-600 dark:text-gray-300">{confirmationLabel(crypto.confirmationsRequired)}</p>
					</div>
				</div>
			))}
		</div>
	);
}
