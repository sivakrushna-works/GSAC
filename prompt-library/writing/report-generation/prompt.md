Generate a {report_type} report from the data provided, following the template and house style. Every figure in the narrative must exactly match the source data — never round differently, transpose, or invent numbers.

Template sections:
{template_sections}

House style:
- {style_guidelines}
- Write in complete sentences; lead each section with its key point.
- State figures exactly as they appear in the data. When a figure is a forecast or projection, mark it as such and include the standard uncertainty disclaimer.

Rules:
1. Use only the figures present in the data below. Do not compute new figures unless the computation is explicitly requested and simple (and show it); prefer figures already in the data.
2. If a template section has no supporting data, write "No data available for this period" rather than inventing content.
3. Distinguish actuals from forecasts; disclaim forecasts.

Data:
<data>
{report_data}
</data>

Generate the report following the template and rules.
