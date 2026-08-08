"use client";

import { useRef, useState } from "react";

/**
 * Horizontal scroller with no visible scrollbar.
 *
 * Touch and trackpad panning is the browser's own (native overflow scrolling);
 * this adds click-and-drag for mouse users, who would otherwise have no way to
 * pan once the scrollbar is hidden. Pointer capture keeps the drag alive even if
 * the cursor leaves the strip mid-drag.
 */
export default function DragScroller({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, scrollLeft: 0 });
  const moved = useRef(false);
  const [dragging, setDragging] = useState(false);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Leave touch and pen to the browser's native, momentum-having scrolling.
    if (e.pointerType !== "mouse" || !ref.current) return;
    start.current = { x: e.clientX, scrollLeft: ref.current.scrollLeft };
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !ref.current) return;
    e.preventDefault(); // don't turn the drag into a text selection
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 6) moved.current = true;
    ref.current.scrollLeft = start.current.scrollLeft - dx;
  }

  // Cards themselves are links. If the pointer travelled, this was a pan and
  // not a click, so swallow the click before the link sees it.
  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (!moved.current) return;
    e.preventDefault();
    e.stopPropagation();
    moved.current = false;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      className={`no-scrollbar overflow-x-auto overscroll-x-contain ${
        dragging ? "cursor-grabbing select-none" : "cursor-grab"
      } ${className}`}
    >
      {children}
    </div>
  );
}
