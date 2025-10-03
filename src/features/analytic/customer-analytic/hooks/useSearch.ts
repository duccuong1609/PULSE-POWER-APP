import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";
import { useDebounce } from "use-debounce";

export function useSearch<T extends { referanceId: string; name: string }>(
  data: T[],
  setValue: (item: T) => void
) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchParams] = useSearchParams();

  const fuse = useMemo(() => new Fuse(data, { keys: ["referanceId", "name"], threshold: 0.4 }), [data]);

  const results = useMemo(() => {
    if (!debouncedQuery) return data;
    return fuse.search(debouncedQuery).map(r => r.item);
  }, [debouncedQuery, fuse, data]);

  const displayedResults = useMemo(() => results.slice(0, 100), [results]);

  const handleChoose = (item: T) => {
    setValue(item);
    setQuery(item.name);
  };

  useEffect(() => {
    const referanceId = searchParams.get("referanceId");
    if (!referanceId) return;

    setQuery(referanceId);
    const item = data.find(d => d.referanceId === referanceId);
    if (item) handleChoose(item);
  }, [searchParams, data]);

  return { query, setQuery, debouncedQuery, results, handleChoose, displayedResults };
}