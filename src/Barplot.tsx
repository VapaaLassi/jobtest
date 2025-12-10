import { Console } from 'console';
import * as d3 from 'd3';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
    width: number;
    height: number;
    data: { name: string; value: number }[];
    highlightedRegion?: string;
};

export const Barplot = ({ width, height, data, highlightedRegion }: BarplotProps) => {
    // bounds = area inside the graph axis = calculated by substracting the margins
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    console.log('Barplot highlightedRegion:', highlightedRegion);

    // X axis is for groups since the barplot is vertical
    const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
    const xScale = d3
        .scaleBand()
        .domain(groups)
        .range([0, boundsWidth])
        .padding(BAR_PADDING);

    // Y axis
    const max = 35
    const yScale = d3
        .scaleLinear()
        .domain([max * 1.2, 0])
        .range([0, boundsHeight]);

    // Build the shapes
    const allShapes = data.map((d, i) => {
        const x = xScale(d.name);
        if (x === undefined) {
            return null;
        }

        console.log('highlightedRegion:', highlightedRegion, 'name:', d.name);

        const isHighlighted = d.name === highlightedRegion;

        const barColor = isHighlighted ? '#f26659' : '#009cb5';

        return (
            <g key={i}>
                <rect
                    x={x}
                    y={yScale(d.value)}
                    width={xScale.bandwidth()}
                    height={boundsHeight - yScale(d.value)}
                    opacity={0.9}
                    stroke={barColor}
                    fill={barColor}
                    fillOpacity={0.6}
                    strokeWidth={1}
                    rx={1}
                />
                {isHighlighted && (
                    <text
                        x={x + xScale.bandwidth() / 2}
                        y={yScale(d.value) - 10}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        fontSize={12}
                        fontWeight="bold"
                    >
                        {d.name}
                    </text>
                )}
            </g>
        );
    });

    const grid = yScale.ticks(5).map((value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
        <g key={i}>
            <line
                x1={0}
                x2={boundsWidth}
                y1={yScale(value)}
                y2={yScale(value)}
                stroke="#808080"
                opacity={0.2}
            />
            <text
                x={-10}
                y={yScale(value)}
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={9}
                stroke="#808080"
                opacity={0.8}
            >
                {value}
            </text>
        </g>
    ));

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                >
                    {grid}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};
