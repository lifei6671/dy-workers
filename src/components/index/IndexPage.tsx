"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import type { VideoItem } from "./types";
import { getPageHref } from "./utils";
import styles from "./index.module.css";

type IndexPageProps = {
	pageIndex: number;
	totalPages: number;
	videos: VideoItem[];
};

export default function IndexPage({ pageIndex, totalPages, videos }: IndexPageProps) {
	const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
	const [playSrc, setPlaySrc] = useState<string>("");
	const videoRef = useRef<HTMLVideoElement>(null);

	const pagination = useMemo(() => {
		const safeTotal = Math.max(1, totalPages);
		const safePage = Math.min(Math.max(1, pageIndex), safeTotal);
		return [
			{ label: "首页", page: 1, disabled: safePage === 1 },
			{ label: "上一页", page: Math.max(1, safePage - 1), disabled: safePage === 1 },
			{ label: "下一页", page: Math.min(safeTotal, safePage + 1), disabled: safePage === safeTotal },
			{ label: "尾页", page: safeTotal, disabled: safePage === safeTotal },
		];
	}, [pageIndex, totalPages]);

	const openModal = (video: VideoItem) => {
		setActiveVideo(video);
		setPlaySrc(video.videoLocalPlayAddr);
	};

	const closeModal = () => {
		setActiveVideo(null);
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		if (!activeVideo) {
			video.pause();
			video.removeAttribute("src");
			video.load();
			setPlaySrc("");
			return;
		}

		video.src = playSrc || activeVideo.videoLocalPlayAddr;
		video.load();
		const playPromise = video.play();
		if (playPromise && typeof playPromise.catch === "function") {
			playPromise.catch(() => undefined);
		}
	}, [activeVideo, playSrc]);

	useEffect(() => {
		if (!activeVideo) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeModal();
			}
		};

		const tryPlay = () => {
			const video = videoRef.current;
			if (!video) {
				return;
			}
			const promise = video.play();
			if (promise && typeof promise.catch === "function") {
				promise.catch(() => undefined);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("WeixinJSBridgeReady", tryPlay, false);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("WeixinJSBridgeReady", tryPlay, false);
			document.body.style.overflow = "";
		};
	}, [activeVideo]);

	const handleVideoError = () => {
		if (!activeVideo) {
			return;
		}
		if (activeVideo.videoRawPlayAddr && playSrc !== activeVideo.videoRawPlayAddr) {
			setPlaySrc(activeVideo.videoRawPlayAddr);
		}
	};

	return (
		<div className={styles.page}>
			<header className={styles.topbar}>
				<div className={styles.navInner}>
					<Link href="/" className={styles.brand}>
						<span className={styles.brandIcon} aria-hidden="true">
							<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
								<path
									d="M9.5 4.5h5l1.2 2H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h4.3l1.2-2Zm2.5 4a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Z"
									fill="currentColor"
								/>
							</svg>
						</span>
						<span className={styles.brandText}>白茶清欢短视频</span>
					</Link>
					<nav className={styles.nav}>
						<Link className={styles.navLink} href="/" aria-current="page">
							抖音无水印下载工具 <span className={styles.srOnly}>(current)</span>
						</Link>
					</nav>
				</div>
			</header>

			<main className={styles.main}>
				<section className={styles.album}>
					<div className={styles.container}>
						<div className={styles.cards}>
							{videos.length === 0 ? (
								<p className={styles.empty}>没有数据</p>
							) : (
								videos.map((item) => (
									<article className={styles.card} key={item.videoId}>
										<div className={styles.imageContent}>
											<Link href={item.videoUrl} title={item.nickname}>
												<img src={item.videoLocalCover} alt={item.nickname} loading="lazy" />
											</Link>
										</div>
										<div className={styles.cardBody}>
											<p className={styles.cardText}>
												<Link className={styles.author} href={item.authorUrl} title={item.nickname}>
													@{item.nickname}
												</Link>
												{item.desc ? ` ${item.desc}` : ""}
											</p>
											<div className={styles.cardMeta}>
												<div className={styles.buttonGroup}>
													<button
														type="button"
														className={styles.button}
														onClick={() => openModal(item)}
													>
														本地播放
													</button>
													<a
														className={styles.button}
														href={item.videoRawPlayAddr}
														target="_blank"
														rel="nofollow noreferrer"
													>
														来源
													</a>
												</div>
												<time className={styles.time}>{item.createdAt}</time>
											</div>
										</div>
									</article>
								))
							)}
						</div>

						<nav className={styles.pagination} aria-label="分页">
							{pagination.map((item) =>
								item.disabled ? (
									<span key={item.label} className={`${styles.pageLink} ${styles.pageLinkDisabled}`}>
										{item.label}
									</span>
								) : (
									<Link key={item.label} className={styles.pageLink} href={getPageHref(item.page)}>
										{item.label}
									</Link>
								),
							)}
						</nav>
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				<div className={styles.footerInner}>
					<span className={styles.footerText}>抖音无水印下载.</span>
					<a
						className={styles.footerLink}
						href="https://github.com/lifei6671/DouYinBot"
						target="_blank"
						rel="noreferrer"
						title="源码"
					>
						@DouYinBot
					</a>
					<a
						className={styles.footerLink}
						href="https://study.disign.me"
						target="_blank"
						rel="noreferrer"
						title="友情链接-技术书栈"
					>
						@技术书栈
					</a>
				</div>
			</footer>

			<Script id="baidu-analytics" strategy="afterInteractive">
				{`var _hmt = _hmt || [];
				(function () {
					var hm = document.createElement("script");
					hm.src = "https://hm.baidu.com/hm.js?730c3024740620e3e259d0212828e754";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(hm, s);
				})();`}
			</Script>

			<div
				className={`${styles.modalOverlay} ${activeVideo ? styles.modalOpen : ""}`}
				role="dialog"
				aria-modal="true"
				aria-hidden={!activeVideo}
				onClick={closeModal}
			>
				<div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
					<div className={styles.modalHeader}>
						<h2 className={styles.modalTitle}>{activeVideo?.nickname ?? "视频播放"}</h2>
						<button type="button" className={styles.modalClose} onClick={closeModal}>
							<span aria-hidden="true">×</span>
							<span className={styles.srOnly}>关闭</span>
						</button>
					</div>
					<div className={styles.modalBody}>
						<video
							ref={videoRef}
							controls
							autoPlay
							playsInline
							poster={activeVideo?.videoLocalCover}
							onError={handleVideoError}
						>
							您的浏览器不支持 video 标签。
						</video>
					</div>
				</div>
			</div>
		</div>
	);
}
