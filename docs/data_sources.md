# Data sources

## Data-centre electricity demand

**Central Statistics Office (CSO) — Data Centres Metered Electricity Consumption 2025**  
https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2025/

Project 01 public repository:  
https://github.com/danielsantos2310/Ireland-Data-Center-Energy-research

The Project 03 half-year series is built by summing the published quarterly CSO-aligned data. The published annual headline can differ by 1 GWh from the sum of rounded quarterly values; Project 03 preserves the quarterly values for half-year alignment.

## Business electricity and gas prices

**SEAI — Energy Prices**  
https://www.seai.ie/data-and-insights/seai-statistics/prices

Project 02 public repository:  
https://github.com/danielsantos2310/Ireland-Electricity-Price-Analytics

The principal retail target remains the genuine **biannual** business-price series.

## Wholesale electricity

**SEMOpx market data**  
https://www.semopx.com/market-data

Later modelling will also use the CSO wholesale electricity price index / SEMOpx Day-Ahead Market history already validated in Project 02.

## Network costs / regulation

**CRU — Price Review Six / electricity network investment**  
https://www.cru.ie/en-ie/about-us/news/cru-approves-record-investment-in-irelands-electricity-grid-and-network/

Network-cost variables are explanatory/control variables. They must be aligned carefully to the retail-price frequency before entering a predictive model.
