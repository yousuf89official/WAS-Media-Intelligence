'use client';

import React, { useRef, useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResizableCardProps {
    children: React.ReactNode;
    className?: string;
    defaultColSpan?: number; // Span on 24-col grid
    defaultRowSpan?: number;
    minColSpan?: number;
    maxColSpan?: number;
}

export const ResizableCard: React.FC<ResizableCardProps> = ({
    children,
    className,
    defaultColSpan = 6,
    defaultRowSpan = 1,
    minColSpan = 2,
    maxColSpan = 24
}) => {
    // Current span in the 24-column system
    const [span, setSpan] = useState(defaultColSpan);
    const [rowSpan, setRowSpan] = useState(defaultRowSpan);
    const [isResizing, setIsResizing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startSpanRef = useRef<number>(0);

    // Calculate grid classes based on current breakpoint
    // The user wants:
    // > 1920px (3xl): 24-column grid. We use the 'span' value directly.
    // < 1920px: 12-column grid. We need to map the 24-col span to 12-col.
    // Simple mapping: 24-col span 6 => 12-col span 3.
    // Ensure we don't map to 0. Math.max(1, Math.round(span / 2)).

    // HOWEVER, to support true "24 column granularity" only on large screens,
    // and "12 column" on others, we can use responsive classes.
    // But since `span` is stateful/dynamic, we can't easily rely on just Tailwind classes 
    // if we want the resize to persist smoothly across breakpoints or work linearly.

    // Strategy:
    // We will apply the style `gridColumn: span X` dynamically.
    // But we need to switch the context.
    // If we are on a 12-col grid, `span 6` takes 50%.
    // If we are on a 24-col grid, `span 6` takes 25%.

    // To preserve the *physical width* (relative to container), 
    // a card that is 25% width should be `span 3` (on 12-col) and `span 6` (on 24-col).

    // Let's assume the user wants the card to keep its relative size.
    // So we store the "24-col equivalent" span as the source of truth.
    // When rendering on < 3xl (12 cols), we divide by 2.

    // We need to know if we are on a 24-col grid or not to do the math during drag.
    // But for rendering, we can use CSS `calc` or just media queries?
    // Tailwind's `col-span-auto` utility is static.

    // CSS Grid solution:
    // The parent has `grid-template-columns: repeat(12, 1fr)` (default) 
    // and `grid-template-columns: repeat(24, 1fr)` (3xl).

    // If we set `gridColumn: span 6`, on a 12-col grid it's 50%. On 24-col it's 25%.
    // So the card gets smaller on the huge screen if we just send `span 6`.
    // The user likely wants it to look consistent or just "more granular".

    // "12 column grid... only when screen size is more than 1920px. Other than that make it a 12 column grid"
    // Wait, the user said: "24 column grid to be in one single row only when the screen size is more than 1920px. Other than that make it a 12 column grid."

    // If I have an item that is "Standard Size" (e.g. 1/4 width).
    // On 12-col: span 3.
    // On 24-col: span 6.

    // I will simply use a custom style that sets the span based on a CSS variable or media query? No, inline styles are hard with media queries.
    // I'll settle on: `col-span-${Math.ceil(span/2)} 3xl:col-span-${span}`.
    // This maps the granular internal state to both views.

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        startXRef.current = e.clientX;
        startSpanRef.current = span;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;

        const parent = cardRef.current.parentElement;
        if (!parent) return;

        // Determine if we are in 24-col mode or 12-col mode?
        // Actually, we should calculate based on pixels and snap to the nearest "grid unit".
        // Let's assume the "base truth" is 24 columns for calculation precision.

        const gridWidth = parent.clientWidth;
        const colWidth = gridWidth / 24; // Always calculate relative to 24 slots for granularity

        const deltaX = e.clientX - startXRef.current;
        const deltaCols = Math.round(deltaX / colWidth);

        let newSpan = startSpanRef.current + deltaCols;

        // Clamp
        newSpan = Math.max(minColSpan, Math.min(maxColSpan, newSpan));

        setSpan(newSpan);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    // Vertical Resize Logic
    const handleMouseDownVertical = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        // We track Y instead of X
        const startY = e.clientY;
        const startRowSpan = rowSpan;

        const handleMouseMoveVertical = (moveEvent: MouseEvent) => {
            if (!cardRef.current?.parentElement) return;

            // Calculate row height. 
            // In a grid with auto-rows, this is tricky if we don't know the exact row height.
            // But usually grid-auto-rows is set or we can infer from current element height / current span.

            const currentRect = cardRef.current.getBoundingClientRect();
            const currentHeight = currentRect.height;
            const singleRowHeight = currentHeight / startRowSpan;

            // Avoid division by zero
            const safeRowHeight = singleRowHeight || 100; // fallback

            const deltaY = moveEvent.clientY - startY;
            const deltaRows = Math.round(deltaY / safeRowHeight);

            let newRowSpan = startRowSpan + deltaRows;
            newRowSpan = Math.max(1, newRowSpan); // Minimum 1 row

            setRowSpan(newRowSpan);
        };

        const handleMouseUpVertical = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMoveVertical);
            document.removeEventListener('mouseup', handleMouseUpVertical);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', handleMouseMoveVertical);
        document.addEventListener('mouseup', handleMouseUpVertical);
        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    };

    return (
        <motion.div
            layout
            ref={cardRef}
            className={cn(
                "relative group transition-colors duration-200 ease-in-out",
                className,
                isResizing && "z-50 shadow-2xl ring-2 ring-brand-primary"
            )}
            style={{
                // Magic: CSS variables or inline media queries don't work easily here.
                // We rely on the className utility generation for responsive behavior if possible,
                // but since span is dynamic number, we can't use static classes like `md:col-span-${span}` easily without a full whitelist.

                // Instead, let's use the provided requirement:
                // > 1920px (3xl) => use `span` (based on 24)
                // < 1920px => use `span / 2` (based on 12)

                // Since inline styles override classes, we have to be clever.
                // We can't set "media query inline styles".
                // So we will rely on a small helper that updates with window resize? No, that causes hydration mismatch.

                // Robust Solution:
                // Use a custom property for the span and let CSS handle the calc.
                // grid-column: span var(--span);

                // In global CSS:
                // @media (min-width: 1921px) { --grid-cols: 24; }
                // @media (max-width: 1920px) { --grid-cols: 12; }
                // The item width is span / 24 * 100%.

                // Actually, the user wants "24 columns" vs "12 columns".
                // If I am span 6 (1/4 width) on 24-col.
                // I should be span 3 (1/4 width) on 12-col.

                // So the ACTUAL visual width % is constant.
                // Is that what they want? "...only when screen size is more than 1920px"
                // Usually huge screens allow *more* items side-by-side.
                // If I keep 1/4 width, I just get bigger items.
                // If they want "One single row", it implies more items fit.

                // Let's stick to the granular `span` state (24-based).
                // And we strictly set `gridColumn: span ${span}`
                // BUT we ensure the Parent Grid changes density.
                // If Parent is 24-col, item is span 6 (25%).
                // If Parent is 12-col, item is span 6 (50%).
                // This means items NATURALLY get twice as wide (relative to grid) on smaller screens.
                // This is standard responsive behavior!

                // So:
                // 3xl (24-col grid): span 6 = 25% width.
                // lg (12-col grid): span 6 = 50% width.
                // This seems correct for "responsive" behavior.
                gridColumn: `span ${span} / span ${span}`,
                gridRow: `span ${rowSpan} / span ${rowSpan}`
            }}
        >
            {children}

            {/* Horizontal Drag Handle - Right Edge */}
            <div
                onMouseDown={handleMouseDown}
                className="absolute top-0 right-0 bottom-0 w-4 cursor-ew-resize opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hover:bg-black/5 dark:hover:bg-white/10 z-10"
                title="Drag width"
            >
                <div className="h-8 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Vertical Drag Handle - Bottom Edge */}
            <div
                onMouseDown={handleMouseDownVertical}
                className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hover:bg-black/5 dark:hover:bg-white/10 z-10"
                title="Drag height"
            >
                <div className="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Display Span Tooltip during resize */}
            {isResizing && (
                <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none z-50">
                    {span} x {rowSpan}
                </div>
            )}
        </motion.div>
    );
};
