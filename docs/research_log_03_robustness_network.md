# Research Log 03 — Robustness and network-cost mechanism

## 1. First differences

First-difference correlation, ΔDC demand vs Δelectricity price:
**0.341**

First-difference correlation, Δgas vs Δelectricity price:
**0.949**

First-difference correlation, Δwholesale vs Δelectricity price:
**0.680**

Regression diagnostics:

| model                            |   observations |   r_squared |   adj_r_squared |   dc_coefficient |   dc_p_value_hac |     aic |
|:---------------------------------|---------------:|------------:|----------------:|-----------------:|-----------------:|--------:|
| ΔPrice ~ ΔGas + ΔWholesale       |             13 |    0.901845 |        0.882214 |     nan          |       nan        | 37.3738 |
| ΔPrice ~ ΔGas + ΔWholesale + ΔDC |             13 |    0.906039 |        0.874719 |      -0.00213558 |         0.490087 | 38.8061 |

Adding ΔDC demand changes the fit only modestly. The HAC p-value on the ΔDC term is **0.490**.

This is not strong independent evidence in this small sample.

## 2. Crisis-window sensitivity

The crisis/normalisation window is defined as **2021S2–2023S2**.

Selected results:

| window                    | relationship                           |   observations |   correlation |
|:--------------------------|:---------------------------------------|---------------:|--------------:|
| full_2015_2025            | levels: DC demand vs electricity price |             22 |     0.884067  |
| full_2015_2025            | YoY growth: DC vs electricity price    |             20 |     0.701558  |
| pre_crisis_2015S1_2021S1  | levels: DC demand vs electricity price |             13 |     0.0299862 |
| pre_crisis_2015S1_2021S1  | YoY growth: DC vs electricity price    |             11 |     0.805696  |
| crisis_2021S2_2023S2      | levels: DC demand vs electricity price |              5 |     0.64501   |
| crisis_2021S2_2023S2      | YoY growth: DC vs electricity price    |              5 |     0.966958  |
| post_crisis_2024S1_2025S2 | levels: DC demand vs electricity price |              4 |     0.0804061 |
| post_crisis_2024S1_2025S2 | YoY growth: DC vs electricity price    |              4 |     0.385922  |
| excluding_crisis_window   | levels: DC demand vs electricity price |             17 |     0.944559  |
| excluding_crisis_window   | YoY growth: DC vs electricity price    |             15 |     0.567632  |

The apparent DC/price relationship is highly sensitive to the time window. That instability is inconsistent with treating the full-sample correlation as a stable causal estimate.

## 3. Trend-controlled wholesale-era levels

| model                               |   observations |   r_squared |   adj_r_squared |   dc_coefficient |   dc_p_value_hac |     aic |
|:------------------------------------|---------------:|------------:|----------------:|-----------------:|-----------------:|--------:|
| Price ~ time + gas + wholesale      |             14 |    0.990445 |        0.987579 |     nan          |        nan       | 30.9436 |
| Price ~ time + gas + wholesale + DC |             14 |    0.991579 |        0.987836 |      -0.00394162 |          0.21096 | 31.1755 |

Adding DC demand to a model already containing time, gas and wholesale changes the fit, but the DC coefficient should not be interpreted causally. The sample is small and the regressors are strongly related.

## 4. DC lag sensitivity

Common out-of-sample window: **2023S2–2025S2**.

| model            |    rmse |     mae | test_period   |   test_observations |
|:-----------------|--------:|--------:|:--------------|--------------------:|
| AR+gas+wholesale | 1.7292  | 1.56478 | 2023S2–2025S2 |                   5 |
| naive            | 2.01019 | 1.502   | 2023S2–2025S2 |                   5 |
| + DC lag4        | 2.12044 | 1.62542 | 2023S2–2025S2 |                   5 |
| + DC lag1        | 2.15045 | 1.61162 | 2023S2–2025S2 |                   5 |
| + DC lag2        | 2.28116 | 1.59098 | 2023S2–2025S2 |                   5 |
| + DC lag3        | 2.71593 | 1.86332 | 2023S2–2025S2 |                   5 |

No tested DC lag beats the naive baseline on this common window.

## 5. Network-cost mechanism

Eurostat Band IG annual network component:

- **2024:** 0.88 c/kWh
- **2025:** 3.04 c/kWh

At the same time, the Band IG energy/supply component fell:

- **2024:** 16.04 c/kWh
- **2025:** 14.35 c/kWh

This is evidence that retail-price components can move in different directions.

The simple correlation between DC demand level and the IG network component over 2018–2025 is **0.488**, but with only eight annual observations and multiple system-wide investment drivers, it is **not a causal estimate**.

## 6. Current CRU context

CRU states that capital investment is recovered through network tariffs and that network tariffs make up roughly 25–30% of an average consumer bill. The regulator approved very large PR6 investment for 2026–2030 and explicitly expects near-term network-charge increases.

Project 03 therefore treats network investment as a plausible **indirect mechanism** through which broad electricity-demand growth can affect customer costs, but does not attribute those costs specifically to data centres without a defensible allocation method.

## Interim conclusion

So far:

1. Data-centre demand and electricity-price levels have a high full-period correlation.
2. That relationship is unstable across regimes.
3. Gas and wholesale variables explain the 2021–2023 price shock much more directly.
4. Adding DC demand has not beaten the naive price benchmark out of sample.
5. First-difference and growth specifications do not produce strong independent statistical evidence for DC demand.
6. Network costs are a credible separate mechanism, but the available public component data do not isolate the data-centre share of network investment.

The evidence currently supports a nuanced conclusion rather than “data centres caused Ireland's electricity prices to rise.”
