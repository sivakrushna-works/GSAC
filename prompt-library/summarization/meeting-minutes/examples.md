# Examples: Meeting Minutes

## Example 1 — Standard meeting

**Transcript:**
```
Priya: Let's decide on the vendor. I propose we go with Acme.
Sam: Agreed, Acme it is.
Priya: Sam, can you draft the contract by Friday?
Sam: Yes, I'll have it Friday.
Lena: We still need to figure out the budget approval process — let's park that.
```

**Output:**
> **Summary:** The team decided to proceed with Acme as the vendor and assigned contract drafting. The budget approval process remains unresolved.
>
> **Decisions:**
> - Selected Acme as the vendor. *(Span: "Agreed, Acme it is.")*
>
> **Action items:**
> - {owner: Sam, task: Draft the contract, due: Friday}
>
> **Open questions:**
> - Budget approval process (parked).

## Example 2 — Edge case: no decisions, unassigned action

**Transcript:**
```
Alex: We reviewed the metrics. Nothing to decide today.
Jordan: Someone should follow up with the data team.
```

**Output:**
> **Summary:** The team reviewed metrics; no decisions were made. A follow-up with the data team was raised but not assigned.
>
> **Decisions:** No decisions recorded.
>
> **Action items:**
> - {owner: null, task: Follow up with the data team, due: null}
>
> **Open questions:** (none)

*(The action has a null owner because "someone should" doesn't assign it — the model doesn't guess who.)*

## Example 3 — Edge case: fabrication resistance

**Transcript:**
```
Maria: Good discussion on the roadmap. Let's reconvene next week.
```

**Output:**
> **Summary:** The team discussed the roadmap and agreed to reconvene next week.
>
> **Decisions:** No decisions recorded.
>
> **Action items:** (none)
>
> **Open questions:** (none)

*(A weaker prompt might invent roadmap "action items"; this one omits — faithful over complete. The only stated fact is reconvening, which appears in the summary.)*
