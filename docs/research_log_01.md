# Research Log 01 — Merge and first diagnostic screen

## Dataset

22 half-year observations: **2015S1–2025S2**.

Data-centre demand is aggregated from quarterly CSO-aligned values. Business electricity and gas prices use SEAI's biannual cadence.

## Initial findings

- Level correlation, data-centre demand vs business electricity price: **0.884**
- Growth correlation, DC demand YoY vs electricity price YoY: **0.702**
- Growth correlation, gas YoY vs electricity price YoY: **0.953**
- Pre-2021 level correlation, DC demand vs price: **-0.609**
- 2021-onward level correlation, DC demand vs price: **0.549**
- 2021-onward level correlation, gas vs electricity price: **0.987**

The sign change across regimes is a warning that the full-sample level correlation is not a stable structural relationship.

## First predictive screen

| model               |    rmse |     mae | test_period   |
|:--------------------|--------:|--------:|:--------------|
| naive               | 3.07014 | 2.449   | 2021S1–2025S2 |
| ar_plus_gas_plus_dc | 3.94442 | 3.10665 | 2021S1–2025S2 |
| ar_plus_gas         | 4.00575 | 2.92022 | 2021S1–2025S2 |

The naive model remains the strongest first benchmark. Adding lagged data-centre demand slightly changes the gas/AR model but **does not beat the naive baseline**.

This is not the final conclusion. The next stage adds wholesale electricity and then tests demand features incrementally.
