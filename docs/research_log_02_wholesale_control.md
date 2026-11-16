# Research Log 02 — Wholesale control

## Continuous wholesale feature

Project 03 uses:

- **2019–2020:** SEMOpx Day-Ahead Market half-year index, normalised to 2021 = 100.
- **2021–2025:** CSO WPM37 Wholesale Price Index — Electricity.

Project 02 previously validated that SEMOpx and CSO track essentially the same wholesale signal over their overlap after normalisation.

## Incremental walk-forward screen

| model                     |    rmse |     mae | test_period   |   test_observations |
|:--------------------------|--------:|--------:|:--------------|--------------------:|
| naive                     | 2.90654 | 2.10857 | 2022S2–2025S2 |                   7 |
| AR + wholesale            | 3.06791 | 2.43014 | 2022S2–2025S2 |                   7 |
| AR + gas + wholesale + DC | 3.13558 | 2.36554 | 2022S2–2025S2 |                   7 |
| AR + gas + wholesale      | 3.25204 | 2.56043 | 2022S2–2025S2 |                   7 |
| AR + gas                  | 3.94623 | 2.72868 | 2022S2–2025S2 |                   7 |

The test window contains only 7 half-year observations, so differences should not be overstated.

The naive benchmark remains best. Wholesale information comes much closer than gas-only, and adding data-centre demand improves the gas+wholesale model relative to the same model without DC demand, but it still does not beat naive.

## Growth regression diagnostic

| model                   |   r_squared |   adj_r_squared |   dc_coefficient |   dc_p_value |   observations |
|:------------------------|------------:|----------------:|-----------------:|-------------:|---------------:|
| Gas YoY only            |    0.90914  |        0.904092 |       nan        |   nan        |             20 |
| Gas YoY + DC demand YoY |    0.916433 |        0.906601 |         0.317259 |     0.239863 |             20 |

Gas-price growth alone explains most of the in-sample variation in business-electricity price growth in this small sample. Adding DC-demand growth increases R² only modestly.

The DC-growth coefficient is positive but its p-value is approximately **0.240**. This is not strong evidence of an independent effect.

This is a descriptive regression, not a causal estimate. The observations are time-series data and the sample is small.

## Next stage

- first-difference / growth specifications;
- wholesale growth and lag controls;
- network-cost / policy layer;
- sensitivity tests excluding the 2021–2023 shock;
- incremental out-of-sample feature tests.
