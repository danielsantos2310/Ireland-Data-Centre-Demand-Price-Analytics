# Ireland Data Centre Demand × Price Analytics

**Project 03 — Ireland / Energy / Data**

## Live project

- **Interactive website:** https://danielsantos2310.github.io/Ireland-Data-Centre-Demand-Price-Analytics/
- **Open the analysis in Colab:** https://colab.research.google.com/github/danielsantos2310/Ireland-Data-Centre-Demand-Price-Analytics/blob/b9b77a90905c791c6a524730ba0ea9700222a0be/notebooks/Ireland_Data_Centre_Demand_x_Price_Analytics_Final.ipynb
- **GitHub repository:** https://github.com/danielsantos2310/Ireland-Data-Centre-Demand-Price-Analytics


> **Are Ireland's data centres driving electricity prices?**

This project combines the public outputs of Project 01 (data-centre electricity demand) and Project 02 (business electricity prices) to test whether rising data-centre electricity demand adds meaningful explanatory or predictive power once major energy-market drivers are accounted for.

## Main conclusion

The evidence does **not** support the simple claim that rising data-centre electricity consumption directly caused Ireland's observed business-electricity price surge.

The 2021–2023 price shock is much more directly associated with gas and wholesale electricity. Data-centre growth may still contribute to longer-run network and capacity requirements, but currently available public data do not isolate a defensible data-centre-specific share of those costs.

## What the project tests

- raw level correlation;
- year-on-year growth relationships;
- first differences;
- pre-crisis / crisis / post-crisis regime sensitivity;
- 6–24 month data-centre demand lags;
- gas and wholesale electricity controls;
- trend-controlled regressions;
- rolling / walk-forward predictive tests;
- Band IG network-cost components;
- 2035 benchmark expenditure exposure.

## Important limitations

- Correlation is not causation.
- Band IG is a public large-user benchmark, **not a data-centre tariff**.
- Private PPAs, hedging and negotiated contracts are not observed.
- The project does not allocate PR6 network investment specifically to data centres.
- The half-year sample is small, so model complexity is deliberately constrained.

## Project series

1. **Project 01 — Ireland Data Centre Energy Analytics**
2. **Project 02 — Ireland Electricity Price Analytics**
3. **Project 03 — Ireland Data Centre Demand × Price Analytics**

## Primary sources

- CSO — Data Centres Metered Electricity Consumption
- SEAI — Energy Prices / Electricity & Gas Prices
- CSO — WPM37 Wholesale Price Index
- SEMOpx — Day-Ahead Market data
- Eurostat — `nrg_pc_205_c`
- CRU — network revenues, tariffs and PR6 investment

## Repository structure

- `notebooks/` — final reproducible notebook
- `data/raw/` — source snapshots used by the project
- `data/processed/` — merged and model-output datasets
- `docs/` — methodology, sources, research logs and final conclusion
- `charts/` — publication charts
- `assets/` — live-story CSS/JS
- `src/` — reusable analytical helpers

## Technologies

Python · pandas · NumPy · matplotlib · scikit-learn · statsmodels · HTML · CSS · JavaScript

## Suggested GitHub topics

`data-analysis` `ireland` `energy` `data-centres` `electricity-prices` `python` `forecasting` `time-series` `causal-inference` `data-visualization`
