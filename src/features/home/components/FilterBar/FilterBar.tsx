import { useMemo } from "react";

import { FilterPill } from "../../../../components/buttons/FilterPill";
import { Bar, ClearButton, SegmentGroup } from "./FilterBar.styled";

export type FilterItem = {
	key: string;
	label: string;
	segment?: string;
};

type FilterGroup =
	| { type: "single"; item: FilterItem }
	| { type: "segment"; segment: string; items: FilterItem[] };

export type FilterBarProps = {
	items: FilterItem[];
	selectedKeys: string[];
	onToggle: (key: string) => void;
	onClear?: () => void;
	className?: string;
};

export function FilterBar({
	items,
	selectedKeys,
	onToggle,
	onClear,
	className,
}: FilterBarProps) {
	const groups = useMemo<FilterGroup[]>(() => {
		return items.reduce<FilterGroup[]>((acc, item) => {
			if (!item.segment) {
				acc.push({ type: "single", item });
				return acc;
			}

			const last = acc[acc.length - 1];

			if (last && last.type === "segment" && last.segment === item.segment) {
				last.items.push(item);
				return acc;
			}

			acc.push({ type: "segment", segment: item.segment, items: [item] });
			return acc;
		}, []);
	}, [items]);

	const renderPill = (
		pill: FilterItem,
		options: {
			joined: boolean;
			roundLeft: boolean;
			roundRight: boolean;
			showDivider: boolean;
		},
	) => (
		<FilterPill
			key={pill.key}
			label={pill.label}
			selected={selectedKeys.includes(pill.key)}
			onToggle={() => onToggle(pill.key)}
			joined={options.joined}
			roundLeft={options.roundLeft}
			roundRight={options.roundRight}
			showDivider={options.showDivider}
		/>
	);

	return (
		<Bar className={className}>
			{groups.map((group) => {
				if (group.type === "single") {
					return renderPill(group.item, {
						joined: false,
						roundLeft: true,
						roundRight: true,
						showDivider: false,
					});
				}

				return (
					<SegmentGroup key={group.segment}>
						{group.items.map((pill, index) => {
							const isFirst = index === 0;
							const isLast = index === group.items.length - 1;
							const hasSiblings = group.items.length > 1;

							return renderPill(pill, {
								joined: hasSiblings,
								roundLeft: isFirst || !hasSiblings,
								roundRight: isLast || !hasSiblings,
								showDivider: hasSiblings && index > 0,
							});
						})}
					</SegmentGroup>
				);
			})}

			{onClear && (
				<ClearButton type="button" onClick={onClear}>
					Clear
				</ClearButton>
			)}
		</Bar>
	);
}
