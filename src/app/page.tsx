import type { Metadata, Viewport } from "next";
import IndexPage from "../components/index/IndexPage";
import { mockVideos, totalPages } from "../components/index/mockData";
import { getIndexTitle } from "../components/index/utils";

export const metadata: Metadata = {
	title: getIndexTitle(1),
	description: "抖音无水印工具_最新抖音在线无水印解析",
	referrer: "origin-when-cross-origin",
	verification: {
		google: "J_E-OodpvF9EtDOOrZXUxIt61CpaU89xz8CpN359ILE",
		other: {
			"baidu-site-verification": "codeva-FTqpGqyeAi",
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function HomePage() {
	return <IndexPage pageIndex={1} totalPages={totalPages} videos={mockVideos} />;
}
