# Methodology — Project 03

## Research hypothesis

The public debate can be framed as:

> Rising data-centre electricity demand is contributing to higher Irish electricity prices.

Project 03 does **not** treat that statement as established fact. It asks whether data-centre demand contains explanatory or predictive information once other major energy-market drivers are considered.

## Why a raw level correlation is insufficient

Both data-centre demand and several price/cost series trend over time. Two trending time series can show a high correlation even when there is no direct causal relationship.

Therefore the project uses several views:

1. levels;
2. year-on-year growth;
3. first differences where appropriate;
4. lagged relationships;
5. regime splits;
6. multivariate predictive models;
7. out-of-sample walk-forward validation.

## First predictive screen

The starter notebook compares:

- naive last-price baseline;
- autoregressive price + lagged gas;
- autoregressive price + lagged gas + lagged data-centre demand.

This is **not** the final specification. Wholesale electricity, network costs and other system variables are added in subsequent stages.

If adding data-centre demand does not improve out-of-sample performance, the project will report that result rather than force a positive finding.
