import Grid from "@mui/material/Grid";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useNavigate } from "@tanstack/react-router";
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import dailyNewsLogo from "@/assets/images/dailynews_logo.png";
import { FilterBar } from "../../components/search/Filterbar";
import { Searchbar } from "../../components/search/Searchbar";
import { Page } from "../../components/layouts/Page";
import ProductCard from "../product/components/cards/ProductCard";
import CompactNavBar from "./components/CompactNavBar";
import { HomeTopNav } from "./components/HomeTopNav";
import { useActiveProductsFeed } from "./hooks/useActiveProductsFeed";
import { useExpiredProducts } from "./hooks/useExpiredProducts";
import { useSearchFilters } from "../../features/search/hooks/useSearchFilters";
import { useInfiniteScrollTrigger } from "./hooks/useInfiniteScrollTrigger";
import { useStickyVisibility } from "./hooks/useStickyVisibility";
import { useHomeScrollRestoration } from "./ScrollRestorationProvider";
import { LazyStatus, Pane, Panes } from "./styled/feeds";
import {
	Logo,
	SearchSection,
	SearchSectionWrapper,
	StyledContainer,
	WrapperLanding,
} from "./styled/layout";

export const HomePage = () => {
	useHomeScrollRestoration();
	const navigate = useNavigate();
	
	const {
		items: filterItems,
		selectedFilters,
		handleToggle,
		clearFilters,
	} = useSearchFilters();
	const muiTheme = useMuiTheme();
	const filterSectionRef = useRef<HTMLDivElement | null>(null);
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const {
		items: activeProducts,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingActive,
	} = useActiveProductsFeed();

	const { products: expiredProducts, isLoading: isLoadingExpired } =
		useExpiredProducts();

	const handleProductClick = (id: string) => {
		navigate({
			to: "/reading",
			search: (prev) => ({
				...prev,
				productId: id,
			}),
		});
	};

	const handleSearchAction = useCallback(() => {
		navigate({ to: "/search" });
	}, [navigate]);

	const handleSearchInputActivate = handleSearchAction;

	const handleHelp = () => {
		console.log("help click");
	};

	const handleLogout = () => {
		console.log("logout");
	};

	const stickyObserverOptions = useMemo<IntersectionObserverInit>(
		() => ({ threshold: 0 }),
		[],
	);
	const showCompactNav = useStickyVisibility(
		filterSectionRef,
		true,
		stickyObserverOptions,
	);

	const infiniteScrollObserverOptions = useMemo<IntersectionObserverInit>(
		() => ({ rootMargin: "120px" }),
		[],
	);

	const shouldFetchMore = useInfiniteScrollTrigger(
		sentinelRef,
		hasNextPage && !isFetchingNextPage,
		infiniteScrollObserverOptions,
	);

	useEffect(() => {
		if (shouldFetchMore) {
			fetchNextPage();
		}
	}, [fetchNextPage, shouldFetchMore]);


	return (
		<Page>
			<CompactNavBar
				visible={showCompactNav}
				onSearchAction={handleSearchAction}
				onHelp={handleHelp}
				onLogout={handleLogout}
			/>
			<StyledContainer blurred={false}>
				<WrapperLanding>
					<HomeTopNav onHelp={handleHelp} onLogout={handleLogout} />
					<Logo src={dailyNewsLogo} alt="DailyNews" width={460} height={56} />
				</WrapperLanding>
				<SearchSectionWrapper ref={filterSectionRef}>
					<SearchSection>
						<Searchbar
							onSubmit={() => {}}
							onActivate={handleSearchInputActivate}
							backgroundColor={muiTheme.palette.surface.containerHigh}
						/>
						<FilterBar
							items={filterItems}
							selectedKeys={selectedFilters}
							onToggle={handleToggle}
							onClear={clearFilters}
						/>
					</SearchSection>
				</SearchSectionWrapper>

				<Panes container spacing={3}>
					<Grid size={{ xs: 12, md: 8 }}>
						<Pane>
							<h2>Active</h2>
							<div>
								{activeProducts.map((product) => (
									<ProductCard
										key={product.systemDocId}
										product={product}
										onProductClick={handleProductClick}
									/>
								))}
								<div ref={sentinelRef} />
								<LazyStatus>
									{isLoadingActive
										? "Loading articles..."
										: isFetchingNextPage
											? "Loading more articles..."
											: hasNextPage
												? ""
												: "Loaded all articles"}
								</LazyStatus>
							</div>
						</Pane>
					</Grid>
					<Grid sx={{ display: { xs: "none", md: "block" } }} size={{ md: 4 }}>
						<Pane>
							<h2>Expired</h2>
							<div>
								{(isLoadingExpired ? [] : expiredProducts)
									.slice(0, 5)
									.map((product) => (
										<ProductCard
											key={product.systemDocId}
											product={product}
											onProductClick={handleProductClick}
										/>
									))}
							</div>
						</Pane>
						<p>View all expired</p>
					</Grid>
				</Panes>
			</StyledContainer>
		</Page>
	);
};
