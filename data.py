from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd
import json


transactions = [
    ["Jalebi", "Barfi"],
    ["Kaju Katli", "Barfi"],
    ["Rasgulla", "Barfi"],
    ["Jalebi", "Ladoo"],
    ["Kaju Katli", "Ladoo"],
    ["Kaju Katli", "Rasgulla"],
    ["Ladoo", "Rasgulla"],
    ["Mysore Pak", "Ladoo"],
    ["Jalebi", "Kaju Katli"]
]


te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)


frequent_itemsets = apriori(df, min_support=0.1, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.2)


suggestions = []
for _, row in rules.iterrows():
    suggestions.append({
        "antecedents": list(row['antecedents'])[0],
        "consequents": list(row['consequents'])[0],
        "support": row["support"],
        "confidence": row["confidence"],
        "lift": row["lift"]
    })

with open("suggestions.json", "w") as f:
    json.dump(suggestions, f, indent=4)

print("Suggestions saved to suggestions.json ✅")
