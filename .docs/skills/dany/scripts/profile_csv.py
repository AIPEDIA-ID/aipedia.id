#!/usr/bin/env python3
"""Print a lightweight data-quality profile for a CSV file using only the standard library."""

import argparse
import csv
import math
from collections import Counter
from pathlib import Path


def as_number(value):
    try:
        return float(value.replace(",", "").replace("%", ""))
    except ValueError:
        return None


def main():
    parser = argparse.ArgumentParser(description="Profile CSV schema, missingness, and numeric ranges.")
    parser.add_argument("csv_path", type=Path)
    parser.add_argument("--limit", type=int, default=100000, help="Maximum data rows to inspect.")
    args = parser.parse_args()

    with args.csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            raise SystemExit("CSV must contain a header row.")
        fields = reader.fieldnames
        missing = Counter()
        values = {field: [] for field in fields}
        rows = 0
        for row in reader:
            if rows >= args.limit:
                break
            rows += 1
            for field in fields:
                raw = (row.get(field) or "").strip()
                if not raw:
                    missing[field] += 1
                    continue
                number = as_number(raw)
                if number is not None and math.isfinite(number):
                    values[field].append(number)

    print(f"Rows inspected: {rows}")
    print(f"Columns: {len(fields)}")
    for field in fields:
        numeric = values[field]
        missing_pct = (missing[field] / rows * 100) if rows else 0
        line = f"- {field}: missing={missing[field]} ({missing_pct:.1f}%)"
        if numeric:
            line += f"; numeric={len(numeric)}; min={min(numeric):g}; max={max(numeric):g}; mean={sum(numeric) / len(numeric):g}"
        print(line)


if __name__ == "__main__":
    main()
