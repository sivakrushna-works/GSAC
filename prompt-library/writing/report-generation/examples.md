# Examples: Report Generation

Configured for a monthly business review; sections = Summary, Revenue, Outlook.

## Example 1 — Standard report (figures faithful)

**Data:**
```json
{"month": "June", "revenue_actual": 1250000, "revenue_prior": 1180000, "revenue_forecast_july": 1300000}
```

**Output:**
> **Summary:** June revenue was $1,250,000, up 5.9% from May's $1,180,000. The July outlook is positive.
>
> **Revenue:** Revenue reached $1,250,000 in June, an increase of $70,000 over the prior month's $1,180,000.
>
> **Outlook:** July revenue is forecast at $1,300,000. *This figure is a projection and subject to change; actual results may differ.*

*(Every figure matches the data exactly. The July figure is marked as a forecast and disclaimed. The 5.9% growth is a simple, shown computation from the two actuals.)*

## Example 2 — Edge case: empty section

**Data:**
```json
{"month": "June", "revenue_actual": 1250000, "revenue_prior": 1180000}
```
*(no forecast provided)*

**Output:**
> **Summary:** June revenue was $1,250,000, up from May's $1,180,000.
>
> **Revenue:** Revenue reached $1,250,000 in June, up from $1,180,000 the prior month.
>
> **Outlook:** No data available for this period.

*(The Outlook section has no forecast data, so the model states that rather than inventing a projection.)*

## Example 3 — Edge case: figure faithfulness under pressure

**Data:**
```json
{"revenue_actual": 1249873.42}
```

**Output:**
> **Revenue:** Revenue was $1,249,873.42.

*(A weaker prompt might "clean up" the number to $1.25M or $1,250,000. The rule requires the exact figure. The downstream figure-faithfulness check would reject a rounded value that doesn't match the data — the CS48 discipline. If rounding is desired, it should be done in the data, not the narrative.)*
