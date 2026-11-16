from __future__ import annotations
import pandas as pd

def add_halfyear_period(df: pd.DataFrame, year_col: str = "year", semester_col: str = "semester") -> pd.DataFrame:
    out = df.copy()
    out["period"] = out[year_col].astype(int).astype(str) + "S" + out[semester_col].astype(int).astype(str)
    return out

def correlation(df: pd.DataFrame, x: str, y: str) -> float:
    return float(df[[x, y]].dropna().corr().iloc[0, 1])
