export function getIndexTitle(pageIndex?: number | null) {
	if (pageIndex && pageIndex > 1) {
		return `第${pageIndex}页-抖音无水印工具-抖音无水印-抖音型男集锦`;
	}
	return "首页-抖音无水印工具-抖音无水印-抖音型男集锦";
}

export function getPageHref(pageIndex: number) {
	if (pageIndex <= 1) {
		return "/";
	}
	return `/page/${pageIndex}.html`;
}

export function normalizePageIndex(raw: string | number | undefined) {
	if (raw === undefined) {
		return 1;
	}
	const value = typeof raw === "number" ? raw : Number.parseInt(raw.replace(/\.html$/i, ""), 10);
	if (!Number.isFinite(value) || value < 1) {
		return 1;
	}
	return value;
}
